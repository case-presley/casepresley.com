import React, { useState } from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const projects = [
        { title: "Project One", description: "A brief description of Project One.", technologies: ["JavaScript", "React", "CSS"] },
        { title: "Project Two", description: "A brief description of Project Two.", technologies: ["Python", "Flask", "SQL"] },
        { title: "Project Three", description: "A summary of Project Three.", technologies: ["Java", "Spring Boot", "MongoDB"] },
        { title: "Project Four", description: "A summary of Project Four.", technologies: ["C++", "Unreal Engine", "Blueprint"] },
    ];

    const handlePrevClick = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
    const handleNextClick = () => setCurrentIndex((currentIndex + 1) % projects.length);

    return (
        <section className="projects" id="spotlight">
            <h2 className="projects-title">Spotlight</h2>
            <div className="carousel">
                {projects.map((project, index) => {
                    const isActive = index === currentIndex;
                    const isPrev = index === (currentIndex - 1 + projects.length) % projects.length;
                    const isNext = index === (currentIndex + 1) % projects.length;

                    return (
                        <div
                            key={index}
                            className={`project-card ${isActive ? "active" : isPrev ? "prev" : isNext ? "next" : "inactive"}`}
                        >
                            <h3 className="animated-text">{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech">{tech}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
                <div className="carousel-btn left-btn" onClick={handlePrevClick}></div>
                <div className="carousel-btn right-btn" onClick={handleNextClick}></div>
            </div>
        </section>
    );
};

export default ProjectsSection;
