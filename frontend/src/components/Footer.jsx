// src/components/Footer.jsx

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Case Presley. All rights reserved.</p>
            <div className="footer-links">
                <a href="/portfolio">Portfolio</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;
