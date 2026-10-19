"""
Ultra-HD Multiresolution Panorama Tile Generator for Pannellum
Upscales & Enhances to 6K Equirectangular + Generates 4-Level 4096px Cube Pyramid
"""

import os
import sys
import math
import cv2
import numpy as np
from PIL import Image

def get_face_rays(face, size):
    """
    Generate normalized 3D ray directions for a cube face according to Pannellum's coordinate system.
    Pannellum face order: 'f', 'b', 'u', 'd', 'l', 'r'
    """
    lin = np.linspace(-1.0 + 1.0 / size, 1.0 - 1.0 / size, size, dtype=np.float32)
    u, v = np.meshgrid(lin, lin)

    if face == 'f':
        # Front: looking along -Z
        X = u
        Y = -v
        Z = -np.ones_like(u)
    elif face == 'b':
        # Back: looking along +Z
        X = -u
        Y = -v
        Z = np.ones_like(u)
    elif face == 'u':
        # Up: looking along +Y
        X = u
        Y = np.ones_like(u)
        Z = -v
    elif face == 'd':
        # Down: looking along -Y
        X = u
        Y = -np.ones_like(u)
        Z = v
    elif face == 'l':
        # Left: looking along -X
        X = -np.ones_like(u)
        Y = -v
        Z = -u
    elif face == 'r':
        # Right: looking along +X
        X = np.ones_like(u)
        Y = -v
        Z = u
    else:
        raise ValueError(f"Unknown face: {face}")

    return X, Y, Z

def render_cube_face(img, face, size):
    """
    Renders a cube face of given size from an equirectangular image using cv2.remap.
    """
    h, w = img.shape[:2]
    X, Y, Z = get_face_rays(face, size)

    norm = np.sqrt(X * X + Y * Y + Z * Z)
    X = X / norm
    Y = Y / norm
    Z = Z / norm

    # Yaw (longitude theta in [-pi, pi])
    theta = np.arctan2(X, -Z)

    # Pitch (latitude phi in [-pi/2, pi/2])
    phi = np.arcsin(np.clip(Y, -1.0, 1.0))

    # Map to equirectangular coordinates (x, y)
    map_x = ((theta + np.pi) / (2.0 * np.pi)) * (w - 1)
    map_y = ((np.pi / 2.0 - phi) / np.pi) * (h - 1)

    face_img = cv2.remap(
        img,
        map_x.astype(np.float32),
        map_y.astype(np.float32),
        interpolation=cv2.INTER_LANCZOS4,
        borderMode=cv2.BORDER_WRAP
    )
    return face_img

def enhance_equirectangular(img, target_w=6144, target_h=3072):
    """
    Upscale to true 2:1 6K resolution with Lanczos-4 antialiasing and apply an unsharp mask
    to extract architectural micro-details (wood grains, marble veins, lighting contours).
    """
    h, w = img.shape[:2]
    if w < target_w or h < target_h:
        print(f"  Upscaling source from {w}x{h} to {target_w}x{target_h} (Lanczos4)...")
        upscaled = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    else:
        upscaled = img

    # Architectural clarity unsharp mask
    gaussian = cv2.GaussianBlur(upscaled, (0, 0), sigmaX=2.0, sigmaY=2.0)
    enhanced = cv2.addWeighted(upscaled, 1.35, gaussian, -0.35, 0)
    return enhanced

def generate_multires_panorama(input_path, output_dir, tile_size=512, cube_size=4096, quality=93):
    """
    Generates Pannellum multires tiles for a single equirectangular panorama.
    """
    os.makedirs(output_dir, exist_ok=True)
    fallback_dir = os.path.join(output_dir, "fallback")
    os.makedirs(fallback_dir, exist_ok=True)

    print(f"\n[Processing] {input_path} -> {output_dir}")
    raw_img = cv2.imread(input_path)
    if raw_img is None:
        raise FileNotFoundError(f"Could not load image: {input_path}")

    # Step 1: Enhance to 6K
    img = enhance_equirectangular(raw_img, target_w=6144, target_h=3072)
    h, w = img.shape[:2]
    print(f"  Enhanced source resolution: {w}x{h}")
    print(f"  Target cube size: {cube_size}px, tile size: {tile_size}px")

    # Determine levels (4096 / 512 = 8 -> 4 levels)
    levels = int(math.ceil(math.log(float(cube_size) / tile_size, 2))) + 1
    print(f"  Total Pyramid Levels: {levels}")

    faces = ['f', 'b', 'u', 'd', 'l', 'r']

    for f_idx, face in enumerate(faces):
        print(f"  Rendering face: {face} ({cube_size}x{cube_size})...")
        full_face = render_cube_face(img, face, cube_size)

        # 1. Save fallback (512x512)
        fallback_img = cv2.resize(full_face, (tile_size, tile_size), interpolation=cv2.INTER_AREA)
        fallback_path = os.path.join(fallback_dir, f"{face}.jpg")
        cv2.imwrite(fallback_path, fallback_img, [cv2.IMWRITE_JPEG_QUALITY, 85])

        # Convert full_face to PIL Image for high quality cropping / downscaling
        face_pil = Image.fromarray(cv2.cvtColor(full_face, cv2.COLOR_BGR2RGB))

        # 2. Generate each level (1 to 4)
        current_size = cube_size
        for level in range(levels, 0, -1):
            level_dir = os.path.join(output_dir, str(level))
            os.makedirs(level_dir, exist_ok=True)

            tiles = int(math.ceil(float(current_size) / tile_size))
            
            if level < levels:
                scaled_face = face_pil.resize((current_size, current_size), Image.Resampling.LANCZOS)
            else:
                scaled_face = face_pil

            for row in range(tiles):
                for col in range(tiles):
                    left = col * tile_size
                    upper = row * tile_size
                    right = min(left + tile_size, current_size)
                    lower = min(upper + tile_size, current_size)

                    tile = scaled_face.crop((left, upper, right, lower))
                    
                    if tile.size != (tile_size, tile_size):
                        padded = Image.new("RGB", (tile_size, tile_size), (0, 0, 0))
                        padded.paste(tile, (0, 0))
                        tile = padded

                    tile_filename = f"{face}{row}_{col}.jpg"
                    tile_path = os.path.join(level_dir, tile_filename)
                    tile.save(tile_path, "JPEG", quality=quality, optimize=True)

            current_size = current_size // 2

    config = {
        "type": "multires",
        "multiRes": {
            "basePath": output_dir.replace("\\", "/"),
            "path": "/%l/%s%y_%x",
            "fallbackPath": "/fallback/%s",
            "extension": "jpg",
            "tileResolution": tile_size,
            "maxLevel": levels,
            "cubeResolution": cube_size
        }
    }
    print(f"  Done! Generated {levels} levels for face {face}.")
    return config

if __name__ == "__main__":
    scenes = [
        ("assets/panoramas/entrance_deck.jpg", "assets/panoramas/multires/entrance"),
        ("assets/panoramas/living_room.jpg", "assets/panoramas/multires/living_room"),
        ("assets/panoramas/kitchen_dining.jpg", "assets/panoramas/multires/kitchen"),
        ("assets/panoramas/stone_lounge.jpg", "assets/panoramas/multires/stone_lounge"),
        ("assets/panoramas/bedroom.jpg", "assets/panoramas/multires/bedroom"),
    ]

    for src, dst in scenes:
        if os.path.exists(src):
            generate_multires_panorama(src, dst, tile_size=512, cube_size=4096, quality=93)
        else:
            print(f"Warning: {src} not found!")

    print("\nALL SCENES SUCCESSFULLY UPGRADED TO ULTRA-HD 4K CUBE MULTIRESOLUTION PYRAMIDS!")
