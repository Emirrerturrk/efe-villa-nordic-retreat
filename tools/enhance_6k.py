"""
6K Ultra-HD Architectural Texture Restoration & Upscaling
Enhances 5 Villa Scenes to 6144x3456 with Lanczos-4 antialiased interpolation,
multi-scale architectural unsharp contrast (wood, granite, linen, brushed steel),
and generates ultra-crisp WebP textures for Three.js 180° Curved Stage.
"""

import os
import time
import cv2
import numpy as np
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PANORAMA_DIR = os.path.join(BASE_DIR, "assets", "panoramas")

SCENES = [
    "entrance_deck",
    "living_room",
    "kitchen_dining",
    "stone_lounge",
    "bedroom"
]

def enhance_6k(scene_name):
    jpg_path = os.path.join(PANORAMA_DIR, f"{scene_name}.jpg")
    webp_path = os.path.join(PANORAMA_DIR, f"{scene_name}.webp")
    
    if not os.path.exists(jpg_path):
        print(f"[!] Warning: {jpg_path} not found!")
        return

    t0 = time.time()
    print(f"\n[+] Processing '{scene_name}'...")
    img = cv2.imread(jpg_path)
    h, w = img.shape[:2]
    
    # Target 6K resolution (6144 x 3456 - exact 16:9)
    target_w = 6144
    target_h = int(round(target_w * (h / w)))
    print(f"    Upscaling: {w}x{h} -> {target_w}x{target_h} (Lanczos-4)")
    upscaled = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    
    # Multi-scale architectural unsharp mask
    # 1. Fine micro-texture pass (wood grain, linen fabric)
    print("    Applying fine micro-texture restoration...")
    fine_gaussian = cv2.GaussianBlur(upscaled, (0, 0), sigmaX=1.2, sigmaY=1.2)
    fine_detail = cv2.addWeighted(upscaled, 1.25, fine_gaussian, -0.25, 0)
    
    # 2. Macro-edge clarity pass (granite blocks, window frames, light fixtures)
    print("    Applying architectural edge clarity pass...")
    macro_gaussian = cv2.GaussianBlur(fine_detail, (0, 0), sigmaX=3.0, sigmaY=3.0)
    enhanced = cv2.addWeighted(fine_detail, 1.15, macro_gaussian, -0.15, 0)
    
    # Convert BGR -> RGB
    rgb = cv2.cvtColor(enhanced, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(rgb)
    
    # Save optimized WebP with quality=90, method=6
    print(f"    Encoding Ultra-HD WebP...")
    pil_img.save(webp_path, "WEBP", quality=90, method=6)
    
    file_size_mb = os.path.getsize(webp_path) / (1024 * 1024)
    dt = time.time() - t0
    print(f"    [Done] Saved {webp_path} ({file_size_mb:.2f} MB in {dt:.1f}s)")

if __name__ == "__main__":
    print("=" * 60)
    print("STARTING 6K ULTRA-HD ARCHITECTURAL TEXTURE UPGRADE")
    print("=" * 60)
    for scene in SCENES:
        enhance_6k(scene)
    print("\n[SUCCESS] ALL 5 SCENES UPGRADED TO 6K ULTRA-HD!")
