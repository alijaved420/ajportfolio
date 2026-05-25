// Core Portfolio Operations Handler
document.addEventListener("DOMContentLoaded", () => {
  // Check if configuration exists
  if (typeof PORTFOLIO_CONFIG === "undefined") {
    console.error("PORTFOLIO_CONFIG is not defined! Check config.js.");
    return;
  }

  const data = PORTFOLIO_CONFIG;

  // Cache DOM Elements
  const navbar = document.getElementById("navbar");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const footerYear = document.getElementById("footer-year");

  // Set Footer Year
  footerYear.textContent = new Date().getFullYear();

  /* ==========================================
     1. Preloader Screen Simulation
     ========================================== */
  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloader-bar");
  const preloaderPct = document.getElementById("preloader-pct");
  
  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 15) + 5;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      
      // Hide Preloader
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        document.body.classList.remove("lock-scroll");
        
        // Start entrance animations
        if (window.startEntranceAnimations) {
          window.startEntranceAnimations();
        }
      }, 300);
    }
    preloaderBar.style.width = `${loadProgress}%`;
    preloaderPct.textContent = `${loadProgress}%`;
  }, 80);

  // Lock scroll during preloader
  document.body.classList.add("lock-scroll");

  /* ==========================================
     2. Navbar Scrolling Effects
     ========================================== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Active Navigation Highlighting on scroll
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* ==========================================
     3. Mobile Navigation Menu
     ========================================== */
  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("lock-scroll");
  });

  // Close Menu on Link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("lock-scroll");
    });
  });

  // Close Menu on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      hamburgerMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("lock-scroll");
    }
  });

  /* ==========================================
     4. Data Injection (CMS Engine)
     ========================================== */
  
  // Hero Image
  const heroImg = document.getElementById("hero-profile-img");
  heroImg.src = data.profile.photoUrl;
  heroImg.alt = data.profile.name;

  // Fiverr Badge Image
  const fiverrImg = document.getElementById("fiverr-profile-img");
  fiverrImg.src = data.profile.photoUrl;
  fiverrImg.alt = data.profile.name;

  // About Me Section
  document.getElementById("about-bio-text").textContent = data.profile.bio;
  
  // Console bio (truncated version)
  const consoleBio = document.getElementById("about-bio-console");
  consoleBio.textContent = `"${data.profile.bio.substring(0, 160)}..."`;

  // Statistics counters
  const statsContainer = document.getElementById("stats-container");
  data.stats.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "stat-card glass-card";
    card.innerHTML = `
      <span class="stat-number" data-target="${parseInt(stat.value)}">0</span>
      <span class="stat-label">${stat.label}</span>
    `;
    statsContainer.appendChild(card);
  });

  // Dynamic Skill Bars
  const devSkillsContainer = document.getElementById("dev-skills-container");
  data.skills.development.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.innerHTML = `
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percentage">${skill.level}%</span>
      </div>
      <div class="skill-bar-outer">
        <div class="skill-bar-inner" data-level="${skill.level}"></div>
      </div>
    `;
    devSkillsContainer.appendChild(item);
  });

  const secSkillsContainer = document.getElementById("sec-skills-container");
  data.skills.security.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.innerHTML = `
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percentage">${skill.level}%</span>
      </div>
      <div class="skill-bar-outer">
        <div class="skill-bar-inner" data-level="${skill.level}"></div>
      </div>
    `;
    secSkillsContainer.appendChild(item);
  });

  // Services Cards
  const servicesContainer = document.getElementById("services-container");
  data.services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card glass-card";
    card.innerHTML = `
      <div class="service-glow-edge"></div>
      <div class="service-icon-box">
        <i data-lucide="${service.icon}"></i>
      </div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    servicesContainer.appendChild(card);
  });

  // Experience History Timeline
  const timelineContainer = document.getElementById("timeline-container");
  data.experience.forEach((exp) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-card glass-card">
        <span class="timeline-year">${exp.year}</span>
        <h3>${exp.role}</h3>
        <span class="timeline-company">${exp.company}</span>
        <p>${exp.description}</p>
      </div>
    `;
    timelineContainer.appendChild(item);
  });

  // Portfolio Cards (6 Projects)
  const projectsContainer = document.getElementById("projects-container");
  data.projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card glass-card";
    
    // Compile tags
    const tagsHtml = proj.tags.map(t => `<span class="tag">${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="project-img-box">
        <img src="${proj.imageUrl}" alt="${proj.title}">
        <div class="project-img-overlay"></div>
      </div>
      <div class="project-content">
        <div class="project-tags">${tagsHtml}</div>
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="project-actions">
          <a href="${proj.demoUrl}" class="btn btn-primary btn-card"><i data-lucide="external-link"></i> Demo</a>
          <a href="${proj.codeUrl}" class="btn btn-secondary btn-card"><i data-lucide="github"></i> Code</a>
        </div>
      </div>
    `;
    projectsContainer.appendChild(card);
  });

  // Certifications Grid
  const certsContainer = document.getElementById("certs-container");
  document.getElementById("cert-counter").textContent = data.certifications.length;
  
  data.certifications.forEach((cert, idx) => {
    const card = document.createElement("div");
    card.className = "cert-card glass-card";
    card.setAttribute("data-index", idx);
    
    card.innerHTML = `
      <div class="cert-img-box">
        <img src="${cert.imageUrl}" alt="${cert.title}">
        <div class="cert-zoom-indicator">
          <i data-lucide="eye"></i>
        </div>
      </div>
      <div class="cert-content">
        <div class="cert-meta">
          <span>${cert.issuer}</span>
          <span>${cert.date.split(",")[1]?.trim() || cert.date}</span>
        </div>
        <h3>${cert.title}</h3>
        <p>${cert.description}</p>
      </div>
    `;
    certsContainer.appendChild(card);
  });

  // Testimonials Cards
  const testimonialsContainer = document.getElementById("testimonials-container");
  const dotsContainer = document.getElementById("testimonial-dots");
  
  data.testimonials.forEach((test, idx) => {
    // Slide
    const card = document.createElement("div");
    card.className = "testimonial-card glass-card";
    
    // Rating Stars
    let starsHtml = "";
    for (let s = 0; s < 5; s++) {
      starsHtml += `<i data-lucide="star" class="${s < test.rating ? 'star-fill' : ''}"></i>`;
    }
    
    card.innerHTML = `
      <img class="testimonial-avatar" src="${test.avatar}" alt="${test.name}">
      <div class="testimonial-rating">${starsHtml}</div>
      <p class="testimonial-text">"${test.text}"</p>
      <div class="testimonial-author">
        <h4>${test.name}</h4>
        <p>${test.role}</p>
      </div>
    `;
    testimonialsContainer.appendChild(card);

    // Dots
    const dot = document.createElement("button");
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute("data-slide", idx);
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    dotsContainer.appendChild(dot);
  });

  // Initialize Lucide Icons immediately after DOM build
  lucide.createIcons();

  /* ==========================================
     5. Testimonial Slider Mechanics
     ========================================== */
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialDots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  
  let currentSlide = 0;
  const totalSlides = testimonialCards.length;

  function updateSlider() {
    testimonialsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    testimonialDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      currentSlide = parseInt(e.currentTarget.getAttribute("data-slide"));
      updateSlider();
    });
  });

  /* ==========================================
     6. Certificate Lightbox Modal
     ========================================== */
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  
  let activeCertIndex = 0;

  function openLightbox(index) {
    activeCertIndex = index;
    const cert = data.certifications[activeCertIndex];
    
    lightboxImg.src = cert.imageUrl;
    lightboxImg.alt = cert.title;
    lightboxTitle.textContent = cert.title;
    lightboxDesc.textContent = `${cert.issuer} • ${cert.date}`;
    
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock-scroll");
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock-scroll");
  }

  // Bind clicks on certificate cards
  document.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"));
      openLightbox(idx);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  
  // Close on backdrop click
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  lightboxNext.addEventListener("click", () => {
    activeCertIndex = (activeCertIndex + 1) % data.certifications.length;
    openLightbox(activeCertIndex);
  });

  lightboxPrev.addEventListener("click", () => {
    activeCertIndex = (activeCertIndex - 1 + data.certifications.length) % data.certifications.length;
    openLightbox(activeCertIndex);
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      lightboxNext.click();
    } else if (e.key === "ArrowLeft") {
      lightboxPrev.click();
    }
  });

  /* ==========================================
     7. Contact Form Handling (Mock Handshake)
     ========================================== */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const service = document.getElementById("form-service").value;
    const message = document.getElementById("form-message").value.trim();
    
    if (!name || !email || !service || !message) {
      formStatus.className = "form-status-msg error";
      formStatus.innerHTML = "[!] SECURE PROTOCOL ERR: ALL FIELDS REQUIRED.";
      return;
    }
    
    // Disable submit button during mock transmission
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="refresh-cw" class="animate-spin"></i> TRANSMITTING CYBER DATA...`;
    lucide.createIcons();
    
    formStatus.className = "form-status-msg";
    formStatus.innerHTML = "INJECTING DATA LAYER... ESTABLISHING HANDSHAKE...";

    setTimeout(() => {
      // Success response
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i data-lucide="check"></i> SECURE DEPLOYED`;
      lucide.createIcons();

      formStatus.className = "form-status-msg success";
      formStatus.innerHTML = `[+] TRANSMISSION SECURE: HANDSHAKE COMPLETED WITH SERVER NODE. THANK YOU, ${name.toUpperCase()}!`;
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = `<i data-lucide="send"></i> Send Transmission`;
        lucide.createIcons();
        formStatus.textContent = "";
      }, 4000);
      
    }, 2000);
  });
});
