import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manager.css';

const StatusManager = ({ status, onUpdate }) => {
    const [formData, setFormData] = useState({
        status: '',
        description: ''
    });

    useEffect(() => {
        if (status) {
            setFormData({
                status: status.status || '',
                description: status.description || ''
            });
        }
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/status', formData);
            alert('Status updated successfully!');
            onUpdate();
        } catch (error) {
            alert('Error updating status');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="manager-container">
            <h2 className="manager-title">Current Status</h2>
            <form onSubmit={handleSubmit} className="manager-form">
                <div className="form-group">
                    <label>Status Title</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        placeholder="e.g., Available for new opportunities"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Provide details about your current status..."
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default StatusManager;
