// src/components/AboutSection.jsx

import React from 'react';
import './AboutSection.css';

const AboutSection = () =>
{
    return (
        <section className="about" id="about">
            <div className="about-content">
                <div className="profile-photo">
                    <img src="/src/assets/kangaroo new.png" alt="Case Presley" className="animated-logo" />
                </div>
                <div className="about-text">
                    <h2 className="animated-title">About Me</h2>
                    <p className="reading-effect">
                        Hi, I’m Case Presley—a full-time student, passionate developer, and creative thinker dedicated
                        to creating free, open-source software and materials. My journey started with a love for video games,
                        which fueled my passion for technology. Now, as I pursue a Bachelor’s degree in Computer Science,
                        I’m diving into everything from programming and game design to IT as a whole. I’m always exploring new
                        ways to build, connect, and learn.
                    </p>
                    <p className="reading-effect">
                        Whether I’m building dynamic applications or designing immersive game worlds, my goal is to create
                        meaningful, engaging experiences that inspire and connect people—all while making them accessible to everyone.
                    </p>
                    <p className="reading-effect">
                        I believe in the power of open-source and community-driven development, which is why all my projects
                        are free for anyone to use, learn from, or contribute to. When I'm not coding, you might find me working on
                        my home server, making music, playing video games, watching movies with my wife, or brainstorming my next project.
                        I’m always eager to dive into new challenges, expand my skill set, and collaborate on projects that embody the
                        spirit of open-source and innovation.
                    </p>
                    <p className="reading-effect">Thank you for stopping by, and feel free to reach out if you’d like to connect, collaborate, or just chat!</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
