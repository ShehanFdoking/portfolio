import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, statusRes, analyticsRes] = await Promise.all([
                axios.get('http://localhost:5001/api/profile'),
                axios.get('http://localhost:5001/api/status'),
                axios.get('http://localhost:5001/api/analytics/dashboard')
            ]);
            setProfile(profileRes.data);
            setStatus(statusRes.data);
            setAnalytics(analyticsRes.data.data);
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
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="description-section">
                        <h1 className="name">{profile?.name || 'Your Name'}</h1>
                        <h2 className="title">{profile?.title || 'Your Title'}</h2>
                        <p className="description">
                            {profile?.description || 'A brief description about yourself.'}
                        </p>
                        <div className="social-links">
                            {profile?.email && (
                                <a href={`mailto:${profile.email}`} className="social-link">
                                    📧 Email
                                </a>
                            )}
                            {profile?.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    💼 LinkedIn
                                </a>
                            )}
                            {profile?.github && (
                                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                    💻 GitHub
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

            {/* Analytics Dashboard */}
            {analytics && (
                <div className="analytics-dashboard">
                    {/* Overview Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <h3>{analytics.overview.totalProjects}</h3>
                                <p>Projects</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🏆</div>
                            <div className="stat-content">
                                <h3>{analytics.overview.totalCertificates}</h3>
                                <p>Certificates</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-content">
                                <h3>{analytics.overview.totalTechnologies}</h3>
                                <p>Technologies</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-content">
                                <h3>{analytics.overview.activityScore}%</h3>
                                <p>Activity Score</p>
                            </div>
                        </div>
                    </div>

                    {/* Skill Level & Career Readiness */}
                    <div className="progress-section">
                        <div className="progress-card">
                            <h3>💡 Skill Level</h3>
                            <div className="skill-badge">{analytics.overview.skillLevel.level}</div>
                            <p className="skill-label">{analytics.overview.skillLevel.label}</p>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${analytics.overview.skillLevel.percentage}%` }}
                                ></div>
                            </div>
                            <p className="progress-text">{analytics.overview.skillLevel.percentage}% Mastery</p>
                        </div>

                        <div className="progress-card">
                            <h3>🚀 Career Readiness</h3>
                            <div className="skill-badge">{analytics.careerReadiness.level}</div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill career"
                                    style={{ width: `${analytics.careerReadiness.percentage}%` }}
                                ></div>
                            </div>
                            <p className="progress-text">{analytics.careerReadiness.percentage}% Ready</p>
                            <div className="readiness-checks">
                                {analytics.careerReadiness.checks.map((check, index) => (
                                    <div key={index} className="check-item">
                                        <span className={check.status ? 'check-icon success' : 'check-icon'}>
                                            {check.status ? '✓' : '○'}
                                        </span>
                                        <span>{check.item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="progress-card">
                            <h3>📋 Portfolio Completeness</h3>
                            <div className="circular-progress">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#00ff00"
                                        strokeWidth="8"
                                        strokeDasharray={`${2 * Math.PI * 45}`}
                                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - analytics.overview.portfolioCompleteness / 100)}`}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="circular-text">{analytics.overview.portfolioCompleteness}%</div>
                            </div>
                        </div>
                    </div>

                    {/* Current Focus */}
                    <div className="focus-section">
                        <h3>🎯 Current Focus</h3>
                        <div className="focus-card">
                            <div className="focus-primary">{analytics.currentFocus.primary}</div>
                            <p>{analytics.currentFocus.description}</p>
                            <div className="tech-tags">
                                {analytics.currentFocus.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Technologies */}
                    <div className="tech-section">
                        <h3>🔥 Top Technologies</h3>
                        <div className="tech-list">
                            {analytics.topTechnologies.slice(0, 8).map((item, index) => (
                                <div key={index} className="tech-item">
                                    <span className="tech-name">{item.technology}</span>
                                    <div className="tech-bar">
                                        <div
                                            className="tech-bar-fill"
                                            style={{ width: `${(item.projectCount / analytics.overview.totalProjects) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="tech-count">{item.projectCount} projects</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggestions */}
                    {analytics.suggestions.length > 0 && (
                        <div className="suggestions-section">
                            <h3>💡 Suggestions for Growth</h3>
                            <div className="suggestions-grid">
                                {analytics.suggestions.map((suggestion, index) => (
                                    <div key={index} className="suggestion-card">
                                        <div className="suggestion-icon">
                                            {suggestion.type === 'project' ? '📁' : suggestion.type === 'certificate' ? '🏅' : '⚡'}
                                        </div>
                                        <h4>{suggestion.title}</h4>
                                        <p>{suggestion.description}</p>
                                        <div className="suggestion-action">{suggestion.action}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Status Section */}
            <div className="status-section">
                <div className="status-section-inner">
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
        </div>
    );
};

export default Dashboard;
