import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manager.css';

const ProfileManager = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        imageUrl: '',
        email: '',
        linkedin: '',
        github: ''
    });
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                title: profile.title || '',
                description: profile.description || '',
                imageUrl: profile.imageUrl || '',
                email: profile.email || '',
                linkedin: profile.linkedin || '',
                github: profile.github || ''
            });
            setImagePreview(profile.imageUrl || '');
        }
    }, [profile]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        const formDataObj = new FormData();
        formDataObj.append('image', file);

        try {
            const response = await axios.post('http://localhost:5001/api/upload/image', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                const imageUrl = `http://localhost:5001${response.data.imageUrl}`;
                setFormData({ ...formData, imageUrl });
                setImagePreview(imageUrl);
                alert('✅ Image uploaded successfully!');
            }
        } catch (error) {
            alert('Error uploading image: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/profile', formData);
            alert('Profile updated successfully!');
            onUpdate();
        } catch (error) {
            alert('Error updating profile');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'imageUrl') {
            setImagePreview(e.target.value);
        }
    };

    return (
        <div className="manager-container">
            <h2 className="manager-title">Profile Information</h2>
            <form onSubmit={handleSubmit} className="manager-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Title/Role</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Profile Image</label>

                    <div style={{
                        background: 'linear-gradient(135deg, #1e90ff 0%, #00ff00 100%)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 600 }}>
                            📤 Upload Image (Recommended)
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            style={{
                                padding: '0.9rem',
                                border: '2px solid #ffffff',
                                borderRadius: '6px',
                                width: '100%',
                                cursor: 'pointer',
                                backgroundColor: '#ffffff'
                            }}
                        />
                        {uploading && (
                            <p style={{ color: '#ffffff', marginTop: '0.75rem', fontWeight: 600 }}>
                                ⏳ Uploading image...
                            </p>
                        )}
                        <p style={{ color: '#ffffff', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                            Max file size: 5MB | Formats: JPG, PNG, GIF, WEBP
                        </p>
                    </div>

                    {imagePreview && (
                        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    border: '3px solid #00ff00',
                                    boxShadow: '0 4px 8px rgba(0,255,0,0.2)'
                                }}
                            />
                        </div>
                    )}

                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                        Or paste image URL:
                    </p>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileManager;
