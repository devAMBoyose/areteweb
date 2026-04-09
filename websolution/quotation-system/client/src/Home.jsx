import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import logo from "./assets/colored.png";
import Projects from "./components/Projects";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const cards = document.querySelectorAll(".tilt-card");
        const heroVisual = document.querySelector(".hero-visual");
        const typingElement = document.getElementById("typing-text");
        const symbolsContainer = document.getElementById("floating-symbols");

        const typingWords = [
            "Websites",
            "Systems",
            "Dashboards",
            "Automation",
            "Inventory Tools",
            "Client Portals",
            "Digital Solutions",
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        const typeEffect = () => {
            if (!typingElement) return;

            const currentWord = typingWords[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex -= 1;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex += 1;
            }

            let speed = isDeleting ? 55 : 95;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 1200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typingWords.length;
                speed = 250;
            }

            typingTimeout = window.setTimeout(typeEffect, speed);
        };

        typeEffect();

        const codeSymbols = [
            "{",
            "}",
            "</>",
            "[]",
            "()",
            ";",
            "=",
            "/",
            "//",
            "#",
            "$",
            "%",
            "&",
            "*",
            "@",
            "!",
            "+",
            "=>",
            "<div>",
            "<>",
        ];

        if (symbolsContainer) {
            symbolsContainer.innerHTML = "";

            for (let i = 0; i < 30; i++) {
                const symbol = document.createElement("span");
                symbol.className = "floating-code-symbol";
                symbol.textContent =
                    codeSymbols[Math.floor(Math.random() * codeSymbols.length)];

                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const driftX = -60 + Math.random() * 120;
                const driftY = -180 - Math.random() * 180;
                const rotateStart = -40 + Math.random() * 80;
                const rotateEnd = -180 + Math.random() * 360;
                const scaleMid = 0.9 + Math.random() * 0.6;

                symbol.style.left = `${startX}%`;
                symbol.style.top = `${startY}%`;
                symbol.style.fontSize = `${16 + Math.random() * 20}px`;
                symbol.style.animationDelay = `${Math.random() * 8}s`;
                symbol.style.animationDuration = `${4 + Math.random() * 5}s`;

                symbol.style.setProperty("--drift-x", `${driftX}px`);
                symbol.style.setProperty("--drift-y", `${driftY}px`);
                symbol.style.setProperty("--rot-start", `${rotateStart}deg`);
                symbol.style.setProperty("--rot-end", `${rotateEnd}deg`);
                symbol.style.setProperty("--scale-mid", `${scaleMid}`);

                const hueClass = Math.floor(Math.random() * 3);
                if (hueClass === 0) symbol.classList.add("sym-red");
                if (hueClass === 1) symbol.classList.add("sym-sky");
                if (hueClass === 2) symbol.classList.add("sym-green");

                symbolsContainer.appendChild(symbol);
            }
        }

        const handleMove = (e, card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        };

        const resetCard = (card) => {
            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        };

        cards.forEach((card) => {
            const moveHandler = (e) => handleMove(e, card);
            const leaveHandler = () => resetCard(card);

            card.addEventListener("mousemove", moveHandler);
            card.addEventListener("mouseleave", leaveHandler);

            card._moveHandler = moveHandler;
            card._leaveHandler = leaveHandler;
        });

        const handleParallax = (e) => {
            if (!heroVisual || window.innerWidth <= 980) return;

            const x = (window.innerWidth / 2 - e.clientX) / 60;
            const y = (window.innerHeight / 2 - e.clientY) / 60;

            heroVisual.style.transform = `translate(${x}px, ${y}px)`;
        };

        const revealItems = document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    }
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -60px 0px",
            }
        );

        revealItems.forEach((item) => observer.observe(item));

        window.addEventListener("mousemove", handleParallax);

        return () => {
            window.clearTimeout(typingTimeout);

            cards.forEach((card) => {
                if (card._moveHandler) {
                    card.removeEventListener("mousemove", card._moveHandler);
                }
                if (card._leaveHandler) {
                    card.removeEventListener("mouseleave", card._leaveHandler);
                }
            });

            revealItems.forEach((item) => observer.unobserve(item));
            observer.disconnect();

            window.removeEventListener("mousemove", handleParallax);
        };
    }, []);

    return (
        <div className="home-page">
            <div className="mouse-glow" aria-hidden="true"></div>
            <div className="noise" aria-hidden="true"></div>
            <div className="grid-bg" aria-hidden="true"></div>
            <div className="floating-symbols" id="floating-symbols" aria-hidden="true"></div>

            <header className="header">
                <div className="container navbar">
                    <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
                        <img src={logo} alt="DevArete logo" className="logo-img" />
                        <span className="brand-main">{"{Dev}Arete"}</span>
                    </Link>

                    <button
                        className={`menu-toggle ${menuOpen ? "active" : ""}`}
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                        <a href="#home" onClick={() => setMenuOpen(false)}><span>⌂</span> Home</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}><span>•</span> About</a>
                        <a href="#services" onClick={() => setMenuOpen(false)}><span>✦</span> Services</a>
                        <a href="#projects" onClick={() => setMenuOpen(false)}><span>▣</span> Projects</a>
                        <a href="#tech" onClick={() => setMenuOpen(false)}><span>≡</span> Tech Stack</a>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}><span>✉</span> Contact</Link>
                    </nav>
                </div>
            </header>

            <main>
                <section className="hero" id="home">
                    <div className="hero-overlay"></div>

                    <div className="container hero-wrap">
                        <div className="hero-copy reveal-left">
                            <div className="hero-greeting">
                                <span className="greeting-static">Hello, we build&nbsp;</span>
                                <span className="typing-text" id="typing-text"></span>
                                <span className="typing-cursor">|</span>
                            </div>

                            <h1 className="hero-title">
                                <span className="code-word">const</span>
                                <span className="code-equal"> = </span>
                                <span className="gradient-text">Business Growth</span>
                                <span className="code-semicolon">;</span>
                            </h1>

                            <div className="hero-role">
                                <span className="role-slash">//</span>
                                <span>Websites, Systems, Dashboards & Automation</span>
                            </div>

                            <p className="hero-desc">
                                {`{Dev}Arete Web Solutions`} creates premium business websites,
                                admin dashboards, inventory systems, quotation tools, and custom
                                web applications designed for real operations and long-term growth.
                            </p>

                            <div className="hero-actions">
                                <Link to="/contact" className="btn btn-primary">
                                    Get In Touch
                                </Link>

                                <a href="#projects" className="btn btn-secondary">
                                    View Projects
                                </a>
                            </div>

                            <div className="hero-mini-icons">
                                <a href="#services" className="mini-icon">WS</a>
                                <a href="#projects" className="mini-icon">UI</a>
                                <a href="#tech" className="mini-icon">DB</a>
                                <a href="#about" className="mini-icon">SYS</a>
                                <Link to="/contact" className="mini-icon">INQ</Link>
                            </div>
                        </div>

                        <div className="hero-visual reveal-right">
                            <div className="hero-visual-bg"></div>
                            <div className="hero-orbit orbit-1"></div>
                            <div className="hero-orbit orbit-2"></div>
                            <div className="hero-ring"></div>

                            <div className="hero-core tilt-card reveal-scale">
                                <div className="hero-core-inner">{"{/}"}</div>
                            </div>

                            <div className="float-card fc-1 premium-hover tilt-card stagger-item">
                                <div className="float-icon">✦</div>
                                <div>
                                    <strong>Frontend</strong>
                                    <span>React, responsive UI, premium UX</span>
                                </div>
                            </div>

                            <div className="float-card fc-2 premium-hover tilt-card stagger-item">
                                <div className="float-icon">⌘</div>
                                <div>
                                    <strong>Systems</strong>
                                    <span>Dashboards, workflows, business tools</span>
                                </div>
                            </div>

                            <div className="float-card fc-3 premium-hover tilt-card stagger-item">
                                <div className="float-icon">⬢</div>
                                <div>
                                    <strong>Backend</strong>
                                    <span>Node.js, APIs, database logic</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <div className="scroll-mouse">
                            <div className="scroll-wheel"></div>
                        </div>
                        <span>Scroll Down</span>
                    </div>
                </section>

                <section className="section" id="about">
                    <div className="container">
                        <div className="section-head reveal">
                            <span className="section-no">01</span>
                            <h2 className="section-title-dev">
                                {"<About"} <span>Us</span> {"/>"}
                            </h2>
                            <div className="section-line-dev"></div>
                        </div>

                        <div className="about-stack">
                            <div className="about-panel about-panel-lg premium-hover tilt-card reveal-left">
                                <div className="card-shine"></div>

                                <span className="badge">About DevArete</span>
                                <h3 className="about-title">
                                    Unleashing Potential with <span>Creative Strategy</span>
                                </h3>

                                <p className="about-text">
                                    At <strong>{`{Dev}Arete Web Solutions`}</strong>, we believe every business
                                    has untapped potential — and unlocking it begins with the right digital
                                    strategy. We combine innovation, design thinking, and business insight
                                    to build solutions that do more than look impressive — they work with purpose.
                                </p>

                                <p className="about-text">
                                    Our approach is rooted in clarity, usability, and measurable impact.
                                    Every project is crafted to strengthen your brand, improve user experience,
                                    streamline operations, and support long-term business growth.
                                </p>

                                <div className="about-points-grid">
                                    <div className="about-point premium-hover stagger-item">
                                        <div className="about-point-icon">
                                            <span>◎</span>
                                        </div>
                                        <div>
                                            <h4>Purpose-Driven Design</h4>
                                            <p>Every visual element and feature is built to support a clear business objective.</p>
                                        </div>
                                    </div>

                                    <div className="about-point premium-hover stagger-item">
                                        <div className="about-point-icon">
                                            <span>◉</span>
                                        </div>
                                        <div>
                                            <h4>User-Centered Approach</h4>
                                            <p>We design around your audience to create experiences that feel intuitive and effective.</p>
                                        </div>
                                    </div>

                                    <div className="about-point premium-hover stagger-item">
                                        <div className="about-point-icon">
                                            <span>◫</span>
                                        </div>
                                        <div>
                                            <h4>Data-Backed Solutions</h4>
                                            <p>We combine creativity with strategy and insight to support measurable business growth.</p>
                                        </div>
                                    </div>

                                    <div className="about-point premium-hover stagger-item">
                                        <div className="about-point-icon">
                                            <span>↗</span>
                                        </div>
                                        <div>
                                            <h4>Agile Execution</h4>
                                            <p>From planning to launch, we move with speed, flexibility, and precision.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="about-panel premium-hover tilt-card reveal-right">
                                <div className="card-shine"></div>

                                <span className="badge">Our Process</span>
                                <h3 className="about-title">
                                    Our process is built for <span>clarity, speed, and results</span>
                                </h3>

                                <p className="about-text about-process-intro">
                                    Great digital solutions do not happen by accident. They come from a
                                    structured process where every phase adds value, reduces confusion,
                                    and keeps your project moving forward with confidence.
                                </p>

                                <div className="process-grid">
                                    <div className="process-card premium-hover stagger-item">
                                        <div className="process-number process-number-blue">01</div>
                                        <h4>Discovery & Strategy</h4>
                                        <p>
                                            We begin by understanding your goals, challenges, and audience,
                                            then shape a strategy aligned with your business direction.
                                        </p>
                                    </div>

                                    <div className="process-card premium-hover stagger-item">
                                        <div className="process-number process-number-cyan">02</div>
                                        <h4>Design & Prototyping</h4>
                                        <p>
                                            We turn ideas into polished layouts and interactive concepts
                                            focused on usability, branding, and visual impact.
                                        </p>
                                    </div>

                                    <div className="process-card premium-hover stagger-item">
                                        <div className="process-number process-number-green">03</div>
                                        <h4>Development & Integration</h4>
                                        <p>
                                            We build fast, secure, and scalable websites and systems using
                                            modern technologies and reliable architecture.
                                        </p>
                                    </div>

                                    <div className="process-card premium-hover stagger-item">
                                        <div className="process-number process-number-mix">04</div>
                                        <h4>Testing & Launch</h4>
                                        <p>
                                            Before launch, we test performance, responsiveness, and
                                            functionality to ensure a smooth and dependable final result.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="services">
                    <div className="container">
                        <div className="section-head reveal">
                            <span className="section-no">02</span>
                            <h2 className="section-title-dev">{"<Services />"}</h2>
                            <div className="section-line-dev"></div>
                        </div>

                        <p className="section-subtitle reveal">
                            We deliver end-to-end digital solutions tailored to your business goals —
                            from websites and systems to automation, design, marketing, and secure
                            digital infrastructure. Every service we offer is built to improve
                            efficiency, strengthen your brand, and help your business grow with confidence.
                        </p>

                        <div className="grid-3">
                            <div className="service-card clean-card">
                                <div className="service-icon">{"</>"}</div>
                                <h3>Custom Web Development</h3>
                                <p>Scalable websites and systems built for real business operations.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>

                            <div className="service-card clean-card">
                                <div className="service-icon">📱</div>
                                <h3>Mobile Solutions</h3>
                                <p>Mobile-ready apps and platforms accessible anytime, anywhere.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>

                            <div className="service-card clean-card">
                                <div className="service-icon">🎨</div>
                                <h3>UI/UX Design</h3>
                                <p>Clean, intuitive design that improves user experience and trust.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>

                            <div className="service-card clean-card">
                                <div className="service-icon">📊</div>
                                <h3>Digital Marketing</h3>
                                <p>Increase visibility, attract clients, and grow your brand online.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>

                            <div className="service-card clean-card">
                                <div className="service-icon">☁</div>
                                <h3>Cloud Systems</h3>
                                <p>Flexible cloud-based tools for smarter and remote operations.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>

                            <div className="service-card clean-card">
                                <div className="service-icon">🔒</div>
                                <h3>Security</h3>
                                <p>Protect your systems, data, and users with secure solutions.</p>
                                <a href="#contact-cta" className="learn-more">Learn More →</a>
                            </div>
                        </div>
                    </div>
                </section>

                <Projects />

                <section className="section" id="tech">
                    <div className="container">
                        <div className="section-head reveal">
                            <span className="section-no">04</span>
                            <h2 className="section-title-dev">{"<Tech Stack />"}</h2>
                            <div className="section-line-dev"></div>
                        </div>

                        <div className="tech-panel">
                            <div className="tech-bg-orb tech-bg-orb-1"></div>
                            <div className="tech-bg-orb tech-bg-orb-2"></div>

                            <div className="tech-group">
                                <h3 className="tech-group-title">Frontend</h3>
                                <div className="tech-icons-grid">
                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                                            alt="HTML5"
                                            className="tech-logo-img"
                                        />
                                        <span>HTML5</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                                            alt="CSS3"
                                            className="tech-logo-img"
                                        />
                                        <span>CSS3</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                                            alt="JavaScript"
                                            className="tech-logo-img"
                                        />
                                        <span>JavaScript</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                            alt="React"
                                            className="tech-logo-img tech-spin"
                                        />
                                        <span>React</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
                                            alt="Vite"
                                            className="tech-logo-img"
                                        />
                                        <span>Vite</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                            alt="TypeScript"
                                            className="tech-logo-img"
                                        />
                                        <span>TypeScript</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tech-divider"></div>

                            <div className="tech-group">
                                <h3 className="tech-group-title">Backend</h3>
                                <div className="tech-icons-grid tech-icons-grid-backend">
                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                                            alt="Node.js"
                                            className="tech-logo-img"
                                        />
                                        <span>Node.js</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                                            alt="Express"
                                            className="tech-logo-img tech-logo-dark"
                                        />
                                        <span>Express</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
                                            alt="PHP"
                                            className="tech-logo-img"
                                        />
                                        <span>PHP</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
                                            alt="Spring"
                                            className="tech-logo-img"
                                        />
                                        <span>Spring</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                                            alt="Java"
                                            className="tech-logo-img"
                                        />
                                        <span>Java</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tech-divider"></div>

                            <div className="tech-group">
                                <h3 className="tech-group-title">Database</h3>
                                <div className="tech-icons-grid tech-icons-grid-sm">
                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                                            alt="MongoDB"
                                            className="tech-logo-img"
                                        />
                                        <span>MongoDB</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                                            alt="MySQL"
                                            className="tech-logo-img"
                                        />
                                        <span>MySQL</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                            alt="PostgreSQL"
                                            className="tech-logo-img"
                                        />
                                        <span>PostgreSQL</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
                                            alt="Firebase"
                                            className="tech-logo-img"
                                        />
                                        <span>Firebase</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tech-divider"></div>

                            <div className="tech-group">
                                <h3 className="tech-group-title">Tools</h3>
                                <div className="tech-icons-grid tech-icons-grid-sm">
                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                                            alt="Docker"
                                            className="tech-logo-img"
                                        />
                                        <span>Docker</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                                            alt="Git"
                                            className="tech-logo-img"
                                        />
                                        <span>Git</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                            alt="GitHub"
                                            className="tech-logo-img tech-logo-dark"
                                        />
                                        <span>GitHub</span>
                                    </div>

                                    <div className="tech-logo-card premium-hover reveal-scale">
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
                                            alt="VS Code"
                                            className="tech-logo-img"
                                        />
                                        <span>VS Code</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="contact-cta">
                    <div className="container">
                        <div className="cta premium-hover tilt-card reveal-scale">
                            <div className="card-shine"></div>
                            <span className="badge">Let’s build something premium</span>
                            <h2>Need a Beautiful Website or Business System?</h2>
                            <p>
                                Tell us what you need and we will help turn it into a premium,
                                functional, business-ready web solution.
                            </p>

                            <div className="hero-actions cta-actions">
                                <Link to="/contact" className="btn btn-primary">
                                    Contact Us
                                </Link>
                                <a href="#services" className="btn btn-secondary">
                                    Explore Services
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}