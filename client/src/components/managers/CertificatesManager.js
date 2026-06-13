import React, { useState } from 'react';
import axios from 'axios';
import './Manager.css';

const CertificatesManager = ({ certificates, onUpdate }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: '',
        imageUrl: '',
        credentialUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5001/api/certificates/${editingId}`, formData);
                alert('Certificate updated successfully!');
            } else {
                await axios.post('http://localhost:5001/api/certificates', formData);
                alert('Certificate added successfully!');
            }

            resetForm();
            onUpdate();
        } catch (error) {
            alert('Error saving certificate');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certificate?')) {
            try {
                await axios.delete(`http://localhost:5001/api/certificates/${id}`);
                alert('Certificate deleted successfully!');
                onUpdate();
            } catch (error) {
                alert('Error deleting certificate');
            }
        }
    };

    const handleEdit = (certificate) => {
        setEditingId(certificate._id);
        setFormData({
            title: certificate.title,
            issuer: certificate.issuer,
            date: certificate.date.split('T')[0],
            imageUrl: certificate.imageUrl || '',
            credentialUrl: certificate.credentialUrl || ''
        });
        setIsAdding(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            issuer: '',
            date: '',
            imageUrl: '',
            credentialUrl: ''
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="manager-container">
            <h2 className="manager-title">Certificates Management</h2>

            {!isAdding ? (
                <>
                    <button className="add-new-btn" onClick={() => setIsAdding(true)}>
                        + Add New Certificate
                    </button>

                    <div className="item-list">
                        {certificates.map((cert) => (
                            <div key={cert._id} className="item-card">
                                <div className="item-card-header">
                                    <div>
                                        <h3>{cert.title}</h3>
                                        <p style={{ color: '#1e90ff', marginTop: '0.5rem', fontWeight: 600 }}>
                                            {cert.issuer}
                                        </p>
                                        <p style={{ color: '#666', marginTop: '0.25rem' }}>
                                            {new Date(cert.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="item-card-actions">
                                        <button className="edit-btn" onClick={() => handleEdit(cert)}>
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(cert._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="manager-form">
                    <div className="form-group">
                        <label>Certificate Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Full Stack Web Development"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Issuer *</label>
                            <input
                                type="text"
                                name="issuer"
                                value={formData.issuer}
                                onChange={handleChange}
                                placeholder="e.g., Coursera, Udemy"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Issue Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Certificate Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/certificate.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label>Credential URL</label>
                        <input
                            type="url"
                            name="credentialUrl"
                            value={formData.credentialUrl}
                            onChange={handleChange}
                            placeholder="https://coursera.org/verify/ABC123"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="submit-btn" style={{ flex: 1 }}>
                            {editingId ? 'Update Certificate' : 'Add Certificate'}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="submit-btn"
                            style={{ flex: 1, backgroundColor: '#666' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CertificatesManager;
