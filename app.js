/**
 * EFE VILLA · NORDIC RETREAT
 * Architectural 180° Virtual Experience (OFC Mimarlık Minimalist Edition)
 * Front-Stage Panoramic View with Ultra-HD 4K Razor-Sharp Precision
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
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "İçeri Gir (Salona Geç) 🚪", "living_room")
      },
      {
        pitch: 5,
        yaw: -45,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Üç Katmanlı Yalıtımlı Cam Cephe", "Kuzey iklimine uygun, ısı kaybını sıfırlayan argon dolgulu lamine cam paneller.")
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
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Yatak Odası Süiti (Üst Kat) 🛏️", "bedroom")
      },
      {
        pitch: -3,
        yaw: 42,
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Mutfak & Bar 🍳", "kitchen")
      },
      {
        pitch: -4,
        yaw: -55,
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Şömine Salonu 🔥", "stone_lounge")
      },
      {
        pitch: -6,
        yaw: -82,
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Dış İskele (Çıkış) 🌲", "entrance")
      },
      {
        pitch: -14,
        yaw: -58,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Lineer Bioethanol Şömine", "Baca gerektirmeyen, temiz yanan gerçek alevli mimari lineer şömine ünitesi.")
      },
      {
        pitch: -18,
        yaw: -5,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Özel Üretim Modüler Koltuk", "Leke tutmaz İtalyan keten dokuma kumaş ve kuştüyü dolgulu brütalist salon oturma grubu.")
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
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Ana Salona Dön 🛋️", "living_room")
      },
      {
        pitch: -3,
        yaw: -45,
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Şömine Salonu 🔥", "stone_lounge")
      },
      {
        pitch: -12,
        yaw: 40,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Nero Marquina Mermer Ada", "Masif tek parça damarlı İspanyol mermerinden oyulmuş ankastre pişirme ve bar adası.")
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
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Ana Salona Dön 🛋️", "living_room")
      },
      {
        pitch: -2,
        yaw: 72,
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Yatak Odasına Geç 🛏️", "bedroom")
      },
      {
        pitch: 12,
        yaw: 45,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Oyma Doğal Kaya Duvar", "Yerel taş ocaklarından çıkarılan ham granit bloklar ve gizli lineer tavan aydınlatması.")
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
        type: "custom",
        cssClass: "custom-hotspot-nav",
        createTooltipFunc: (hotSpotDiv) => createNavHotspot(hotSpotDiv, "Salona İncele ⬇️", "living_room")
      },
      {
        pitch: 4,
        yaw: -60,
        type: "custom",
        cssClass: "custom-hotspot-info",
        createTooltipFunc: (hotSpotDiv) => createInfoHotspot(hotSpotDiv, "Akustik Sedir Çıtalar", "Doğal ahşap sedir paneling ile mükemmel ses akustiği ve dinlendirici koku aroması.")
      }
    ]
  }
};

let viewer = null;
let currentSceneId = "entrance";
let isExpanded = false;
let isAutoRotating = false;
let audioEngine = null;

document.addEventListener("DOMContentLoaded", () => {
  initViewer();
  setupStageExpandInteraction();
  setupHUDControls();
  setupKeyboardControls();
  setupContainerResizeObserver();
});

/**
 * Initialize Pannellum 180° viewer (Ultra-HD 4K Crisp Zoom Edition)
 */
function initViewer() {
  const pannellumScenes = {};
  
  for (const [key, scene] of Object.entries(SCENES)) {
    pannellumScenes[key] = {
      title: scene.title,
      type: "equirectangular",
      panorama: scene.panorama,
      pitch: scene.initialPitch,
      yaw: scene.initialYaw,
      hfov: 95,
      minHfov: 72,      // Razor-sharp zoom threshold (avoids pixel interpolation blur)
      maxHfov: 110,     // Architectural natural wide-angle
      minYaw: -90,      // Clamped to 180° front-facing arc
      maxYaw: 90,
      minPitch: -40,    // Clamped vertical field to avoid polar distortion
      maxPitch: 40,
      autoLoad: true,
      showZoomCtrl: false,
      showFullscreenCtrl: false,
      compass: false,
      hotSpots: scene.hotSpots
    };
  }

  viewer = pannellum.viewer("panorama-container", {
    default: {
      firstScene: "entrance",
      sceneFadeDuration: 500,
      autoLoad: true,
      minYaw: -90,
      maxYaw: 90,
      minPitch: -40,
      maxPitch: 40,
      minHfov: 72,
      maxHfov: 110,
      hfov: 95
    },
    scenes: pannellumScenes
  });

  viewer.on("scenechange", (newSceneId) => {
    currentSceneId = newSceneId;
    updateSceneUI(newSceneId);
  });

  // Track yaw for radar FOV cone (runs continuously in framed and full mode)
  setInterval(() => {
    if (viewer) {
      updateRadar();
    }
  }, 40);
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
    document.body.style.overflow = "hidden"; // Prevent background scroll

    if (btnFullscreen) {
      const exp = btnFullscreen.querySelector(".icon-expand");
      const shr = btnFullscreen.querySelector(".icon-shrink");
      if (exp) exp.style.display = "none";
      if (shr) shr.style.display = "block";
    }

    setTimeout(() => {
      if (viewer) viewer.resize();
    }, 150);
    setTimeout(() => {
      if (viewer) viewer.resize();
    }, 500);
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
      if (viewer) viewer.resize();
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

  // Click on top nav "360° Keşif" toggles/expands stage
  if (navOpenTour) {
    navOpenTour.addEventListener("click", (e) => {
      e.preventDefault();
      expandStage();
    });
  }

  // Click on collapse button restores hero frame
  if (btnCollapse) {
    btnCollapse.addEventListener("click", (e) => {
      e.stopPropagation();
      collapseStage();
    });
  }

  // Escape key collapses fullscreen back to frame
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isExpanded) {
      collapseStage();
    }
  });
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
    if (now - lastTriggered < 250) return; // Prevent double trigger on touch+click
    lastTriggered = now;

    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    showInfoModal(title, description);
  };

  hotSpotDiv.addEventListener("click", triggerOpen);
  hotSpotDiv.addEventListener("touchend", triggerOpen);
}

/**
 * Navigate to Scene with Cinematic Curtain
 */
function navigateToScene(targetSceneId) {
  if (!SCENES[targetSceneId]) return;

  const curtain = document.getElementById("transition-curtain");
  curtain.classList.add("active");

  setTimeout(() => {
    viewer.loadScene(targetSceneId);
    setTimeout(() => {
      curtain.classList.remove("active");
    }, 250);
  }, 350);
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
function updateRadar() {
  const radarCone = document.getElementById("radar-fov-cone");
  const scene = SCENES[currentSceneId];
  if (!radarCone || !scene || !viewer) return;

  const currentYaw = viewer.getYaw();
  const originX = scene.mapCoords ? scene.mapCoords.x : 50;
  const originY = scene.mapCoords ? scene.mapCoords.y : 50;

  radarCone.setAttribute("transform", `rotate(${currentYaw}, ${originX}, ${originY})`);
}

/**
 * HUD & Modal Controls
 */
function setupHUDControls() {
  // Room chip buttons (Fast 0ms touch + click response)
  document.querySelectorAll(".room-chip-btn").forEach((btn) => {
    let lastTap = 0;
    const handleRoomSelect = (e) => {
      const now = Date.now();
      if (now - lastTap < 250) return; // Prevent duplicate touch+click
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
  let autoRotateInterval = null;
  let rotateSpeed = -1.2;

  if (btnRotate) {
    btnRotate.addEventListener("click", (e) => {
      e.stopPropagation();
      isAutoRotating = !isAutoRotating;
      if (isAutoRotating) {
        btnRotate.classList.add("active");
        viewer.startAutoRotate(rotateSpeed);
        autoRotateInterval = setInterval(() => {
          if (!viewer || !isAutoRotating) return;
          const currentYaw = viewer.getYaw();
          if (currentYaw >= 65 && rotateSpeed > 0) {
            rotateSpeed = -1.2;
            viewer.startAutoRotate(rotateSpeed);
          } else if (currentYaw <= -65 && rotateSpeed < 0) {
            rotateSpeed = 1.2;
            viewer.startAutoRotate(rotateSpeed);
          }
        }, 150);
      } else {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        viewer.stopAutoRotate();
        btnRotate.classList.remove("active");
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
    // Clicking backdrop (outside the card) dismisses modal
    modal.addEventListener("click", (e) => {
      const card = modal.querySelector(".info-modal-card");
      if (card && !card.contains(e.target)) {
        closeInfoModal();
      }
    });

    // Native cancel event (e.g. Esc key pressed on dialog)
    modal.addEventListener("cancel", (e) => {
      modal.classList.remove("active");
    });
  }

  // Nav open concept modal
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

    // Use native showModal when available, fallback to attribute/class
    if (typeof modal.showModal === "function") {
      try {
        if (!modal.open) {
          modal.showModal();
        }
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
    // Escape closes modal or collapses stage
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

    if (!viewer || !isExpanded) return;
    const step = 4;
    switch (e.key.toLowerCase()) {
      case "arrowleft":
      case "a":
        viewer.setYaw(viewer.getYaw() - step);
        break;
      case "arrowright":
      case "d":
        viewer.setYaw(viewer.getYaw() + step);
        break;
      case "arrowup":
      case "w":
        viewer.setPitch(viewer.getPitch() + step);
        break;
      case "arrowdown":
      case "s":
        viewer.setPitch(viewer.getPitch() - step);
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
 * Resize Observer to automatically sync canvas buffer with screen dimensions
 */
function setupContainerResizeObserver() {
  const container = document.getElementById("panorama-container");
  if (!container || !window.ResizeObserver) return;

  let resizeTimeout = null;
  const observer = new ResizeObserver(() => {
    if (viewer) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        viewer.resize();
      }, 50);
    }
  });

  observer.observe(container);
}
