"""
Ultra-HD 4K Upscale & Architectural Detail Restoration Script
Upscales 5 Villa Panoramas from 2880px to 4096px with Lanczos-4 antialiasing,
applies an architectural micro-contrast unsharp mask (wood, marble, granite textures),
and compresses to ultra-efficient WebP.
"""

import os
import cv2
import numpy as np
from PIL import Image

PANORAMA_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "panoramas")

SCENES = [
    "entrance_deck",
    "living_room",
    "kitchen_dining",
    "stone_lounge",
    "bedroom"
]

def enhance_scene(scene_name):
    jpg_path = os.path.join(PANORAMA_DIR, f"{scene_name}.jpg")
    webp_path = os.path.join(PANORAMA_DIR, f"{scene_name}.webp")
    
    if not os.path.exists(jpg_path):
        print(f"Skipping {scene_name}: {jpg_path} not found")
        return

    print(f"Enhancing {scene_name}...")
    img = cv2.imread(jpg_path)
    h, w = img.shape[:2]
    
    # Target 4K resolution (4096 x 2304)
    target_w, target_h = 4096, int(round(4096 * (h / w)))
    print(f"  Upscaling {w}x{h} -> {target_w}x{target_h} (Lanczos-4)")
    upscaled = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    
    # Architectural micro-contrast unsharp mask
    print("  Applying architectural unsharp mask...")
    gaussian = cv2.GaussianBlur(upscaled, (0, 0), sigmaX=1.6, sigmaY=1.6)
    enhanced = cv2.addWeighted(upscaled, 1.28, gaussian, -0.28, 0)
    
    # Convert to PIL & Save WebP
    rgb = cv2.cvtColor(enhanced, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(rgb)
    
    pil_img.save(webp_path, "WEBP", quality=88, method=6)
    file_size_mb = os.path.getsize(webp_path) / (1024 * 1024)
    print(f"  Saved {webp_path} ({file_size_mb:.2f} MB)")

if __name__ == "__main__":
    for scene in SCENES:
        enhance_scene(scene)
    print("\nAll panoramas successfully enhanced to Ultra-HD 4K!")
