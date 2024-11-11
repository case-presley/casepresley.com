// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BlogManagement from './components/admin/BlogManagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<BlogManagement />} />
                <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
}

export default App;
