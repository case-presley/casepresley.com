// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BlogManagement from './components/admin/BlogManagement';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectProgressSection from './components/ProjectProgressSection.jsx';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App()
{
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <HeroSection />
                            <AboutSection />
                            <ProjectsSection />
                            <ProjectProgressSection />
                            <ContactSection />
                            <Footer /> {/* Add Footer here */}
                        </>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<BlogManagement />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
