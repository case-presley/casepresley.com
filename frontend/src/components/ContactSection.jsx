// src/components/ContactSection.jsx

import React from 'react';
import './ContactSection.css';

const ContactSection = () =>
{
    return (
        <section className="contact" id="contact">
            <h2 className="contact-title">Contact Me</h2>
            <p className="contact-intro">I'd love to hear from you! Feel free to reach out via the form below.</p>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit" className="contact-button">Send Message</button>
            </form>
            <div className="social-links">
                <a href="#" className="social-link fab fa-github"></a>
                <a href="#" className="social-link fab fa-linkedin"></a>
            </div>
        </section>
    );
};

export default ContactSection;
