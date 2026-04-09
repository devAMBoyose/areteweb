import React, { useEffect, useMemo, useRef, useState } from "react";
import portfolio1 from "../assets/portfolio/portfolio-1.webp";
import portfolio2 from "../assets/portfolio/portfolio-2.webp";
import portfolio4 from "../assets/portfolio/portfolio-4.webp";
import portfolio7 from "../assets/portfolio/portfolio-7.webp";
import portfolio10 from "../assets/portfolio/portfolio-10.webp";
import portfolio11 from "../assets/portfolio/portfolio-11.webp";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [isSwitching, setIsSwitching] = useState(false);
    const sliderRef = useRef(null);

    const projectItems = [
        {
            image: portfolio1,
            title: "Travel Booking Website",
            description:
                "A modern travel landing page designed to promote destinations, bookings, and user engagement with a clean premium interface.",
            tags: ["Travel", "Landing Page", "Responsive"],
            category: "Website",
        },
        {
            image: portfolio2,
            title: "Inventory Dashboard System",
            description:
                "A smart admin dashboard for tracking sales, purchase data, stock movement, and business insights in one centralized system.",
            tags: ["Dashboard", "Inventory", "Analytics"],
            category: "Dashboard",
        },
        {
            image: portfolio4,
            title: "Sales Analytics Dashboard",
            description:
                "A data-focused dashboard built for reporting, sales trends, customer insights, and operational decision-making.",
            tags: ["Reports", "Charts", "Admin Panel"],
            category: "Dashboard",
        },
        {
            image: portfolio7,
            title: "Employee Management System",
            description:
                "A structured employee management interface for staff records, teams, and admin-level control across operations.",
            tags: ["Employees", "Management", "System"],
            category: "System",
        },
        {
            image: portfolio10,
            title: "Stock Management System",
            description:
                "A practical stock monitoring solution for warehouse handling, product flow, quantity tracking, and item control.",
            tags: ["Stock", "Warehouse", "Tracking"],
            category: "System",
        },
        {
            image: portfolio11,
            title: "Medical Equipment Website",
            description:
                "A premium product-focused business website built to showcase medical equipment, product categories, and inquiries.",
            tags: ["Website", "Medical", "Branding"],
            category: "Website",
        },
    ];

    const filters = ["All", "Dashboard", "Website", "System"];

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projectItems;
        return projectItems.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    const handleFilterChange = (filter) => {
        setIsSwitching(true);
        setActiveFilter(filter);

        window.setTimeout(() => {
            setIsSwitching(false);
        }, 320);
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        }
    }, [activeFilter]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let intervalId;

        const startAutoScroll = () => {
            intervalId = window.setInterval(() => {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                const step = slider.clientWidth * 0.72;

                if (maxScrollLeft <= 0) return;

                if (slider.scrollLeft + step >= maxScrollLeft - 10) {
                    slider.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    slider.scrollBy({ left: step, behavior: "smooth" });
                }
            }, 4200);
        };

        const stopAutoScroll = () => {
            if (intervalId) window.clearInterval(intervalId);
        };

        startAutoScroll();
        slider.addEventListener("mouseenter", stopAutoScroll);
        slider.addEventListener("mouseleave", startAutoScroll);

        return () => {
            stopAutoScroll();
            slider.removeEventListener("mouseenter", stopAutoScroll);
            slider.removeEventListener("mouseleave", startAutoScroll);
        };
    }, [filteredProjects]);

    const scrollProjects = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const step = slider.clientWidth * 0.72;
        slider.scrollBy({
            left: direction === "left" ? -step : step,
            behavior: "smooth",
        });
    };

    return (
        <section className="section" id="projects">
            <div className="container">
                <div className="section-head reveal in-view">
                    <span className="section-no">03</span>
                    <h2 className="section-title-dev">{"<Projects />"}</h2>
                    <div className="section-line-dev"></div>
                </div>

                <p className="section-subtitle reveal in-view">
                    Explore selected websites, dashboards, and business systems crafted
                    to improve operations, strengthen branding, and create better digital experiences.
                </p>

                <div className="projects-filter reveal in-view">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={`project-filter-btn ${activeFilter === filter ? "active" : ""}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="projects-stage reveal in-view">
                    <button
                        type="button"
                        className="projects-nav-btn projects-nav-btn-left"
                        onClick={() => scrollProjects("left")}
                        aria-label="Previous projects"
                    >
                        ←
                    </button>

                    <div className="projects-slider-wrap">
                        <div
                            className={`projects-slider ${isSwitching ? "is-switching" : ""}`}
                            ref={sliderRef}
                        >
                            {filteredProjects.map((project, index) => (
                                <article
                                    className="project-slide project-card premium-hover tilt-card in-view"
                                    key={`${project.title}-${index}`}
                                >
                                    <div className="card-shine"></div>

                                    <div className="project-image-wrap">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-image"
                                        />
                                    </div>

                                    <div className="project-content">
                                        <div className="project-meta">
                                            <span className="project-category">{project.category}</span>
                                        </div>

                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>

                                        <div className="tag-row">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span className="tag" key={`${tag}-${tagIndex}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <a href="#contact-cta" className="project-link">
                                            Learn More →
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="projects-nav-btn projects-nav-btn-right"
                        onClick={() => scrollProjects("right")}
                        aria-label="Next projects"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}