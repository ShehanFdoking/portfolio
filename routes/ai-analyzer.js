const express = require('express');
const router = express.Router();
const axios = require('axios');

// Analyze GitHub repository
router.post('/analyze-repo', async (req, res) => {
    try {
        const { repoUrl } = req.body;

        console.log('Analyzing repository:', repoUrl);

        // Parse GitHub URL - handle various formats
        let cleanUrl = repoUrl.trim();
        cleanUrl = cleanUrl.replace('https://github.com/', '');
        cleanUrl = cleanUrl.replace('http://github.com/', '');
        cleanUrl = cleanUrl.replace('.git', '');
        cleanUrl = cleanUrl.replace(/\/$/, ''); // Remove trailing slash

        const urlParts = cleanUrl.split('/');
        const owner = urlParts[0];
        const repo = urlParts[1];

        console.log('Owner:', owner, 'Repo:', repo);

        if (!owner || !repo) {
            return res.status(400).json({
                success: false,
                message: 'Invalid GitHub URL format. Use: https://github.com/username/repository'
            });
        }

        // Fetch repository data from GitHub API
        const [repoData, readmeData, languagesData] = await Promise.all([
            axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-App'
                }
            }),
            axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                    'User-Agent': 'Portfolio-App'
                }
            }).catch(() => ({ data: '' })),
            axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-App'
                }
            })
        ]);

        const repository = repoData.data;
        const readme = readmeData.data || '';
        const languages = languagesData.data;

        console.log('Repository fetched successfully:', repository.name);

        // AI-powered analysis
        const analysis = await analyzeRepository(repository, readme, languages);

        res.json({
            success: true,
            data: analysis
        });
    } catch (err) {
        console.error('Error analyzing repository:', err.message);
        console.error('Error details:', err.response?.data);

        let errorMessage = 'Failed to analyze repository. ';

        if (err.response?.status === 404) {
            errorMessage += 'Repository not found. Please check the URL.';
        } else if (err.response?.status === 403) {
            errorMessage += 'GitHub API rate limit exceeded. Try again later.';
        } else if (err.response?.status === 401) {
            errorMessage += 'Authentication failed.';
        } else {
            errorMessage += 'Please check the URL and try again.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// AI Analysis function
async function analyzeRepository(repo, readme, languages) {
    // Extract technologies from languages
    const technologies = Object.keys(languages).slice(0, 8);

    // Detect additional technologies from README
    const detectedTech = detectTechnologies(readme);
    const allTech = [...new Set([...technologies, ...detectedTech])];

    // Generate description
    const description = generateDescription(repo, readme);

    // Extract features from README
    const features = extractFeatures(readme);

    // Calculate project rating
    const rating = calculateRating(repo, readme, languages);

    // Determine difficulty
    const difficulty = determineDifficulty(allTech, repo);

    // Generate skills demonstrated
    const skills = generateSkills(allTech, repo);

    return {
        title: repo.name.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description,
        technologies: allTech,
        features,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        lastUpdated: repo.updated_at,
        mainLanguage: repo.language,
        rating,
        difficulty,
        skills
    };
}

function detectTechnologies(readme) {
    const tech = [];
    const readmeLower = readme.toLowerCase();

    const techMap = {
        'react': 'React',
        'vue': 'Vue.js',
        'angular': 'Angular',
        'node': 'Node.js',
        'express': 'Express.js',
        'mongodb': 'MongoDB',
        'postgresql': 'PostgreSQL',
        'mysql': 'MySQL',
        'tailwind': 'Tailwind CSS',
        'bootstrap': 'Bootstrap',
        'docker': 'Docker',
        'kubernetes': 'Kubernetes',
        'aws': 'AWS',
        'azure': 'Azure',
        'jwt': 'JWT',
        'redux': 'Redux',
        'graphql': 'GraphQL',
        'firebase': 'Firebase',
        'nextjs': 'Next.js',
        'typescript': 'TypeScript'
    };

    for (const [key, value] of Object.entries(techMap)) {
        if (readmeLower.includes(key)) {
            tech.push(value);
        }
    }

    return tech;
}

function generateDescription(repo, readme) {
    if (repo.description) {
        return repo.description;
    }

    // Extract first meaningful paragraph from README
    const lines = readme.split('\n').filter(line =>
        line.trim().length > 50 && !line.startsWith('#') && !line.startsWith('!')
    );

    if (lines.length > 0) {
        return lines[0].substring(0, 200);
    }

    return `A ${repo.language || 'software'} project built to demonstrate modern development practices.`;
}

function extractFeatures(readme) {
    const features = [];
    const lines = readme.split('\n');

    let inFeatureSection = false;
    for (const line of lines) {
        if (line.toLowerCase().includes('feature') ||
            line.toLowerCase().includes('## features')) {
            inFeatureSection = true;
            continue;
        }

        if (inFeatureSection && line.trim().startsWith('-')) {
            features.push(line.replace(/^-\s*/, '').trim());
            if (features.length >= 6) break;
        }

        if (inFeatureSection && line.startsWith('##') && !line.toLowerCase().includes('feature')) {
            break;
        }
    }

    if (features.length === 0) {
        features.push('Modern and responsive design');
        features.push('RESTful API architecture');
        features.push('Database integration');
        features.push('User authentication');
    }

    return features;
}

function calculateRating(repo, readme, languages) {
    let score = 0;

    // Stars contribution (0-2 points)
    if (repo.stargazers_count > 50) score += 2;
    else if (repo.stargazers_count > 10) score += 1.5;
    else if (repo.stargazers_count > 0) score += 1;

    // README quality (0-2 points)
    if (readme.length > 2000) score += 2;
    else if (readme.length > 500) score += 1.5;
    else if (readme.length > 0) score += 1;

    // Number of languages (0-2 points)
    const langCount = Object.keys(languages).length;
    if (langCount >= 5) score += 2;
    else if (langCount >= 3) score += 1.5;
    else score += 1;

    // Recent activity (0-2 points)
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 2;
    else if (daysSinceUpdate < 90) score += 1.5;
    else if (daysSinceUpdate < 180) score += 1;
    else score += 0.5;

    // Has description (0-1 point)
    if (repo.description) score += 1;

    // Has homepage/demo (0-1 point)
    if (repo.homepage) score += 1;

    return Math.min(10, Math.round(score * 10) / 10);
}

function determineDifficulty(technologies, repo) {
    const techCount = technologies.length;
    const hasBackend = technologies.some(t =>
        ['Node.js', 'Express.js', 'Python', 'Django', 'Flask'].includes(t)
    );
    const hasDatabase = technologies.some(t =>
        ['MongoDB', 'PostgreSQL', 'MySQL'].includes(t)
    );
    const hasDevOps = technologies.some(t =>
        ['Docker', 'Kubernetes', 'AWS', 'Azure'].includes(t)
    );

    if (techCount >= 6 && hasBackend && hasDatabase && hasDevOps) {
        return 'Advanced';
    } else if (techCount >= 4 && (hasBackend || hasDatabase)) {
        return 'Intermediate';
    } else {
        return 'Beginner';
    }
}

function generateSkills(technologies, repo) {
    const skills = [];

    if (technologies.some(t => ['React', 'Vue.js', 'Angular'].includes(t))) {
        skills.push('Frontend Development');
    }

    if (technologies.some(t => ['Node.js', 'Express.js'].includes(t))) {
        skills.push('Backend Development');
        skills.push('RESTful API Design');
    }

    if (technologies.some(t => ['MongoDB', 'PostgreSQL', 'MySQL'].includes(t))) {
        skills.push('Database Management');
    }

    if (technologies.includes('JWT')) {
        skills.push('Authentication & Authorization');
    }

    if (technologies.some(t => ['Docker', 'Kubernetes'].includes(t))) {
        skills.push('Containerization');
    }

    if (technologies.some(t => ['AWS', 'Azure'].includes(t))) {
        skills.push('Cloud Deployment');
    }

    skills.push('Version Control (Git)');
    skills.push('Problem Solving');

    return skills;
}

module.exports = router;
