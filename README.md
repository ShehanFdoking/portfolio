# Portfolio - MERN Stack

A full-stack portfolio website built with MongoDB, Express, React, and Node.js.

## Color Scheme
- **Main Colors**: Green (#00ff00), Black (#000000), White (#ffffff)
- **Sub Colors**: Blue (#1e90ff), Orange (#ff8c00)

## Features
- Dashboard with profile and current status
- Projects showcase
- Certificates display
- Current status page
- Responsive design
- No login required for visitors

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Project Structure
```
portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Projects.js
│   │   │   ├── Certificates.js
│   │   │   ├── CurrentStatus.js
│   │   │   └── *.css
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── models/                 # MongoDB models
│   ├── Profile.js
│   ├── Project.js
│   ├── Certificate.js
│   └── Status.js
├── routes/                 # API routes
│   ├── profile.js
│   ├── projects.js
│   ├── certificates.js
│   └── status.js
├── server.js              # Express server
├── .env                   # Environment variables
└── package.json
```


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Installation

1. **Install Backend Dependencies**
```bash
cd portfolio
npm install
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Configure Environment Variables**
Edit the `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

4. **Start MongoDB**
Make sure MongoDB is running on your system:
```bash
mongod
```

### Running the Application

#### Development Mode (Both servers)
From the root directory:
```bash
npm run dev
```
This will start both the backend server (port 5000) and React frontend (port 3000) concurrently.

#### Run Backend Only
```bash
npm run server
```

#### Run Frontend Only
```bash
cd client
npm start
```

### Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Profile
- `GET /api/profile` - Get profile information
- `POST /api/profile` - Create/Update profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create new certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### Status
- `GET /api/status` - Get current status
- `POST /api/status` - Create/Update status

## Adding Data

You can add data to your portfolio using API tools like Postman or Thunder Client by sending POST requests to the endpoints above.

### Example: Add Profile
```json
POST http://localhost:5000/api/profile
Content-Type: application/json

{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "description": "Passionate developer with expertise in MERN stack...",
  "imageUrl": "https://your-image-url.com/photo.jpg",
  "email": "your.email@example.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername"
}
```

### Example: Add Project
```json
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "A full-featured online shopping platform",
  "technologies": ["React", "Node.js", "MongoDB", "Express"],
  "imageUrl": "https://your-image-url.com/project.jpg",
  "githubUrl": "https://github.com/yourusername/project",
  "liveUrl": "https://project-demo.com"
}
```

### Example: Add Certificate
```json
POST http://localhost:5000/api/certificates
Content-Type: application/json

{
  "title": "Full Stack Web Development",
  "issuer": "Coursera",
  "date": "2024-01-15",
  "imageUrl": "https://your-image-url.com/cert.jpg",
  "credentialUrl": "https://coursera.org/verify/ABC123"
}
```

### Example: Add Status
```json
POST http://localhost:5000/api/status
Content-Type: application/json

{
  "status": "Available for new opportunities",
  "description": "Currently seeking full-time positions in web development"
}
```

## Design Features
- Black navbar with white text that turns green on hover
- Green, black, and white as primary colors
- Blue and orange as accent colors
- Profile picture on the right side of dashboard
- Description on the left side
- Current status displayed below the hero section
- Fully responsive design
- Smooth hover animations and transitions

## Future Enhancements
- Admin panel for content management
- Blog section
- Contact form
- Image upload functionality
- Search and filter features
- Dark/Light theme toggle

## License
MIT
