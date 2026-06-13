import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileManager from './managers/ProfileManager';
import ProjectsManager from './managers/ProjectsManager';
import CertificatesManager from './managers/CertificatesManager';
import StatusManager from './managers/StatusManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState({});
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [status, setStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin/login');
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [profileRes, projectsRes, certificatesRes, statusRes] = await Promise.all([
                axios.get('http://localhost:5001/api/profile'),
                axios.get('http://localhost:5001/api/projects'),
                axios.get('http://localhost:5001/api/certificates'),
                axios.get('http://localhost:5001/api/status')
            ]);

            setProfile(profileRes.data || {});
            setProjects(projectsRes.data || []);
            setCertificates(certificatesRes.data || []);
            setStatus(statusRes.data || {});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminName');
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-header-actions">
                    <span className="admin-name">Welcome, {localStorage.getItem('adminName') || 'Shehan'}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                    <button onClick={() => navigate('/')} className="view-site-btn">View Site</button>
                </div>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects ({projects.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificates')}
                >
                    Certificates ({certificates.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('status')}
                >
                    Status
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'profile' && (
                    <ProfileManager profile={profile} onUpdate={fetchData} />
                )}
                {activeTab === 'projects' && (
                    <ProjectsManager projects={projects} onUpdate={fetchData} />
                )}
                {activeTab === 'certificates' && (
                    <CertificatesManager certificates={certificates} onUpdate={fetchData} />
                )}
                {activeTab === 'status' && (
                    <StatusManager status={status} onUpdate={fetchData} />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
