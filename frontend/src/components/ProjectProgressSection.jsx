// src/components/ProjectProgressSection.jsx

import React from 'react';
import './ProjectProgressSection.css';

const ProjectProgressSection = () =>
{
    const projects = [
        { name: "Project One", progress: 85 },
        { name: "Project Two", progress: 60 },
        { name: "Project Three", progress: 45 },
        { name: "Project Four", progress: 95 },
        { name: "Project Five", progress: 70 }
    ];

    return (
        <section className="project-progress" id="project-progress">
            <h2 className="progress-title">Project Completion</h2>
            <div className="progress-list">
                {projects.map((project, index) => (
                    <div key={index} className="progress-item">
                        <span className="project-name">{project.name}</span>
                        <div className="progress-bar">
                            <div className="progress-level" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="progress-percent">{project.progress}%</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectProgressSection;
