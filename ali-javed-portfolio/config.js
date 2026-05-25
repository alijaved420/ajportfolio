// Portfolio Content Management System (CMS) Configuration File
// Edit this file to easily update your personal info, certificates, projects, skills, and services.

const PORTFOLIO_CONFIG = {
  // Personal & Professional Details
  profile: {
    name: "Ali Javed",
    title: "AI Website Developer & Cybersecurity Specialist",
    tagline: "Building Secure, Intelligent & Premium Digital Experiences",
    bio: "Passionate AI Website Developer and Cybersecurity Specialist with 3+ years of experience. I specialize in building next-generation websites powered by Artificial Intelligence and reinforcing them with state-of-the-art security practices. My mission is to merge interactive UI/UX designs with solid architectural security to deliver websites that not only captivate users but also withstand cyber threats.",
    experienceYears: "3+",
    email: "ali123javed987@gmail.com",
    fiverrUrl: "https://www.fiverr.com/s/VYQwr7x",
    photoUrl: "assets/img/profile.jpg",
    bannerUrl: "assets/img/banner-ai.png"
  },

  // Highlight Statistics
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Completed Projects", value: "50+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Certifications", value: "3" }
  ],

  // Core Services Offered
  services: [
    {
      title: "AI Website Development",
      description: "Creating highly interactive, modern web platforms integrating AI models, customized layouts, and premium user experience.",
      icon: "cpu", // Lucide Icon Name
      glowColor: "var(--cyan-glow)"
    },
    {
      title: "Custom Web Applications",
      description: "Developing robust full-stack applications with scalable architectures, smooth API integrations, and customized workflows.",
      icon: "code-2",
      glowColor: "var(--blue-glow)"
    },
    {
      title: "Cybersecurity Audits",
      description: "Conducting thorough penetration testing, vulnerability assessments, and compliance reports to protect your digital assets.",
      icon: "shield-alert",
      glowColor: "var(--purple-glow)"
    },
    {
      title: "Website Security Enhancement",
      description: "Implementing SSL/TLS protocols, solid firewalls, secure databases, DDOS protection, and protection against OWASP Top 10 vulnerabilities.",
      icon: "lock",
      glowColor: "var(--cyan-glow)"
    },
    {
      title: "Security Consulting",
      description: "Advising businesses and freelancers on secure coding techniques, cloud infrastructure security, and data privacy policies.",
      icon: "database-backup",
      glowColor: "var(--blue-glow)"
    },
    {
      title: "AI Chatbot Integration",
      description: "Integrating intelligent, context-aware AI chatbots (GPT-powered) to automate user assistance and customer acquisition.",
      icon: "message-square-code",
      glowColor: "var(--purple-glow)"
    }
  ],

  // Skills Section with Level Percentages
  skills: {
    development: [
      { name: "AI Website Development", level: 95 },
      { name: "Full Stack Web Development", level: 90 },
      { name: "Python Development", level: 85 },
      { name: "Responsive Design", level: 98 },
      { name: "API Integration", level: 92 },
      { name: "UI/UX Design", level: 88 }
    ],
    security: [
      { name: "Cybersecurity", level: 92 },
      { name: "Ethical Hacking", level: 85 },
      { name: "Network Security", level: 88 },
      { name: "Cloud Security", level: 82 }
    ]
  },

  // Professional Certifications & Achievements
  certifications: [
    {
      id: "cert-udemy",
      title: "Network Mastery for Ethical Hackers",
      issuer: "Udemy (Cyber Twinkle)",
      date: "October 1, 2024",
      imageUrl: "assets/certs/cert-udemy.jpg",
      description: "Mastery of network scanning, packet sniffing, firewall bypass, and ethical network vulnerability exploitation."
    },
    {
      id: "cert-pftp",
      title: "Cybersecurity Vocational Certification",
      issuer: "PFTP (Professional Freelancing Training Program)",
      date: "March 8, 2025",
      imageUrl: "assets/certs/cert-pftp.jpg",
      description: "Comprehensive 3-month certification program covering ethical hacking, vulnerability analysis, and security consulting."
    },
    {
      id: "cert-greatlearning",
      title: "Introduction to Cyber Security",
      issuer: "Great Learning Academy",
      date: "September 12, 2024",
      imageUrl: "assets/certs/cert-greatlearning.jpg",
      description: "Fundamental training in information security architectures, network threats, malware types, and cyber defense protocols."
    }
  ],

  // 6 Premium Projects
  projects: [
    {
      title: "Nexora AI - Business Landing Page",
      description: "A premium AI business website showcase incorporating custom 3D glassmorphism elements, neural network illustrations, and high-performance layouts.",
      imageUrl: "assets/img/nexora-home.png",
      tags: ["HTML5", "CSS Grid", "Three.js", "GSAP"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "ShopEase - Premium E-Commerce Platform",
      description: "A state-of-the-art e-commerce storefront layout featuring custom product categorizations, modern clean interfaces, and fast content delivery networks.",
      imageUrl: "assets/img/shopease.png",
      tags: ["JavaScript", "CSS Custom Props", "API Integration", "UX Optimization"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "Cybersecurity Audit & Threat Dashboard",
      description: "An advanced, interactive administrative dashboard designed to visualize network traffic, detect security incidents, and conduct threat monitoring in real-time.",
      imageUrl: "assets/img/banner-ai.png", // Using the banner image as a premium background for the dashboard
      tags: ["ChartJS", "Security Analytics", "Data Vis", "WebSockets"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "IntellectBot - AI Chatbot Platform",
      description: "An elegant, floating web chatbot application with context retention, auto-suggest inputs, and instant serverless API integrations.",
      imageUrl: "assets/img/nexora-about.png", // Creative fallback
      tags: ["OpenAI API", "Node.js", "Vanilla JS", "TailwindCSS"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "ShieldSentinel - Security Monitoring System",
      description: "A system service dashboard prototype focusing on intrusion prevention configurations, IP banning mechanisms, and automated log analysis reports.",
      imageUrl: "assets/img/banner-ai.png", // Creative fallback
      tags: ["Python", "Ethical Hacking", "Logs Analysis", "FastAPI"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      title: "Personal Branding Studio",
      description: "A custom branding template highlighting agency credentials, portfolio carousels, responsive grid columns, and animated contact systems.",
      imageUrl: "assets/img/nexora-about.png", // Creative fallback
      tags: ["HTML5", "Sass", "Responsive", "SEO Architecture"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ],

  // Experience History Timeline
  experience: [
    {
      year: "2024 - Present",
      role: "Freelance AI Website Developer & Cybersecurity Consultant",
      company: "Fiverr / Global Clients",
      description: "Building responsive, modern landing pages and e-commerce websites with interactive WebGL layouts. Implementing defensive security measures, firewall rules, and malware removal for client sites."
    },
    {
      year: "2023 - 2024",
      role: "Full Stack Developer & Pentester Specialist",
      company: "Tech Solutions Agency",
      description: "Collaborated in creating secure web applications. Performed security audits on client codebases before launch, identifying vulnerability hotspots and patching server configs."
    },
    {
      year: "2022 - 2023",
      role: "Junior Web Developer & IT Admin",
      company: "Cyber Systems Hub",
      description: "Designed responsive layouts, integrated custom APIs, and maintained server firewalls and backups. Developed automated scripts in Python for network scanning."
    }
  ],

  // Customer Reviews / Testimonials
  testimonials: [
    {
      name: "Marcus Aurelius",
      role: "CEO of TechVortex Enterprises",
      text: "Ali created an absolutely breathtaking AI-powered landing page for our business. Not only does it look futuristic, but the cybersecurity audit he conducted gave us complete peace of mind. Exceptional service!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marcus"
    },
    {
      name: "Elena Rostova",
      role: "Founder of SafeNodes Security",
      text: "We hired Ali to design and secure our cryptocurrency client dashboard. His skills in combining interactive Three.js graphics with robust security systems are truly elite. Fiverr's hidden gem!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Elena"
    },
    {
      name: "Devon Carter",
      role: "E-commerce Merchant",
      text: "Ali secured my online store and optimized the loading speed. The page transitions are buttery smooth and the custom e-commerce cards look premium. His ethical hacking background makes him stand out.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Devon"
    }
  ]
};

// Export config for ES Modules or just declare as global variable for scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
