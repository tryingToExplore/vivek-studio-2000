import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const Portfolio3D = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xe8e4dc, 10, 50);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating geometric shapes with muted colors
    const geometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.BoxGeometry(1, 1, 1),
    ];

    const colors = [
      0x8b9d83, // muted sage
      0xa39b8b, // warm gray
      0x9b8b7e, // muted brown
      0x7e8b9b, // muted blue
    ];

    const meshes = [];
    for (let i = 0; i < 40; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        flatShading: true,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 50;
      mesh.position.y = (Math.random() - 0.5) * 50;
      mesh.position.z = (Math.random() - 0.5) * 50;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        rotation: (Math.random() - 0.5) * 0.02,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate meshes
      meshes.forEach((mesh) => {
        mesh.position.x += mesh.userData.velocity.x;
        mesh.position.y += mesh.userData.velocity.y;

        mesh.rotation.x += mesh.userData.velocity.rotation;
        mesh.rotation.y += mesh.userData.velocity.rotation;

        // Boundary check
        if (Math.abs(mesh.position.x) > 25) mesh.userData.velocity.x *= -1;
        if (Math.abs(mesh.position.y) > 25) mesh.userData.velocity.y *= -1;
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(() => setIsLoaded(true), 300);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const projects = [
    {
      title: "Email Template Builder",
      description:
        "Built from scratch using React, featuring drag-and-drop with Beautiful DND and rich text editing with TinyMCE. Full CRUD operations with JSON serialization.",
      tags: ["React.js", "TypeScript", "Beautiful DND", "TinyMCE"],
      link: "https://app.engagebay.com/login#email-templates",
      gradient: "linear-gradient(135deg, #8b9d83 0%, #a39b8b 100%)",
    },
    {
      title: "Chatbot Builder",
      description:
        "Custom chatbot builder with React and Flow Library integration. Features multi-step flows, conditional responses, and smooth bot-to-agent escalation.",
      tags: ["React.js", "TypeScript", "Flow Library", "Bootstrap"],
      gradient: "linear-gradient(135deg, #9b8b7e 0%, #7e8b9b 100%)",
      note: "Retired after ChatGPT's market entry",
    },
    {
      title: "Untangle Mobile App",
      description:
        "Cross-platform mobile app with React Native and Expo. Features authentication, prayer time monitoring with app blocking, and iOS widgets with Live Activities.",
      tags: ["React Native", "Expo", "Swift", "iOS Widgets"],
      gradient: "linear-gradient(135deg, #7e8b9b 0%, #8b9d83 100%)",
    },
    {
      title: "Form Builder",
      description:
        "Enhanced Vue 2 form builder with cross-mail compatibility, field validation, and dynamic customization capabilities.",
      tags: ["Vue 2", "TypeScript", "Quasar"],
      link: "https://app.engagebay.com/login#add-new-form",
      gradient: "linear-gradient(135deg, #a39b8b 0%, #9b8b7e 100%)",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["React.js", "React Native", "Vue 2", "Angular", "TypeScript"],
    },
    {
      category: "Styling",
      items: ["Tailwind CSS", "Bootstrap", "SASS/SCSS", "Quasar"],
    },
    {
      category: "State & Data",
      items: ["Redux", "RESTful APIs", "JSON", "AJAX"],
    },
    { category: "Tools", items: ["Webpack", "Git/GitHub", "npm/yarn", "CLI"] },
  ];

  return (
    <div className="portfolio-container">
      <canvas ref={canvasRef} className="webgl-canvas" />

      {/* Navigation */}
      <nav className={`nav ${isLoaded ? "loaded" : ""}`}>
        <div className="nav-brand">VM</div>
        <div className="nav-links">
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(section);
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`hero ${isLoaded ? "loaded" : ""}`}>
        <div className="hero-content">
          <div className="hero-tag">Front-End Developer</div>
          <h1 className="hero-title">
            <span className="line">Vivek</span>
            <span className="line">Manna</span>
          </h1>
          <p className="hero-subtitle">
            Crafting scalable web and mobile experiences with 4+ years of
            expertise in React, React Native, and modern frameworks
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2>About Me</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p className="large-text">
                I'm a front-end developer specializing in building exceptional
                digital experiences. Currently pursuing my Master's in Computer
                Science at Concordia University Wisconsin.
              </p>
              <p>
                With over 4 years of experience, I've worked on everything from
                email template builders to cross-platform mobile applications.
                I'm passionate about creating intuitive, performant interfaces
                that users love.
              </p>
              <div className="stats">
                <div className="stat">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="about-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">🏆</div>
                <h3>Star Employee 2023</h3>
                <p>
                  Recognized at EngageBay for exceptional contributions and
                  leadership
                </p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🎓</div>
                <h3>Education</h3>
                <p>
                  Master's in Computer Science from Concordia University
                  Wisconsin
                </p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">💡</div>
                <h3>Innovation</h3>
                <p>
                  Participated in Smart India Hackathon and Concordia Hackathon
                  2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                style={{
                  "--delay": `${index * 0.1}s`,
                  "--gradient": project.gradient,
                }}
              >
                <div className="project-gradient"></div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.note && (
                    <p className="project-note">{project.note}</p>
                  )}
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2>Technical Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="skill-group"
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <h3>{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="skill-item">
                      <span className="skill-dot"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2>Get In Touch</h2>
          </div>
          <div className="contact-content">
            <div className="contact-text">
              <p className="large-text">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>
            </div>
            <div className="contact-info">
              <a href="mailto:mannevivek21@gmail.com" className="contact-item">
                <span className="contact-icon">✉</span>
                <span>mannevivek21@gmail.com</span>
              </a>
              <a href="tel:+14146989598" className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+1 (414) 698-9598</span>
              </a>
              <a
                href="https://www.linkedin.com/in/manne-vivek-237195209/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <span className="contact-icon">💼</span>
                <span>LinkedIn Profile</span>
              </a>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Milwaukee, Wisconsin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Designed & Built by Vivek Manna</p>
          <p className="footer-small">© 2025 All rights reserved</p>
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .portfolio-container {
          font-family: 'Crimson Text', Georgia, serif;
          background: #e8e4dc;
          color: #3d3d3d;
          overflow-x: hidden;
        }

        .webgl-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 4rem;
          background: rgba(232, 228, 220, 0.8);
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #5a5a5a;
          letter-spacing: 2px;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
        }

        .nav-links a {
          color: #6b6b6b;
          text-decoration: none;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-transform: lowercase;
          position: relative;
          transition: color 0.3s;
          font-family: 'Courier New', monospace;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: #8b9d83;
          transition: width 0.3s;
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: #3d3d3d;
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4rem;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }

        .hero.loaded .hero-content {
          animation-play-state: running;
        }

        .hero-tag {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          letter-spacing: 3px;
          color: #8b9d83;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 400;
          line-height: 0.95;
          margin-bottom: 2rem;
          color: #3d3d3d;
        }

        .hero-title .line {
          display: block;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .hero-title .line:first-child {
          animation-delay: 0.7s;
        }

        .hero-title .line:last-child {
          animation-delay: 0.9s;
          color: #8b9d83;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 3rem;
          color: #6b6b6b;
          line-height: 1.6;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2.5rem;
          text-decoration: none;
          font-size: 0.95rem;
          letter-spacing: 1px;
          transition: all 0.3s;
          border: 1px solid #8b9d83;
          font-family: 'Courier New', monospace;
        }

        .btn-primary {
          background: #8b9d83;
          color: #e8e4dc;
        }

        .btn-primary:hover {
          background: #7a8b73;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 157, 131, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #8b9d83;
        }

        .btn-secondary:hover {
          background: rgba(139, 157, 131, 0.1);
          transform: translateY(-2px);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #8b9d83);
          animation: scrollPulse 2s infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Sections */
        section {
          position: relative;
          padding: 8rem 0;
          z-index: 1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .section-number {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          color: #a39b8b;
          letter-spacing: 2px;
        }

        .section-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #3d3d3d;
        }

        /* About Section */
        .about {
          background: rgba(232, 228, 220, 0.6);
          backdrop-filter: blur(10px);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        .about-text .large-text {
          font-size: 1.4rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #3d3d3d;
        }

        .about-text p {
          line-height: 1.8;
          color: #6b6b6b;
          margin-bottom: 1.5rem;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
          padding: 2rem;
          background: rgba(139, 157, 131, 0.1);
          border-radius: 4px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #8b9d83;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          color: #6b6b6b;
          letter-spacing: 1px;
        }

        .about-highlights {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .highlight-card {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(139, 157, 131, 0.2);
          transition: all 0.3s;
        }

        .highlight-card:hover {
          transform: translateX(10px);
          border-color: #8b9d83;
        }

        .highlight-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .highlight-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #3d3d3d;
        }

        .highlight-card p {
          color: #6b6b6b;
          line-height: 1.6;
        }

        /* Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 3rem;
        }

        .project-card {
          position: relative;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 157, 131, 0.2);
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: var(--delay);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: #8b9d83;
          box-shadow: 0 20px 60px rgba(139, 157, 131, 0.2);
        }

        .project-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .project-gradient {
          transform: scaleX(1);
        }

        .project-content h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #3d3d3d;
        }

        .project-content p {
          line-height: 1.7;
          color: #6b6b6b;
          margin-bottom: 1.5rem;
        }

        .project-note {
          font-style: italic;
          font-size: 0.9rem;
          color: #9b8b7e !important;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          padding: 0.4rem 1rem;
          background: rgba(139, 157, 131, 0.15);
          color: #5a5a5a;
          font-size: 0.85rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.5px;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8b9d83;
          text-decoration: none;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          letter-spacing: 1px;
          transition: all 0.3s;
        }

        .project-link:hover {
          gap: 1rem;
          color: #7a8b73;
        }

        /* Skills Section */
        .skills {
          background: rgba(232, 228, 220, 0.6);
          backdrop-filter: blur(10px);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .skill-group {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: var(--delay);
        }

        .skill-group h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: #3d3d3d;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(139, 157, 131, 0.3);
        }

        .skill-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #6b6b6b;
          font-size: 1rem;
          transition: all 0.3s;
          padding: 0.5rem 0;
        }

        .skill-item:hover {
          color: #3d3d3d;
          transform: translateX(10px);
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          background: #8b9d83;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .skill-item:hover .skill-dot {
          transform: scale(1.5);
        }

        /* Contact Section */
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .contact-text .large-text {
          font-size: 1.8rem;
          line-height: 1.6;
          color: #3d3d3d;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-left: 2px solid transparent;
          text-decoration: none;
          color: #6b6b6b;
          transition: all 0.3s;
        }

        .contact-item:hover {
          background: rgba(139, 157, 131, 0.1);
          border-left-color: #8b9d83;
          transform: translateX(10px);
          color: #3d3d3d;
        }

        .contact-icon {
          font-size: 1.5rem;
        }

        /* Footer */
        .footer {
          padding: 3rem 0;
          text-align: center;
          background: rgba(232, 228, 220, 0.8);
          backdrop-filter: blur(10px);
        }

        .footer p {
          color: #6b6b6b;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .footer-small {
          margin-top: 0.5rem;
          font-size: 0.8rem !important;
          color: #a39b8b !important;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav {
            padding: 1.5rem 2rem;
          }

          .container {
            padding: 0 2rem;
          }

          .hero {
            padding: 0 2rem;
          }

          .about-grid,
          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .stats {
            grid-template-columns: repeat(3, 1fr);
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 1.5rem;
            font-size: 0.85rem;
          }

          .hero-title {
            font-size: 4rem;
          }

          .hero-cta {
            flex-direction: column;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          section {
            padding: 5rem 0;
          }

          .section-header {
            margin-bottom: 3rem;
          }
        }

        @media (max-width: 480px) {
          .nav {
            padding: 1rem;
          }

          .nav-links {
            display: none;
          }

          .container {
            padding: 0 1.5rem;
          }

          .hero {
            padding: 0 1.5rem;
          }

          .project-card {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio3D;
