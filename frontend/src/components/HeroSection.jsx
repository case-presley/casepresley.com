// src/components/HeroSection.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () =>
{
    const [currentText, setCurrentText] = useState('');
    const words = ['a programmer', 'a game developer',
        'a server administrator', 'a writer', 'a musician'];
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() =>
    {
        const handleTyping = () =>
        {
            const fullText = words[wordIndex];
            setCurrentText(
                isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1)
            );

            if (!isDeleting && currentText === fullText)
            {
                setTimeout(() => setIsDeleting(true), 1500);
            }
            else if (isDeleting && currentText === '')
            {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const typingSpeed = isDeleting ? 100 : 150;
        const typingTimeout = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(typingTimeout);
    }, [currentText, isDeleting, wordIndex, words]);

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Hi, I’m <span className="name-highlight">Case Presley</span>,</h1>
                <h2 className="hero-role">and I’m <span>{currentText}</span></h2>
                <p className="hero-subtitle">

                </p>
                <div className="hero-buttons">
                    <Link to="/portfolio" className="hero-button">Portfolio</Link>
                    <Link to="/blog" className="hero-button">Blog</Link>
                    <Link to="/contact" className="hero-button">Contact</Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
