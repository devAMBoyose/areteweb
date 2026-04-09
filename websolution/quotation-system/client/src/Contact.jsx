import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./home.css";
import "./contact.css";
import logo from "./assets/colored.png";

export default function Contact() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [submitType, setSubmitType] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const symbolsContainer = document.getElementById("floating-symbols");

        const codeSymbols = [
            "{", "}", "</>", "[]", "()", ";", "=", "/", "//", "#", "$", "%",
            "&", "*", "@", "!", "+", "=>", "<div>", "<>"
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
    }, []);

    const validateForm = (form) => {
        const newErrors = {};

        if (!form.fullName.value.trim()) newErrors.fullName = "Full Name is required.";
        if (!form.email.value.trim()) {
            newErrors.email = "Email Address is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email.value.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!form.projectType.value.trim()) newErrors.projectType = "Project Type is required.";
        if (!form.projectGoal.value.trim()) newErrors.projectGoal = "Main Goal of the Project is required.";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const validationErrors = validateForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitType("error");
            setSubmitMessage("Please complete the required fields.");
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        setSubmitMessage("");
        setSubmitType("");

        try {
            const selectedModules = Array.from(
                form.querySelectorAll('input[name="modules"]:checked')
            ).map((item) => item.value);

            const templateParams = {
                fullName: form.fullName.value,
                companyName: form.companyName.value,
                email: form.email.value,
                phone: form.phone.value,
                contactMethod: form.contactMethod.value,
                projectType: form.projectType.value,
                industry: form.industry.value,
                launchDate: form.launchDate.value,
                budget: form.budget.value,
                existingWebsite: form.existingWebsite.value,
                referenceLink: form.referenceLink.value,
                projectGoal: form.projectGoal.value,
                features: form.features.value,
                modules: selectedModules.join(", "),
                workflow: form.workflow.value,
                notes: form.notes.value,
            };

            const response = await emailjs.send(
                "service_k1pu0cl",
                "template_skj8scg",
                templateParams,
                "kQ8Kn9we7qZysIhRj"
            );

            console.log("EmailJS success:", response);

            setSubmitType("success");
            setSubmitMessage("Thank you! Your inquiry has been sent successfully.");
            setShowSuccessModal(true);
            form.reset();
        } catch (error) {
            console.error("EmailJS full error:", error);
            console.error("EmailJS status:", error?.status);
            console.error("EmailJS text:", error?.text);

            setSubmitType("error");
            setSubmitMessage(
                `Failed to send inquiry. Status: ${error?.status || "unknown"} ${error?.text || ""}`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            <span>⌂</span> Home
                        </Link>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                            <span>✉</span> Contact
                        </Link>
                    </nav>
                </div>
            </header>

            <main>
                <section className="section" id="contact">
                    <div className="container">
                        <div className="section-head">
                            <span className="section-no">05</span>
                            <h2 className="section-title-dev">
                                {"<Contact"} <span>Us</span> {"/>"}
                            </h2>
                            <div className="section-line-dev"></div>
                        </div>

                        <p className="section-subtitle contact-subtitle">
                            Tell us about your website, system, dashboard, or inventory project.
                            The more details you provide, the easier it is for us to recommend the
                            right solution, timeline, and next steps.
                        </p>

                        <div className="contact-wrap">
                            <div className="card-shine"></div>

                            <aside className="contact-info">
                                <div className="contact-brand-card">
                                    <div className="contact-brand-top">
                                        <div className="contact-brand-icon-wrap">
                                            <img
                                                src={logo}
                                                alt="DevArete logo"
                                                className="contact-brand-icon"
                                            />
                                        </div>

                                        <div className="contact-brand-copy">
                                            <span className="contact-mini-badge">
                                                Premium Web Solutions
                                            </span>
                                            <h3>Let’s build your next digital system</h3>
                                        </div>
                                    </div>

                                    <p className="contact-brand-text">
                                        Share your project goals, required features, and current
                                        workflow. We’ll review the details and recommend the best
                                        solution for your website, dashboard, system, or business
                                        automation needs.
                                    </p>
                                </div>

                                <div className="contact-feature-grid">
                                    <div className="contact-feature-chip">
                                        <span className="contact-chip-icon">⌘</span>
                                        <div>
                                            <strong>Custom Systems</strong>
                                            <small>Built for real operations</small>
                                        </div>
                                    </div>

                                    <div className="contact-feature-chip">
                                        <span className="contact-chip-icon">▣</span>
                                        <div>
                                            <strong>Dashboards</strong>
                                            <small>Clean and business-ready UI</small>
                                        </div>
                                    </div>

                                    <div className="contact-feature-chip">
                                        <span className="contact-chip-icon">↗</span>
                                        <div>
                                            <strong>Automation</strong>
                                            <small>Smarter workflows and tools</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-social-wrapper">
                                    <span className="contact-social-title">Quick Contact</span>

                                    <div className="contact-social-pill">
                                        <a
                                            href="mailto:consult@devarete.com"
                                            className="contact-social-btn email"
                                            aria-label="Email Direct"
                                            data-tip="Email Direct"
                                        >
                                            ✉
                                        </a>

                                        <a
                                            href="https://www.facebook.com/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="contact-social-btn facebook"
                                            aria-label="Facebook Message"
                                            data-tip="Facebook"
                                        >
                                            f
                                        </a>

                                        <a
                                            href="https://wa.me/639214557093"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="contact-social-btn whatsapp"
                                            aria-label="WhatsApp"
                                            data-tip="WhatsApp"
                                        >
                                            💬
                                        </a>

                                        <a
                                            href="viber://chat?number=%2B639214557093"
                                            className="contact-social-btn viber"
                                            aria-label="Viber"
                                            data-tip="Viber"
                                        >
                                            📞
                                        </a>
                                    </div>

                                    <small className="contact-social-sub">
                                        Choose your preferred platform to reach us instantly
                                    </small>
                                </div>
                            </aside>

                            <form className="project-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name *</label>
                                        <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
                                        {errors.fullName && <small className="field-error">{errors.fullName}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="companyName">Company / Business Name</label>
                                        <input type="text" id="companyName" name="companyName" placeholder="Enter business name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                                        {errors.email && <small className="field-error">{errors.email}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone / WhatsApp</label>
                                        <input type="text" id="phone" name="phone" placeholder="Enter phone or WhatsApp number" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactMethod">Preferred Contact Method</label>
                                        <select id="contactMethod" name="contactMethod">
                                            <option value="">Select preferred method</option>
                                            <option>Email</option>
                                            <option>Phone Call</option>
                                            <option>WhatsApp</option>
                                            <option>Facebook Messenger</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="projectType">Project Type *</label>
                                        <select id="projectType" name="projectType">
                                            <option value="">Select project type</option>
                                            <option>Business Website</option>
                                            <option>E-Commerce Website</option>
                                            <option>Admin Dashboard</option>
                                            <option>Inventory System</option>
                                            <option>Quotation System</option>
                                            <option>Booking System</option>
                                            <option>Custom Web Application</option>
                                            <option>Maintenance / Upgrade</option>
                                        </select>
                                        {errors.projectType && <small className="field-error">{errors.projectType}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="industry">Industry / Business Type</label>
                                        <input type="text" id="industry" name="industry" placeholder="Example: Construction, Clinic, Retail" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="launchDate">Target Launch Date</label>
                                        <input type="date" id="launchDate" name="launchDate" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="budget">Estimated Budget</label>
                                        <select id="budget" name="budget">
                                            <option value="">Select budget range</option>
                                            <option>Below ₱20,000</option>
                                            <option>₱20,000 - ₱50,000</option>
                                            <option>₱50,000 - ₱100,000</option>
                                            <option>₱100,000 - ₱250,000</option>
                                            <option>₱250,000+</option>
                                            <option>Need quotation first</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="existingWebsite">Existing Website Link</label>
                                        <input type="url" id="existingWebsite" name="existingWebsite" placeholder="https://yourwebsite.com" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="referenceLink">Reference Website / Inspiration Link</label>
                                        <input type="url" id="referenceLink" name="referenceLink" placeholder="https://example.com" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="projectGoal">Main Goal of the Project *</label>
                                        <textarea
                                            id="projectGoal"
                                            name="projectGoal"
                                            rows="4"
                                            placeholder="Describe what you want the website or system to do for your business."
                                        ></textarea>
                                        {errors.projectGoal && <small className="field-error">{errors.projectGoal}</small>}
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="features">Features Needed</label>
                                        <textarea
                                            id="features"
                                            name="features"
                                            rows="4"
                                            placeholder="Example: user login, inventory tracking, reports, barcode scanning, admin dashboard, quotations, PDF export, payment system, notifications"
                                        ></textarea>
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="checkbox-title">Select Needed Modules / Functions</label>
                                        <div className="checkbox-grid">
                                            <label><input type="checkbox" name="modules" value="Inventory Management" /> Inventory Management</label>
                                            <label><input type="checkbox" name="modules" value="Admin Dashboard" /> Admin Dashboard</label>
                                            <label><input type="checkbox" name="modules" value="User Login" /> User Login</label>
                                            <label><input type="checkbox" name="modules" value="Reports & Analytics" /> Reports & Analytics</label>
                                            <label><input type="checkbox" name="modules" value="Quotation System" /> Quotation System</label>
                                            <label><input type="checkbox" name="modules" value="Invoice / Billing" /> Invoice / Billing</label>
                                            <label><input type="checkbox" name="modules" value="Booking System" /> Booking System</label>
                                            <label><input type="checkbox" name="modules" value="Client Management" /> Client Management</label>
                                            <label><input type="checkbox" name="modules" value="Role-Based Access" /> Role-Based Access</label>
                                            <label><input type="checkbox" name="modules" value="File Upload" /> File Upload</label>
                                            <label><input type="checkbox" name="modules" value="Email Notifications" /> Email Notifications</label>
                                            <label><input type="checkbox" name="modules" value="Payment Integration" /> Payment Integration</label>
                                        </div>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="workflow">Current Workflow / Problem to Solve</label>
                                        <textarea
                                            id="workflow"
                                            name="workflow"
                                            rows="4"
                                            placeholder="Explain your current process and what problem you want to fix or automate."
                                        ></textarea>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="fileUpload">Attach File / Brief / Screenshot</label>
                                        <input type="file" id="fileUpload" name="fileUpload" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="notes">Additional Notes</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows="4"
                                            placeholder="Add any other details, requests, or questions."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                                    </button>

                                    <a
                                        href="mailto:consult@devarete.com"
                                        className="btn btn-secondary"
                                    >
                                        Send Direct Email Instead
                                    </a>
                                </div>

                                {submitMessage && (
                                    <p className={`form-submit-message ${submitType}`}>
                                        {submitMessage}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {showSuccessModal && (
                <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Thank you!</h3>
                        <p>Your inquiry has been sent successfully. We will contact you soon.</p>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}