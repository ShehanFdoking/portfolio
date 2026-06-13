import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Certificates.css';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/certificates');
            setCertificates(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching certificates:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading certificates...</div>;
    }

    return (
        <div className="certificates-container">
            <div className="certificates-inner">
                <h1 className="page-title">Certificates & Achievements</h1>
                <div className="certificates-grid">
                    {certificates.length === 0 ? (
                        <div className="no-data">
                            <p>No certificates to display yet.</p>
                        </div>
                    ) : (
                        certificates.map((certificate) => (
                            <div key={certificate._id} className="certificate-card">
                                {certificate.imageUrl && (
                                    <div className="certificate-image">
                                        <img src={certificate.imageUrl} alt={certificate.title} />
                                    </div>
                                )}
                                <div className="certificate-content">
                                    <h3 className="certificate-title">{certificate.title}</h3>
                                    <p className="certificate-issuer">Issued by: {certificate.issuer}</p>
                                    <p className="certificate-date">
                                        {new Date(certificate.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    {certificate.credentialUrl && (
                                        <a
                                            href={certificate.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="certificate-link"
                                        >
                                            View Credential
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Certificates;
