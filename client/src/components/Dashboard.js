import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, statusRes] = await Promise.all([
                axios.get('http://localhost:5000/api/profile'),
                axios.get('http://localhost:5000/api/status')
            ]);
            setProfile(profileRes.data);
            setStatus(statusRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <div className="hero-section">
                <div className="hero-content">
                    <div className="description-section">
                        <h1 className="name">{profile?.name || 'Your Name'}</h1>
                        <h2 className="title">{profile?.title || 'Your Title'}</h2>
                        <p className="description">
                            {profile?.description || 'A brief description about yourself and what you do. This is where you can showcase your skills, experience, and passion.'}
                        </p>
                        <div className="social-links">
                            {profile?.email && (
                                <a href={`mailto:${profile.email}`} className="social-link">
                                    Email
                                </a>
                            )}
                            {profile?.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    LinkedIn
                                </a>
                            )}
                            {profile?.github && (
                                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="profile-image-section">
                        <div className="profile-image-container">
                            {profile?.imageUrl ? (
                                <img src={profile.imageUrl} alt="Profile" className="profile-image" />
                            ) : (
                                <div className="profile-placeholder">
                                    <span>Your Photo</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="status-section">
                <h2 className="section-title">Current Status</h2>
                <div className="status-card">
                    <div className="status-indicator"></div>
                    <div className="status-content">
                        <h3 className="status-title">{status?.status || 'Available for opportunities'}</h3>
                        <p className="status-description">
                            {status?.description || 'Currently open to new projects and collaborations.'}
                        </p>
                        <p className="status-updated">
                            Last updated: {status?.updatedAt ? new Date(status.updatedAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
