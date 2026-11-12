import React, { useState } from 'react';
import API_URL from '../config';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus(''), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-inner">
                <div className="contact-header">
                    <h1 className="page-title">Get In Touch</h1>
                    <p className="contact-subtitle">Have a question or want to collaborate? I'd love to hear from you!</p>
                </div>

                <div className="contact-content">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2 className="form-title">Send a Message</h2>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message here..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Send Message</button>

                            {submitStatus === 'success' && (
                                <div className="status-message success">
                                    ✓ Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="status-message error">
                                    ✗ Error sending message. Please try again or contact me directly.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info-section">
                        <h2 className="info-title">Contact Information</h2>

                        <div className="contact-cards">
                            {/* Email Card */}
                            <div className="contact-card email-card">
                                <div className="card-icon">✉️</div>
                                <h3>Email</h3>
                                <p className="contact-detail">fernandoshehan313@gmail.com</p>
                                <a href="mailto:fernandoshehan313@gmail.com" className="contact-link">
                                    Send Email
                                </a>
                            </div>

                            {/* WhatsApp Card */}
                            <div className="contact-card whatsapp-card">
                                <div className="card-icon">💬</div>
                                <h3>WhatsApp</h3>
                                <p className="contact-detail">+94 776367985</p>
                                <a href="https://wa.me/94776367985" target="_blank" rel="noopener noreferrer" className="contact-link">
                                    Message on WhatsApp
                                </a>
                            </div>

                            {/* Response Time Card */}
                            <div className="contact-card response-card">
                                <div className="card-icon">⏱️</div>
                                <h3>Response Time</h3>
                                <p className="contact-detail">Within 24 hours</p>
                                <p className="card-note">I try to respond to all inquiries promptly</p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="additional-info">
                            <h3>What I Can Help With</h3>
                            <ul className="help-list">
                                <li>💼 Project Collaboration</li>
                                <li>🎯 Career Opportunities</li>
                                <li>💡 Technical Consultation</li>
                                <li>📝 Feedback & Suggestions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
