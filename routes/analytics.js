const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Profile = require('../models/Profile');
const Status = require('../models/Status');

// Get comprehensive analytics
router.get('/dashboard', async (req, res) => {
    try {
        const [projects, certificates, profile, status] = await Promise.all([
            Project.find(),
            Certificate.find(),
            Profile.findOne(),
            Status.findOne().sort({ updatedAt: -1 })
        ]);

        // Calculate metrics
        const analytics = calculateAnalytics(projects, certificates, profile, status);

        res.json({
            success: true,
            data: analytics
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

function calculateAnalytics(projects, certificates, profile, status) {
    const now = new Date();

    // Extract all technologies from projects
    const allTechnologies = new Set();
    projects.forEach(project => {
        if (project.technologies) {
            project.technologies.forEach(tech => allTechnologies.add(tech));
        }
    });

    // Calculate skill categories
    const skillCategories = categorizeTechnologies(Array.from(allTechnologies));

    // Calculate activity score
    const recentProjects = projects.filter(p => {
        const daysSince = (now - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);
        return daysSince <= 180; // Last 6 months
    }).length;

    const recentCertificates = certificates.filter(c => {
        const daysSince = (now - new Date(c.date)) / (1000 * 60 * 60 * 24);
        return daysSince <= 180;
    }).length;

    const activityScore = Math.min(100, (recentProjects * 15) + (recentCertificates * 10));

    // Calculate skill level
    const skillLevel = calculateSkillLevel(projects.length, certificates.length, allTechnologies.size);

    // Determine current focus
    const currentFocus = determineCurrentFocus(projects, certificates);

    // Calculate completion percentage
    const portfolioCompleteness = calculateCompleteness(profile, projects, certificates, status);

    // Get learning path
    const learningPath = generateLearningPath(skillCategories, projects);

    // Career readiness
    const careerReadiness = calculateCareerReadiness(projects, certificates, profile);

    return {
        overview: {
            totalProjects: projects.length,
            totalCertificates: certificates.length,
            totalTechnologies: allTechnologies.size,
            activityScore,
            skillLevel,
            portfolioCompleteness
        },
        skillCategories,
        currentFocus,
        learningPath,
        careerReadiness,
        recentActivity: {
            last30Days: {
                projects: projects.filter(p => (now - new Date(p.createdAt)) / (1000 * 60 * 60 * 24) <= 30).length,
                certificates: certificates.filter(c => (now - new Date(c.date)) / (1000 * 60 * 60 * 24) <= 30).length
            },
            last90Days: {
                projects: projects.filter(p => (now - new Date(p.createdAt)) / (1000 * 60 * 60 * 24) <= 90).length,
                certificates: certificates.filter(c => (now - new Date(c.date)) / (1000 * 60 * 60 * 24) <= 90).length
            }
        },
        topTechnologies: getTopTechnologies(projects),
        suggestions: generateSuggestions(projects, certificates, skillCategories)
    };
}

function categorizeTechnologies(technologies) {
    const categories = {
        frontend: { technologies: [], count: 0, percentage: 0 },
        backend: { technologies: [], count: 0, percentage: 0 },
        database: { technologies: [], count: 0, percentage: 0 },
        devops: { technologies: [], count: 0, percentage: 0 },
        cloud: { technologies: [], count: 0, percentage: 0 },
        other: { technologies: [], count: 0, percentage: 0 }
    };

    const categoryMap = {
        frontend: ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Next.js', 'Nuxt'],
        backend: ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'PHP', 'Ruby', 'Go'],
        database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Firestore', 'SQL', 'NoSQL'],
        devops: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Git', 'GitHub Actions', 'GitLab'],
        cloud: ['AWS', 'Azure', 'GCP', 'Heroku', 'Vercel', 'Netlify', 'DigitalOcean']
    };

    technologies.forEach(tech => {
        let categorized = false;
        for (const [category, keywords] of Object.entries(categoryMap)) {
            if (keywords.some(keyword => tech.toLowerCase().includes(keyword.toLowerCase()))) {
                categories[category].technologies.push(tech);
                categories[category].count++;
                categorized = true;
                break;
            }
        }
        if (!categorized) {
            categories.other.technologies.push(tech);
            categories.other.count++;
        }
    });

    const total = technologies.length;
    Object.keys(categories).forEach(key => {
        categories[key].percentage = total > 0 ? Math.round((categories[key].count / total) * 100) : 0;
    });

    return categories;
}

function calculateSkillLevel(projectCount, certCount, techCount) {
    const score = (projectCount * 10) + (certCount * 5) + (techCount * 2);

    if (score >= 100) return { level: 'Expert', label: 'Senior Developer', percentage: 100 };
    if (score >= 70) return { level: 'Advanced', label: 'Mid-Level Developer', percentage: 85 };
    if (score >= 40) return { level: 'Intermediate', label: 'Junior Developer', percentage: 60 };
    if (score >= 20) return { level: 'Beginner', label: 'Entry Level', percentage: 35 };
    return { level: 'Learning', label: 'Student/Learner', percentage: 15 };
}

function determineCurrentFocus(projects, certificates) {
    const recentProjects = projects.slice(-3);
    const recentCerts = certificates.slice(-2);

    const recentTech = new Set();
    recentProjects.forEach(p => {
        if (p.technologies) p.technologies.forEach(t => recentTech.add(t));
    });

    const focus = Array.from(recentTech).slice(0, 5);
    const primaryFocus = focus[0] || 'General Development';

    return {
        primary: primaryFocus,
        technologies: focus,
        description: `Currently focusing on ${focus.join(', ') || 'learning new technologies'}`
    };
}

function calculateCompleteness(profile, projects, certificates, status) {
    let score = 0;
    const maxScore = 100;

    if (profile?.name) score += 10;
    if (profile?.title) score += 10;
    if (profile?.description && profile.description.length > 100) score += 15;
    if (profile?.imageUrl) score += 10;
    if (profile?.email) score += 5;
    if (profile?.linkedin) score += 5;
    if (profile?.github) score += 5;

    if (projects.length >= 1) score += 10;
    if (projects.length >= 3) score += 10;
    if (projects.length >= 5) score += 10;

    if (certificates.length >= 1) score += 5;
    if (certificates.length >= 3) score += 5;

    if (status?.status) score += 5;

    return Math.min(maxScore, score);
}

function generateLearningPath(skillCategories, projects) {
    const recommendations = [];

    if (skillCategories.frontend.count === 0) {
        recommendations.push({ area: 'Frontend Development', priority: 'High', reason: 'No frontend technologies detected' });
    }
    if (skillCategories.backend.count === 0) {
        recommendations.push({ area: 'Backend Development', priority: 'High', reason: 'No backend technologies detected' });
    }
    if (skillCategories.database.count === 0) {
        recommendations.push({ area: 'Database Management', priority: 'Medium', reason: 'No database technologies detected' });
    }
    if (skillCategories.devops.count === 0) {
        recommendations.push({ area: 'DevOps & CI/CD', priority: 'Medium', reason: 'No DevOps tools detected' });
    }
    if (skillCategories.cloud.count === 0) {
        recommendations.push({ area: 'Cloud Computing', priority: 'Low', reason: 'No cloud platforms detected' });
    }

    return recommendations.slice(0, 3);
}

function calculateCareerReadiness(projects, certificates, profile) {
    let readiness = 0;
    const checks = [];

    if (projects.length >= 3) {
        readiness += 25;
        checks.push({ item: 'Multiple Projects', status: true });
    } else {
        checks.push({ item: 'Multiple Projects (3+)', status: false });
    }

    if (certificates.length >= 2) {
        readiness += 20;
        checks.push({ item: 'Professional Certifications', status: true });
    } else {
        checks.push({ item: 'Professional Certifications (2+)', status: false });
    }

    if (profile?.github) {
        readiness += 15;
        checks.push({ item: 'GitHub Profile', status: true });
    } else {
        checks.push({ item: 'GitHub Profile', status: false });
    }

    if (profile?.linkedin) {
        readiness += 15;
        checks.push({ item: 'LinkedIn Profile', status: true });
    } else {
        checks.push({ item: 'LinkedIn Profile', status: false });
    }

    const hasFullStack = projects.some(p =>
        p.technologies &&
        p.technologies.some(t => ['React', 'Angular', 'Vue'].includes(t)) &&
        p.technologies.some(t => ['Node.js', 'Express', 'Python'].includes(t))
    );

    if (hasFullStack) {
        readiness += 25;
        checks.push({ item: 'Full-Stack Experience', status: true });
    } else {
        checks.push({ item: 'Full-Stack Experience', status: false });
    }

    return {
        percentage: readiness,
        level: readiness >= 80 ? 'Job Ready' : readiness >= 60 ? 'Almost Ready' : 'Building Skills',
        checks
    };
}

function getTopTechnologies(projects) {
    const techCount = {};

    projects.forEach(project => {
        if (project.technologies) {
            project.technologies.forEach(tech => {
                techCount[tech] = (techCount[tech] || 0) + 1;
            });
        }
    });

    return Object.entries(techCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tech, count]) => ({ technology: tech, projectCount: count }));
}

function generateSuggestions(projects, certificates, skillCategories) {
    const suggestions = [];

    if (projects.length < 5) {
        suggestions.push({
            type: 'project',
            title: 'Add More Projects',
            description: `You have ${projects.length} projects. Adding more will strengthen your portfolio.`,
            action: 'Create at least 5 projects showcasing different skills'
        });
    }

    if (certificates.length < 3) {
        suggestions.push({
            type: 'certificate',
            title: 'Earn Certifications',
            description: 'Professional certifications boost your credibility.',
            action: 'Consider AWS, Azure, or Google Cloud certifications'
        });
    }

    if (skillCategories.devops.count === 0) {
        suggestions.push({
            type: 'skill',
            title: 'Learn DevOps',
            description: 'DevOps skills are highly valued in the industry.',
            action: 'Learn Docker, Kubernetes, and CI/CD pipelines'
        });
    }

    return suggestions;
}

module.exports = router;
