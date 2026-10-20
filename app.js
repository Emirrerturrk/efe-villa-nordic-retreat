/**
 * EFE VILLA · NORDIC RETREAT
 * Architectural 180° Virtual Experience (OFC Mimarlık Minimalist Edition)
 * Powered by Three.js 180° Curved Stage with 6K Ultra-HD Razor-Sharp Precision
 * Native 1:1 DevicePixelRatio & 16x Anisotropic Texture Filtering
 */

const SCENES = {
  entrance: {
    id: "entrance",
    title: "Dış İskele · Giriş Kapısı",
    panorama: "assets/panoramas/entrance_deck.webp",
    initialPitch: 0,
    initialYaw: 0,
    mapCoords: { x: 50, y: 88 },
    hotSpots: [
      {
        pitch: -1,
        yaw: 0,
        type: "nav",
        label: "İçeri Gir (Salona Geç) 🚪",
        targetSceneId: "living_room"
      },
      {
        pitch: 5,
        yaw: -45,
        type: "info",
        title: "Üç Katmanlı Yalıtımlı Cam Cephe",
        description: "Kuzey iklimine uygun, ısı kaybını sıfırlayan argon dolgulu lamine cam paneller."
      }
    ]
  },
  living_room: {
    id: "living_room",
    title: "Ana Salon · Galeri Boşluğu",
    panorama: "assets/panoramas/living_room.webp",
    initialPitch: 0,
    initialYaw: 0,
    mapCoords: { x: 50, y: 55 },
    hotSpots: [
      {
        pitch: 16,
        yaw: 0,
        type: "nav",
        label: "Yatak Odası Süiti (Üst Kat) 🛏️",
        targetSceneId: "bedroom"
      },
      {
        pitch: -3,
        yaw: 42,
        type: "nav",
        label: "Mutfak & Bar 🍳",
        targetSceneId: "kitchen"
      },
      {
        pitch: -4,
        yaw: -55,
        type: "nav",
        label: "Şömine Salonu 🔥",
        targetSceneId: "stone_lounge"
      },
      {
        pitch: -6,
        yaw: -82,
        type: "nav",
        label: "Dış İskele (Çıkış) 🌲",
        targetSceneId: "entrance"
      },
      {
        pitch: -14,
        yaw: -58,
        type: "info",
        title: "Lineer Bioethanol Şömine",
        description: "Baca gerektirmeyen, temiz yanan gerçek alevli mimari lineer şömine ünitesi."
      },
      {
        pitch: -18,
        yaw: -5,
        type: "info",
        title: "Özel Üretim Modüler Koltuk",
        description: "Leke tutmaz İtalyan keten dokuma kumaş ve kuştüyü dolgulu brütalist salon oturma grubu."
      }
    ]
  },
  kitchen: {
    id: "kitchen",
    title: "Mutfak & Yemek Alanı",
    panorama: "assets/panoramas/kitchen_dining.webp",
    initialPitch: 0,
    initialYaw: 0,
    mapCoords: { x: 75, y: 40 },
    hotSpots: [
      {
        pitch: -5,
        yaw: -75,
        type: "nav",
        label: "Ana Salona Dön 🛋️",
        targetSceneId: "living_room"
      },
      {
        pitch: -3,
        yaw: -45,
        type: "nav",
        label: "Şömine Salonu 🔥",
        targetSceneId: "stone_lounge"
      },
      {
        pitch: -12,
        yaw: 40,
        type: "info",
        title: "Nero Marquina Mermer Ada",
        description: "Masif tek parça damarlı İspanyol mermerinden oyulmuş ankastre pişirme ve bar adası."
      }
    ]
  },
  stone_lounge: {
    id: "stone_lounge",
    title: "Doğal Taş Şömine Salonu",
    panorama: "assets/panoramas/stone_lounge.webp",
    initialPitch: 0,
    initialYaw: 0,
    mapCoords: { x: 25, y: 45 },
    hotSpots: [
      {
        pitch: -5,
        yaw: -75,
        type: "nav",
        label: "Ana Salona Dön 🛋️",
        targetSceneId: "living_room"
      },
      {
        pitch: -2,
        yaw: 72,
        type: "nav",
        label: "Yatak Odasına Geç 🛏️",
        targetSceneId: "bedroom"
      },
      {
        pitch: 12,
        yaw: 45,
        type: "info",
        title: "Oyma Doğal Kaya Duvar",
        description: "Yerel taş ocaklarından çıkarılan ham granit bloklar ve gizli lineer tavan aydınlatması."
      }
    ]
  },
  bedroom: {
    id: "bedroom",
    title: "Yatak Odası Süiti",
    panorama: "assets/panoramas/bedroom.webp",
    initialPitch: 0,
    initialYaw: 0,
    mapCoords: { x: 50, y: 20 },
    hotSpots: [
      {
        pitch: -7,
        yaw: 72,
        type: "nav",
        label: "Salona İncele ⬇️",
        targetSceneId: "living_room"
      },
      {
        pitch: 4,
        yaw: -60,
        type: "info",
        title: "Akustik Sedir Çıtalar",
        description: "Doğal ahşap sedir paneling ile mükemmel ses akustiği ve dinlendirici koku aroması."
      }
    ]
  }
};

/**
 * Global Architecture & Engine State
 */
let stage180 = null;
let currentSceneId = "entrance";
let isExpanded = false;
let isAutoRotating = false;
let audioEngine = null;

/**
 * Three.js 180° Curved Architectural Stage
 */
class ArchStage180 {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error("Container not found");

    // Hotspot DOM Layer
    let layer = this.container.querySelector(".hotspot-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "hotspot-layer";
      this.container.appendChild(layer);
    }
    this.hotspotLayer = layer;

    // Viewport Dimensions
    this.width = this.container.clientWidth || 1200;
    this.height = this.container.clientHeight || 675;

    // Camera Physics & Controls State
    this.targetYaw = 0;
    this.currentYaw = 0;
    this.targetPitch = 0;
    this.currentPitch = 0;
    this.targetFov = 68;
    this.currentFov = 68;
    this.minFov = 46;
    this.maxFov = 80;
    this.yawLimit = 54;    // Max horizontal arc left/right
    this.pitchLimit = 24;  // Max vertical arc up/down

    // Inertia & Drag Tracker
    this.isDragging = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.activeTouches = 0;
    this.touchPinchDist = 0;

    // Auto-rotate wave
    this.autoRotateTime = 0;

    // Texture Cache
    this.textureLoader = new THREE.TextureLoader();
    this.textureCache = {};
    this.activeHotspotElements = [];

    this.initThree();
    this.setupInteractions();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    // 1. Renderer with native Retina / 4K Crisp DevicePixelRatio
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x0d0f12, 1);
    this.container.insertBefore(this.renderer.domElement, this.hotspotLayer);

    // 2. Scene
    this.scene = new THREE.Scene();

    // 3. Perspective Camera (Centered at origin)
    const aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(this.currentFov, aspect, 0.1, 3000);
    this.camera.position.set(0, 0, 0);
    this.camera.rotation.order = "YXZ";

    // 4. 180° Architectural Curved Cylinder Geometry (196° arc for seamless edge-to-edge coverage)
    // Radius: 500, Height: 1000 (covers 90° vertical span)
    const radius = 500;
    const height = 1000;
    const arcAngle = THREE.MathUtils.degToRad(196);
    const thetaStart = Math.PI - arcAngle / 2;

    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      96,
      1,
      true,
      thetaStart,
      arcAngle
    );

    // Flip UV coordinates horizontally so u=0 matches screen left and u=1 matches screen right
    const uvs = geometry.attributes.uv;
    for (let i = 0; i < uvs.count; i++) {
      uvs.setX(i, 1.0 - uvs.getX(i));
    }
    uvs.needsUpdate = true;

    // Initial Material
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      depthWrite: false
    });

    this.cylinderMesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.cylinderMesh);

    // Temp vector for projection calculations
    this.tempVec = new THREE.Vector3();
  }

  /**
   * Load Scene Texture with 16x Anisotropic Filtering
   */
  loadScene(sceneId, onLoaded) {
    const scene = SCENES[sceneId];
    if (!scene) return;

    // Reset rotation targets smoothly
    this.targetYaw = scene.initialYaw || 0;
    this.targetPitch = scene.initialPitch || 0;
    this.currentYaw = this.targetYaw;
    this.currentPitch = this.targetPitch;
    this.targetFov = 66;

    const applyTexture = (texture) => {
      this.material.map = texture;
      this.material.needsUpdate = true;
      this.buildHotspots(scene.hotSpots);
      if (onLoaded) onLoaded();
    };

    if (this.textureCache[scene.panorama]) {
      applyTexture(this.textureCache[scene.panorama]);
    } else {
      this.textureLoader.load(scene.panorama, (tex) => {
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        if (this.renderer.capabilities && this.renderer.capabilities.getMaxAnisotropy) {
          tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        }
        this.textureCache[scene.panorama] = tex;
        applyTexture(tex);
      });
    }

    // Preload remaining scenes in background for instant room transitions
    this.preloadOtherScenes(sceneId);
  }

  preloadOtherScenes(currentId) {
    Object.values(SCENES).forEach((s) => {
      if (s.id !== currentId && !this.textureCache[s.panorama]) {
        this.textureLoader.load(s.panorama, (tex) => {
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          if (this.renderer.capabilities && this.renderer.capabilities.getMaxAnisotropy) {
            tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          }
          this.textureCache[s.panorama] = tex;
        });
      }
    });
  }

  /**
   * Build Interactive 3D Screen-Projected Hotspots
   */
  buildHotspots(hotspotsList = []) {
    this.hotspotLayer.innerHTML = "";
    this.activeHotspotElements = [];

    hotspotsList.forEach((hs) => {
      const el = document.createElement("div");
      el.className = hs.type === "nav" ? "custom-hotspot-nav" : "custom-hotspot-info";

      if (hs.type === "nav") {
        createNavHotspot(el, hs.label, hs.targetSceneId);
      } else {
        createInfoHotspot(el, hs.title, hs.description);
      }

      this.hotspotLayer.appendChild(el);

      // Compute 3D Position on the 180° Curved Cylinder
      const theta = THREE.MathUtils.degToRad(hs.yaw);
      const phi = THREE.MathUtils.degToRad(hs.pitch);
      const radius = 488; // Slightly inside the 500 cylinder
      const x = Math.sin(theta) * radius;
      const y = Math.tan(phi) * radius;
      const z = -Math.cos(theta) * radius;

      this.activeHotspotElements.push({
        domElement: el,
        pos3D: new THREE.Vector3(x, y, z)
      });
    });
  }

  /**
   * Update 2D Screen Coordinates of Hotspots in Frame Loop
   */
  updateHotspots() {
    if (!this.activeHotspotElements.length) return;

    const halfW = this.width * 0.5;
    const halfH = this.height * 0.5;

    for (let i = 0; i < this.activeHotspotElements.length; i++) {
      const item = this.activeHotspotElements[i];
      this.tempVec.copy(item.pos3D).project(this.camera);

      // Verify if hotspot is in front of camera and within screen boundaries
      if (
        this.tempVec.z < 1.0 &&
        this.tempVec.x >= -1.2 &&
        this.tempVec.x <= 1.2 &&
        this.tempVec.y >= -1.2 &&
        this.tempVec.y <= 1.2
      ) {
        const screenX = (this.tempVec.x * 0.5 + 0.5) * this.width;
        const screenY = (-this.tempVec.y * 0.5 + 0.5) * this.height;

        item.domElement.style.display = "flex";
        item.domElement.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;
      } else {
        item.domElement.style.display = "none";
      }
    }
  }

  /**
   * Setup Physics Drag, Inertia, Mouse Wheel, Touch & Pinch Zoom
   */
  setupInteractions() {
    const el = this.container;

    // Pointer Down (Mouse & Touch)
    const onPointerDown = (clientX, clientY) => {
      this.isDragging = true;
      this.lastPointerX = clientX;
      this.lastPointerY = clientY;
      this.velocityX = 0;
      this.velocityY = 0;
      this.container.classList.add("is-dragging");

      // Pause auto-rotate if user takes control
      if (isAutoRotating) {
        const btnRotate = document.getElementById("btn-autorotate");
        if (btnRotate) btnRotate.click();
      }
    };

    // Pointer Move with Inertia Tracker
    const onPointerMove = (clientX, clientY) => {
      if (!this.isDragging) return;

      const deltaX = clientX - this.lastPointerX;
      const deltaY = clientY - this.lastPointerY;

      this.lastPointerX = clientX;
      this.lastPointerY = clientY;

      // Sensitivity scaled by current FOV
      const degPerPx = (this.currentFov / this.width) * 0.95;

      const changeYaw = deltaX * degPerPx;
      const changePitch = deltaY * degPerPx;

      this.targetYaw += changeYaw;
      this.targetPitch += changePitch;

      // Track velocity for inertia release
      this.velocityX = changeYaw * 0.45;
      this.velocityY = changePitch * 0.45;

      // Clamp target within 180° bounds
      this.clampTargets();
    };

    // Pointer Up (Apply Inertial Throw)
    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.container.classList.remove("is-dragging");

      // Apply throw inertia
      this.targetYaw += this.velocityX * 7.5;
      this.targetPitch += this.velocityY * 7.5;
      this.clampTargets();
    };

    // Mouse Listeners
    el.addEventListener("mousedown", (e) => {
      if (e.target.closest(".custom-hotspot-nav") || e.target.closest(".custom-hotspot-info")) return;
      onPointerDown(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
      onPointerMove(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", () => {
      onPointerUp();
    });

    // Touch Listeners (Mobile 1-Finger Drag + 2-Finger Pinch Zoom)
    el.addEventListener("touchstart", (e) => {
      if (e.target.closest(".custom-hotspot-nav") || e.target.closest(".custom-hotspot-info")) return;
      this.activeTouches = e.touches.length;

      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.touchPinchDist = Math.hypot(dx, dy);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const diff = dist - this.touchPinchDist;
        this.touchPinchDist = dist;

        this.targetFov = Math.max(this.minFov, Math.min(this.maxFov, this.targetFov - diff * 0.15));
      }
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      if (e.touches.length === 0) {
        onPointerUp();
      }
    }, { passive: true });

    // Smooth Mouse Wheel Zoom
    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.04;
      this.targetFov = Math.max(this.minFov, Math.min(this.maxFov, this.targetFov + zoomDelta));
    }, { passive: false });
  }

  clampTargets() {
    const aspect = (this.camera && this.camera.aspect) ? this.camera.aspect : (this.width / this.height);
    const halfVfov = this.currentFov * 0.5;
    const halfHfov = THREE.MathUtils.radToDeg(Math.atan(Math.tan(THREE.MathUtils.degToRad(halfVfov)) * aspect));

    // Cylinder arc is 196 deg (half is 98 deg) -> guaranteed no edge leakage
    const maxYaw = Math.max(8, 96.0 - halfHfov);
    // Cylinder height is 1000 with radius 500: atan(500/500) = 45 deg
    const maxPitch = Math.max(5, 43.0 - halfVfov);

    this.targetYaw = Math.max(-maxYaw, Math.min(maxYaw, this.targetYaw));
    this.targetPitch = Math.max(-maxPitch, Math.min(maxPitch, this.targetPitch));
  }

  resize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    if (this.camera && this.renderer) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
  }

  getYaw() {
    return this.currentYaw;
  }

  setYaw(val) {
    this.targetYaw = Math.max(-this.yawLimit, Math.min(this.yawLimit, val));
  }

  getPitch() {
    return this.currentPitch;
  }

  setPitch(val) {
    this.targetPitch = Math.max(-this.pitchLimit, Math.min(this.pitchLimit, val));
  }

  /**
   * 60/120 FPS Main Render Loop with Inertia Lerp
   */
  animate() {
    requestAnimationFrame(this.animate);

    // Auto-rotate ping-pong motion
    if (isAutoRotating) {
      this.autoRotateTime += 0.012;
      this.targetYaw = Math.sin(this.autoRotateTime) * 36;
    }

    // Smooth Inertia Damping (Lerp)
    this.currentYaw += (this.targetYaw - this.currentYaw) * 0.12;
    this.currentPitch += (this.targetPitch - this.currentPitch) * 0.12;
    this.currentFov += (this.targetFov - this.currentFov) * 0.15;

    // Camera Transformation
    this.camera.fov = this.currentFov;
    this.camera.updateProjectionMatrix();
    this.camera.rotation.y = -THREE.MathUtils.degToRad(this.currentYaw);
    this.camera.rotation.x = THREE.MathUtils.degToRad(this.currentPitch);

    // Render WebGL
    this.renderer.render(this.scene, this.camera);

    // Update Projective Hotspots
    this.updateHotspots();

    // Sync Mini-Radar
    updateRadar(this.currentYaw);
  }
}

/**
 * Initialize on DOM Ready
 */
document.addEventListener("DOMContentLoaded", () => {
  initEngine();
  setupStageExpandInteraction();
  setupHUDControls();
  setupKeyboardControls();
  setupContainerResizeObserver();
});

function initEngine() {
  stage180 = new ArchStage180("panorama-container");
  stage180.loadScene(currentSceneId, () => {
    updateSceneUI(currentSceneId);
  });
}

/**
 * Navigate to Scene with Cinematic Curtain
 */
function navigateToScene(targetSceneId) {
  if (!SCENES[targetSceneId] || !stage180) return;

  const curtain = document.getElementById("transition-curtain");
  curtain.classList.add("active");

  setTimeout(() => {
    currentSceneId = targetSceneId;
    stage180.loadScene(targetSceneId, () => {
      updateSceneUI(targetSceneId);
      setTimeout(() => {
        curtain.classList.remove("active");
      }, 150);
    });
  }, 250);
}

/**
 * Update UI state
 */
function updateSceneUI(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) return;

  const roomNameElem = document.getElementById("active-room-name");
  if (roomNameElem) {
    roomNameElem.textContent = scene.title;
  }

  document.querySelectorAll(".room-chip-btn").forEach((btn) => {
    if (btn.dataset.scene === sceneId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const mapDot = document.getElementById("radar-marker");
  if (mapDot && scene.mapCoords) {
    mapDot.setAttribute("cx", scene.mapCoords.x);
    mapDot.setAttribute("cy", scene.mapCoords.y);
  }
}

/**
 * Update Radar Field of View rotation
 */
function updateRadar(yaw) {
  const radarCone = document.getElementById("radar-fov-cone");
  const scene = SCENES[currentSceneId];
  if (!radarCone || !scene) return;

  const currentYaw = typeof yaw === "number" ? yaw : (stage180 ? stage180.getYaw() : 0);
  const originX = scene.mapCoords ? scene.mapCoords.x : 50;
  const originY = scene.mapCoords ? scene.mapCoords.y : 50;

  radarCone.setAttribute("transform", `rotate(${currentYaw}, ${originX}, ${originY})`);
}

/**
 * Navigation Hotspot Element
 */
function createNavHotspot(hotSpotDiv, labelText, targetSceneId) {
  hotSpotDiv.innerHTML = `
    <div class="hotspot-radar-ring">
      <svg class="hotspot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </div>
    <div class="hotspot-label">${labelText}</div>
  `;

  hotSpotDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateToScene(targetSceneId);
  });
}

/**
 * Info Hotspot Element
 */
function createInfoHotspot(hotSpotDiv, title, description) {
  hotSpotDiv.innerHTML = `
    <div class="hotspot-info-wrapper">
      <div class="hotspot-info-pulse"></div>
      <button type="button" class="hotspot-info-btn" aria-label="${title}">
        <svg class="hotspot-plus-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <div class="hotspot-info-tag">
        <span class="hotspot-tag-kicker">MİMARİ DETAY</span>
        <span class="hotspot-tag-title">${title}</span>
      </div>
    </div>
  `;

  let lastTriggered = 0;
  const triggerOpen = (e) => {
    const now = Date.now();
    if (now - lastTriggered < 250) return;
    lastTriggered = now;

    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    showInfoModal(title, description);
  };

  hotSpotDiv.addEventListener("click", triggerOpen);
  hotSpotDiv.addEventListener("touchend", triggerOpen);
}

/**
 * Setup Framed vs Fullscreen Stage Toggle Interaction
 */
function setupStageExpandInteraction() {
  const stage = document.getElementById("hero-stage");
  const btnCollapse = document.getElementById("btn-collapse");
  const btnFullscreen = document.getElementById("btn-fullscreen");
  const navOpenTour = document.getElementById("nav-open-tour");

  const expandStage = () => {
    if (isExpanded) return;
    isExpanded = true;
    stage.classList.add("is-expanded");
    document.body.style.overflow = "hidden";

    if (btnFullscreen) {
      const exp = btnFullscreen.querySelector(".icon-expand");
      const shr = btnFullscreen.querySelector(".icon-shrink");
      if (exp) exp.style.display = "none";
      if (shr) shr.style.display = "block";
    }

    setTimeout(() => {
      if (stage180) stage180.resize();
    }, 150);
    setTimeout(() => {
      if (stage180) stage180.resize();
    }, 450);
  };

  const collapseStage = () => {
    if (!isExpanded) return;
    isExpanded = false;
    stage.classList.remove("is-expanded");
    document.body.style.overflow = "";

    if (btnFullscreen) {
      const exp = btnFullscreen.querySelector(".icon-expand");
      const shr = btnFullscreen.querySelector(".icon-shrink");
      if (exp) exp.style.display = "block";
      if (shr) shr.style.display = "none";
    }

    setTimeout(() => {
      if (stage180) stage180.resize();
    }, 350);
  };

  if (btnFullscreen) {
    btnFullscreen.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isExpanded) {
        collapseStage();
      } else {
        expandStage();
      }
    });
  }

  if (navOpenTour) {
    navOpenTour.addEventListener("click", (e) => {
      e.preventDefault();
      expandStage();
    });
  }

  if (btnCollapse) {
    btnCollapse.addEventListener("click", (e) => {
      e.stopPropagation();
      collapseStage();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      collapseStage();
    }
  });
}

/**
 * HUD & Modal Controls
 */
function setupHUDControls() {
  // Room chip buttons
  document.querySelectorAll(".room-chip-btn").forEach((btn) => {
    let lastTap = 0;
    const handleRoomSelect = (e) => {
      const now = Date.now();
      if (now - lastTap < 250) return;
      lastTap = now;

      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      const sceneId = btn.dataset.scene;
      navigateToScene(sceneId);
    };

    btn.addEventListener("click", handleRoomSelect);
    btn.addEventListener("touchend", handleRoomSelect);
  });

  // Auto-Rotate Toggle (Smooth 180° Architectural Swing)
  const btnRotate = document.getElementById("btn-autorotate");
  if (btnRotate) {
    btnRotate.addEventListener("click", (e) => {
      e.stopPropagation();
      isAutoRotating = !isAutoRotating;
      if (isAutoRotating) {
        btnRotate.classList.add("active");
        btnRotate.title = "Otomatik Döndürmeyi Durdur";
      } else {
        btnRotate.classList.remove("active");
        btnRotate.title = "Otomatik Döndür";
      }
    });
  }

  // Audio Ambience Toggle
  const btnAudio = document.getElementById("btn-audio");
  if (btnAudio) {
    btnAudio.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!audioEngine) {
        audioEngine = new ArchitecturalAmbience();
      }
      const isPlaying = audioEngine.toggle();
      if (isPlaying) {
        btnAudio.classList.add("active");
        btnAudio.title = "Ambiyans Sesini Kapat";
      } else {
        btnAudio.classList.remove("active");
        btnAudio.title = "Ambiyans Sesini Aç (Şömine & Rüzgar)";
      }
    });
  }

  // Info Modal Close & Backdrop Click
  const modal = document.getElementById("info-modal");
  const modalClose = document.getElementById("modal-close");

  if (modalClose) {
    modalClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeInfoModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      const card = modal.querySelector(".info-modal-card");
      if (card && !card.contains(e.target)) {
        closeInfoModal();
      }
    });

    modal.addEventListener("cancel", () => {
      modal.classList.remove("active");
    });
  }

  const navOpenConcept = document.getElementById("nav-open-concept");
  if (navOpenConcept) {
    navOpenConcept.addEventListener("click", (e) => {
      e.preventDefault();
      showInfoModal(
        "Efe Villa · Mimari Künye",
        "İskandinav orman dokusu ve donmuş göl kenarında konumlandırılan bu brütalist villa; masif dökme beton, sedir ahşap akustik çıtalar, doğal oyma granit kaya duvarlar ve üç katmanlı yalıtımlı panoramik cam cephe ile tasarlanmıştır. 180° sanal tur motoru ile tüm mekanlar gerçekçi ışık simülasyonuyla gezilebilir hale getirilmiştir."
      );
    });
  }
}

/**
 * Info Modal Helpers
 */
function showInfoModal(title, description) {
  const modal = document.getElementById("info-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = title;
    modalBody.textContent = description;

    if (typeof modal.showModal === "function") {
      try {
        if (!modal.open) modal.showModal();
      } catch (err) {
        modal.setAttribute("open", "");
      }
    } else {
      modal.setAttribute("open", "");
    }
    modal.classList.add("active");
  }
}

function closeInfoModal() {
  const modal = document.getElementById("info-modal");
  if (modal) {
    modal.classList.remove("active");
    if (typeof modal.close === "function" && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }
}

/**
 * Keyboard Controls (WASD, Arrows & Escape)
 */
function setupKeyboardControls() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("info-modal");
      if (modal && (modal.classList.contains("active") || modal.open)) {
        closeInfoModal();
        return;
      }
      if (isExpanded) {
        const btnCollapse = document.getElementById("btn-collapse");
        if (btnCollapse) btnCollapse.click();
      }
      return;
    }

    if (!stage180) return;
    const step = 3.5;
    switch (e.key.toLowerCase()) {
      case "arrowleft":
      case "a":
        stage180.setYaw(stage180.getYaw() - step);
        break;
      case "arrowright":
      case "d":
        stage180.setYaw(stage180.getYaw() + step);
        break;
      case "arrowup":
      case "w":
        stage180.setPitch(stage180.getPitch() + step);
        break;
      case "arrowdown":
      case "s":
        stage180.setPitch(stage180.getPitch() - step);
        break;
    }
  });
}

/**
 * Procedural Web Audio API Ambience Generator (Fireplace & Winter Wind)
 */
class ArchitecturalAmbience {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timer = null;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Wind buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    whiteNoise.start();

    this.startCrackling();
  }

  startCrackling() {
    const triggerPop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120 + Math.random() * 280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.04);

      popGain.gain.setValueAtTime(0.12 * Math.random(), this.ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(popGain);
      popGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);

      const delay = Math.random() * 250 + 80;
      this.timer = setTimeout(triggerPop, delay);
    };

    triggerPop();
  }

  toggle() {
    if (!this.ctx) this.init();
    if (this.ctx.state === "suspended") this.ctx.resume();

    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.2);
    } else {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      if (this.timer) clearTimeout(this.timer);
    }
    return this.isPlaying;
  }
}

/**
 * Resize Observer to automatically sync Three.js canvas buffer with screen dimensions
 */
function setupContainerResizeObserver() {
  const container = document.getElementById("panorama-container");
  if (!container || !window.ResizeObserver) return;

  let resizeTimeout = null;
  const observer = new ResizeObserver(() => {
    if (stage180) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        stage180.resize();
      }, 40);
    }
  });

  observer.observe(container);
}
