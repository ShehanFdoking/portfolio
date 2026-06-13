import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login with:', email);
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password
            });

            console.log('Response:', response.data);

            if (response.data.success) {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminName', response.data.user.name);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h1 className="admin-login-title">Admin Login</h1>
                <p className="admin-login-subtitle">Sign in as Shehan</p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="fernandoshehan313@gmail.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <button
                    className="back-button"
                    onClick={() => navigate('/')}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
