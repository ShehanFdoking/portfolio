import React, { useState } from 'react';
import axios from 'axios';
import './Manager.css';

const ProjectsManager = ({ projects, onUpdate }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [githubUrl, setGithubUrl] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        githubUrl: '',
        liveUrl: ''
    });

    const handleAnalyzeRepo = async () => {
        if (!githubUrl) {
            alert('Please enter a GitHub repository URL');
            return;
        }

        setAnalyzing(true);
        try {
            const response = await axios.post('http://localhost:5001/api/ai/analyze-repo', {
                repoUrl: githubUrl
            });

            if (response.data.success) {
                const data = response.data.data;
                setAiResult(data);

                // Auto-fill form with AI data
                setFormData({
                    title: data.title,
                    description: data.description,
                    technologies: data.technologies.join(', '),
                    imageUrl: '',
                    githubUrl: data.githubUrl,
                    liveUrl: data.liveUrl || ''
                });

                alert('✅ Repository analyzed successfully! Review and edit the details below.');
            }
        } catch (error) {
            alert('Error analyzing repository. Please check the URL and try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
            };

            if (editingId) {
                await axios.put(`http://localhost:5001/api/projects/${editingId}`, dataToSend);
                alert('Project updated successfully!');
            } else {
                await axios.post('http://localhost:5001/api/projects', dataToSend);
                alert('Project added successfully!');
            }

            resetForm();
            onUpdate();
        } catch (error) {
            alert('Error saving project');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`http://localhost:5001/api/projects/${id}`);
                alert('Project deleted successfully!');
                onUpdate();
            } catch (error) {
                alert('Error deleting project');
            }
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            technologies: project.technologies ? project.technologies.join(', ') : '',
            imageUrl: project.imageUrl || '',
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || ''
        });
        setIsAdding(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            technologies: '',
            imageUrl: '',
            githubUrl: '',
            liveUrl: ''
        });
        setIsAdding(false);
        setEditingId(null);
        setGithubUrl('');
        setAiResult(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="manager-container">
            <h2 className="manager-title">Projects Management</h2>

            {!isAdding ? (
                <>
                    <button className="add-new-btn" onClick={() => setIsAdding(true)}>
                        + Add New Project
                    </button>

                    <div className="item-list">
                        {projects.map((project) => (
                            <div key={project._id} className="item-card">
                                <div className="item-card-header">
                                    <div>
                                        <h3>{project.title}</h3>
                                        <p style={{ color: '#666', marginTop: '0.5rem' }}>
                                            {project.description?.substring(0, 150)}...
                                        </p>
                                        {project.technologies && (
                                            <div className="tech-tags">
                                                {project.technologies.slice(0, 5).map((tech, index) => (
                                                    <span key={index} className="tech-tag">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="item-card-actions">
                                        <button className="edit-btn" onClick={() => handleEdit(project)}>
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(project._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="ai-import-section">
                        <h3>🤖 AI-Powered GitHub Importer</h3>
                        <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                            Paste a GitHub repository URL and let AI analyze it for you!
                        </p>
                        <div className="ai-import-form">
                            <input
                                type="url"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                placeholder="https://github.com/username/repository"
                            />
                            <button
                                className="ai-analyze-btn"
                                onClick={handleAnalyzeRepo}
                                disabled={analyzing}
                            >
                                {analyzing ? 'Analyzing...' : '🔍 Analyze Repo'}
                            </button>
                        </div>

                        {aiResult && (
                            <div className="ai-result">
                                <h4>✨ AI Analysis Complete!</h4>
                                <div className="ai-result-details">
                                    <div className="ai-result-item">
                                        <strong>Stars:</strong> {aiResult.stars}
                                    </div>
                                    <div className="ai-result-item">
                                        <strong>Forks:</strong> {aiResult.forks}
                                    </div>
                                    <div className="ai-result-item">
                                        <strong>Rating:</strong> {aiResult.rating}/10
                                    </div>
                                    <div className="ai-result-item">
                                        <strong>Difficulty:</strong> {aiResult.difficulty}
                                    </div>
                                    <div className="ai-result-item">
                                        <strong>Language:</strong> {aiResult.mainLanguage}
                                    </div>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                                    Form auto-filled! Review and edit below.
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="manager-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Project Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Project Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Technologies (comma separated)</label>
                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB, Express"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>
                            <div className="form-group">
                                <label>Live Demo URL</label>
                                <input
                                    type="url"
                                    name="liveUrl"
                                    value={formData.liveUrl}
                                    onChange={handleChange}
                                    placeholder="https://demo.example.com"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="submit-btn" style={{ flex: 1 }}>
                                {editingId ? 'Update Project' : 'Add Project'}
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
                </>
            )}
        </div>
    );
};

export default ProjectsManager;
