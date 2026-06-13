import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <div className="projects-container">
            <div className="projects-inner">
                <h1 className="page-title">My Projects</h1>
                <div className="projects-grid">
                    {projects.length === 0 ? (
                        <div className="no-data">
                            <p>No projects to display yet.</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="project-card">
                                {project.imageUrl && (
                                    <div className="project-image">
                                        <img src={project.imageUrl} alt={project.title} />
                                    </div>
                                )}
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="project-technologies">
                                            {project.technologies.map((tech, index) => (
                                                <span key={index} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="project-links">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                GitHub
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
