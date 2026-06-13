import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrentStatus.css';

const CurrentStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/status');
            setStatus(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching status:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading status...</div>;
    }

    return (
        <div className="current-status-container">
            <div className="current-status-inner">
                <h1 className="page-title">Current Status</h1>
                <div className="status-detailed-card">
                    <div className="status-header">
                        <div className="status-indicator-large"></div>
                        <h2 className="status-main-title">
                            {status?.status || 'Status not available'}
                        </h2>
                    </div>
                    <div className="status-body">
                        <p className="status-main-description">
                            {status?.description || 'No description available at the moment.'}
                        </p>
                        <div className="status-meta">
                            <div className="status-info-item">
                                <span className="status-label">Last Updated:</span>
                                <span className="status-value">
                                    {status?.updatedAt
                                        ? new Date(status.updatedAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="status-info-section">
                    <h3 className="section-subtitle">What This Means</h3>
                    <div className="info-cards">
                        <div className="info-card">
                            <div className="info-icon" style={{ backgroundColor: '#1e90ff' }}>📧</div>
                            <h4>Available for Contact</h4>
                            <p>Feel free to reach out for collaborations, opportunities, or just to connect.</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon" style={{ backgroundColor: '#ff8c00' }}>💼</div>
                            <h4>Current Projects</h4>
                            <p>Check out the Projects section to see what I'm currently working on.</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon" style={{ backgroundColor: '#00ff00' }}>🎯</div>
                            <h4>Open to Opportunities</h4>
                            <p>Always interested in exciting projects and new challenges.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentStatus;
