// Visual Animations Engine (Three.js & GSAP)
// Handles 3D backgrounds, scroll reveals, custom text typing, and mouse-follow card tilts.

// Bind entrance animations globally so main.js can trigger them on load complete
window.startEntranceAnimations = null;

document.addEventListener("DOMContentLoaded", () => {
  // Check if GSAP and Three.js are available
  if (typeof gsap === "undefined" || typeof THREE === "undefined") {
    console.warn("GSAP or Three.js CDN not loaded properly. Visual effects might be limited.");
    return;
  }

  const data = PORTFOLIO_CONFIG;

  /* ==========================================
     1. Interactive 3D Particles Background (Three.js)
     ========================================== */
  const canvas = document.getElementById("bg-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 30;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 50); // Cyan glow
  pointLight1.position.set(20, 10, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xa855f7, 1.5, 50); // Purple glow
  pointLight2.position.set(-20, -10, 10);
  scene.add(pointLight2);

  // Generate Connected Node System
  const particleCount = window.innerWidth < 768 ? 60 : 120;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  
  // Box limits for particles
  const boxX = 40;
  const boxY = 25;
  const boxZ = 20;

  for (let i = 0; i < particleCount; i++) {
    // Positions
    positions[i * 3] = (Math.random() - 0.5) * boxX;
    positions[i * 3 + 1] = (Math.random() - 0.5) * boxY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * boxZ;

    // Velocities
    velocities.push({
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.03,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  // Geometry
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Material: Custom circular points
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.28,
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Points Mesh
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Mouse Interactions
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  window.addEventListener("mousemove", (event) => {
    mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 4;
    mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 4;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const pos = particleSystem.geometry.attributes.position.array;

    // Update positions
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      pos[idx] += velocities[i].x;
      pos[idx + 1] += velocities[i].y;
      pos[idx + 2] += velocities[i].z;

      // Box Boundary Collision Checks
      if (Math.abs(pos[idx]) > boxX / 2) velocities[i].x *= -1;
      if (Math.abs(pos[idx + 1]) > boxY / 2) velocities[i].y *= -1;
      if (Math.abs(pos[idx + 2]) > boxZ / 2) velocities[i].z *= -1;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Smooth camera mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    camera.position.x = mouse.x;
    camera.position.y = mouse.y;
    camera.lookAt(scene.position);

    // Rotate particle system slowly
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;

    renderer.render(scene, camera);
  }

  animate();

  // Handle Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /* ==========================================
     2. Typing Effect (GSAP cycling)
     ========================================== */
  const typedTextSpan = document.getElementById("typed-text");
  const roles = [
    "AI Website Developer",
    "Cybersecurity Specialist",
    "Ethical Hacker",
    "Full Stack Web Architect"
  ];
  
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40; // Deleting is faster
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100; // Standard typing
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500; // Pause before starting next word
    }

    setTimeout(typeRole, typeSpeed);
  }

  // Trigger typing
  setTimeout(typeRole, 1000);

  /* ==========================================
     3. 3D Hover Tilt Effect
     ========================================== */
  function applyTiltEffect() {
    const tiltCards = document.querySelectorAll(
      ".project-card, .service-card, .cert-card, .fiverr-glass-card"
    );

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate cursor position inside the card relative to center (scale -0.5 to 0.5)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // Max tilt degree: 8deg
        const maxTilt = 8;
        const tiltX = ((yc - y) / yc) * maxTilt;
        const tiltY = -((xc - x) / xc) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        card.style.transition = "transform 0.05s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.transition = "transform 0.5s ease";
      });
    });
  }

  // Apply tilt on static elements
  applyTiltEffect();

  /* ==========================================
     4. GSAP ScrollTrigger Reveal Timelines
     ========================================== */
  
  // Entrance animation for Hero (triggered after preloader clears)
  window.startEntranceAnimations = () => {
    const heroTl = gsap.timeline();
    
    heroTl.from(".navbar", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    heroTl.from(".cyber-badge-wrapper", {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    heroTl.from(".hero-title", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    heroTl.from(".hero-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    heroTl.from(".hero-desc", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    heroTl.from(".hero-actions", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    heroTl.from(".avatar-frame-3d", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "elastic.out(1, 0.75)"
    }, "-=0.8");
  };

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // About Me Section Reveals
  gsap.from(".cyber-console", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%"
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".about-content", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%"
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out"
  });

  // Animated Numbers/Stats Counters
  ScrollTrigger.create({
    trigger: "#stats-container",
    start: "top 80%",
    onEnter: () => {
      const counters = document.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        let count = 0;
        const duration = 1500; // ms
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
          count += Math.ceil(target / (duration / stepTime));
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          // Format as "3+", "50+", "100%", etc.
          if (counter.parentElement.textContent.includes("Satisfaction")) {
            counter.textContent = `${count}%`;
          } else if (counter.parentElement.textContent.includes("Experience") || counter.parentElement.textContent.includes("Completed")) {
            counter.textContent = `${count}+`;
          } else {
            counter.textContent = count;
          }
        }, stepTime);
      });
    }
  });

  // Skill Bars Width Reveal
  ScrollTrigger.create({
    trigger: ".skills-section",
    start: "top 75%",
    onEnter: () => {
      document.querySelectorAll(".skill-bar-inner").forEach((bar) => {
        const targetLevel = bar.getAttribute("data-level");
        bar.style.width = `${targetLevel}%`;
      });
    }
  });

  // Services Staggered Cards Reveal
  gsap.from(".service-card", {
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 70%"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // Timeline Progress and Items Reveal
  const timelineTrigger = ScrollTrigger.create({
    trigger: ".experience-section",
    start: "top 60%",
    end: "bottom 70%",
    scrub: true,
    onUpdate: (self) => {
      // Dynamic height binding
      document.getElementById("timeline-progress-bar").style.height = `${self.progress * 100}%`;
    }
  });

  gsap.from(".timeline-item", {
    scrollTrigger: {
      trigger: ".experience-section",
      start: "top 65%"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Project cards reveals
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".portfolio-section",
      start: "top 65%"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // Certifications grid cards reveals
  gsap.from(".cert-card", {
    scrollTrigger: {
      trigger: ".certifications-section",
      start: "top 70%"
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Fiverr glass card reveals
  gsap.from(".fiverr-glass-card", {
    scrollTrigger: {
      trigger: ".fiverr-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out"
  });

  // Contact section fields reveal
  gsap.from(".contact-card", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%"
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.from(".contact-form-wrapper", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%"
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: "power2.out"
  });
});
