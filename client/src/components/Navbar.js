import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/projects"
                    className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
                >
                    Projects
                </Link>
                <Link
                    to="/certificates"
                    className={`nav-link ${location.pathname === '/certificates' ? 'active' : ''}`}
                >
                    Certificates
                </Link>
                <Link
                    to="/current-status"
                    className={`nav-link ${location.pathname === '/current-status' ? 'active' : ''}`}
                >
                    Current Status
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
