# 🛠️ Technologies Used in This Portfolio

## **Stack Overview**
This is a full-stack MERN (MongoDB, Express, React, Node.js) application with advanced features like AI analysis, image uploads, analytics, and admin management.

---

## **Frontend Technologies**

### Core Framework
- **React** (v18.2.0)
  - Modern JavaScript library for building user interfaces
  - Component-based architecture
  - React Hooks for state management

- **React DOM** (v18.2.0)
  - Renders React components to the DOM

- **React Router DOM** (v6.30.4)
  - Client-side routing for multi-page navigation
  - Dynamic route handling
  - Navigation between: Dashboard, Projects, Certificates, Current Status, Contact

### HTTP & Data Handling
- **Axios** (v1.17.0)
  - Promise-based HTTP client
  - Handles all API requests to backend
  - Automatic request/response interceptors

### Build Tools
- **React Scripts** (v5.0.1)
  - Webpack configuration for React apps
  - Development server with hot reload
  - Production build optimization

### Testing Libraries
- **@testing-library/react** (v13.4.0)
- **@testing-library/jest-dom** (v5.17.0)
- **@testing-library/user-event** (v13.5.0)

### Performance Monitoring
- **web-vitals** (v2.1.4)
  - Measures key web performance metrics

---

## **Backend Technologies**

### Runtime & Framework
- **Node.js** (v18+)
  - JavaScript runtime environment
  - Event-driven, non-blocking I/O

- **Express.js** (v4.18.2)
  - Minimal web application framework
  - RESTful API server
  - Middleware support (CORS, JSON parsing)

### Database
- **MongoDB** (via MongoDB Atlas/Local)
  - NoSQL document database
  - Flexible schema for portfolios, projects, certificates
  - Cloud hosting via Atlas

- **Mongoose** (v7.6.3)
  - MongoDB object modeling
  - Schema validation
  - Query building and data relationships

### File Upload & Storage
- **Multer** (v2.1.1)
  - Middleware for handling file uploads
  - Image upload support (profile pictures, certificates)
  - File size validation
  - Local storage in `/uploads` directory

### API & Networking
- **CORS** (v2.8.5)
  - Cross-Origin Resource Sharing
  - Enables communication between frontend (port 3000) and backend (port 5001)

- **Axios** (v1.17.0) - Same as frontend
  - Used for internal API calls if needed

### Environment Management
- **dotenv** (v16.3.1)
  - Loads environment variables from `.env` file
  - Secure credential management
  - Database connection strings

### Development Tools
- **Nodemon** (v3.0.1)
  - Auto-restart server on file changes
  - Development efficiency

- **Concurrently** (v8.2.1)
  - Run multiple npm scripts simultaneously
  - `npm run dev` runs both backend and frontend

---

## **Database Models**

### Collections
1. **Projects**
   - Title, description, technologies, links
   - GitHub URL, deployed URL
   - Rating, difficulty level (AI-analyzed)

2. **Certificates**
   - Title, issuer, date
   - Certificate image/URL

3. **Profile**
   - Bio, skills, profile picture
   - Social links

4. **Status**
   - Current role, project focus
   - Looking for opportunities flag

5. **Admin**
   - Login credentials
   - Dashboard access

---

## **API Endpoints**

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Certificates
- `GET /api/certificates` - Fetch all certificates
- `POST /api/certificates` - Create certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### Profile
- `GET /api/profile` - Fetch profile
- `PUT /api/profile` - Update profile

### Status
- `GET /api/status` - Fetch current status
- `PUT /api/status` - Update status

### Authentication
- `POST /api/auth/login` - Admin login

### AI Analysis
- `POST /api/ai/analyze` - Analyze GitHub repository
- Returns: tech stack, rating, difficulty, description

### File Upload
- `POST /api/upload` - Upload image file
- Supports: JPEG, PNG, GIF
- Max size: 5MB

### Analytics
- `GET /api/analytics` - Calculate portfolio analytics
- Returns: skill level, career readiness, completeness, suggestions

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - View all messages (admin)
- `PUT /api/contact/:id/read` - Mark as read
- `DELETE /api/contact/:id` - Delete message

---

## **Frontend Pages & Components**

### Pages
1. **Dashboard** (`/`)
   - Hero section with profile
   - Analytics overview
   - Skills and progress tracking
   - Suggestions section

2. **Projects** (`/projects`)
   - Grid layout of all projects
   - Tech tags, descriptions, links
   - Direct GitHub/Live links

3. **Certificates** (`/certificates`)
   - Certificate cards with images
   - Issuer and date info
   - Certificate links

4. **Current Status** (`/current-status`)
   - Current role and focus
   - Detailed information
   - Activity indicators

5. **Contact** (`/contact`)
   - Contact form
   - Email and WhatsApp links
   - Response time info

6. **Admin Login** (`/admin/login`)
   - Hardcoded credentials (demo)
   - Session management

7. **Admin Dashboard** (`/admin/dashboard`)
   - CRUD operations for all content
   - Tab-based management
   - Profile image upload

### Navbar
- Sticky navigation
- Active route highlighting
- Admin link

---

## **Styling & UI**

### CSS
- **Custom CSS** (no CSS frameworks)
- **CSS Variables** for theme management
- **Responsive Design**
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1200px+

### Theme Colors
- **Primary Blue**: #133f79
- **Accent Green**: #24a513
- **Light Slate**: #F8FAFC
- **Text Dark**: #133f79
- **Text Secondary**: #64748B

### Typography
- **Font Stack**: Inter, Segoe UI, Roboto, sans-serif
- **Font Weights**: 400, 500, 600, 700

---

## **Features Implemented**

### Core Features
✅ Full CRUD operations for all content types
✅ Admin authentication & dashboard
✅ Responsive design (mobile, tablet, desktop)
✅ Image upload with validation
✅ Dynamic routing

### Advanced Features
✅ **AI GitHub Analyzer**
  - Fetches GitHub repository data
  - Analyzes README files
  - Detects technologies
  - Calculates project rating (0-10)
  - Determines difficulty level

✅ **Analytics System**
  - Skill level calculation
  - Career readiness percentage
  - Portfolio completeness score
  - Personalized suggestions
  - Auto-refresh every 5 minutes

✅ **Contact Form**
  - Form validation
  - Direct email links
  - WhatsApp integration
  - Message storage

---

## **Development Commands**

```bash
# Backend only
npm run server

# Frontend only
npm run client

# Both (from root)
npm run dev

# Production
npm start
```

---

## **Environment Variables** (`.env`)

```
MONGODB_URI=mongodb://your_connection_string
PORT=5001
```

---

## **Ports**

- **Backend**: 5001 (Changed from 5000 due to PostgreSQL conflict)
- **Frontend**: 3000
- **MongoDB**: 27017 (default)

---

## **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## **Performance Optimizations**

✅ Lazy loading for components
✅ Efficient state management
✅ Image optimization
✅ CSS optimization
✅ Axios caching
✅ Production builds with minification

---

## **Security Features**

✅ CORS enabled for frontend-backend communication
✅ Environment variables for sensitive data
✅ File upload validation
✅ Input validation on forms
✅ Admin authentication

---

## **Version Information**

| Technology | Version |
|-----------|---------|
| React | 18.2.0 |
| React Router | 6.30.4 |
| Express | 4.18.2 |
| Mongoose | 7.6.3 |
| Axios | 1.17.0 |
| Node.js | 18+ |
| MongoDB | Latest |

---

## **Project Structure**

```
portfolio/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js/css
│   │   │   ├── Projects.js/css
│   │   │   ├── Certificates.js/css
│   │   │   ├── CurrentStatus.js/css
│   │   │   ├── Contact.js/css
│   │   │   ├── AdminLogin.js/css
│   │   │   ├── AdminDashboard.js/css
│   │   │   ├── Navbar.js/css
│   │   │   └── managers/
│   │   ├── App.js/css
│   │   └── index.js
│   └── package.json
├── models/
│   ├── Profile.js
│   ├── Project.js
│   ├── Certificate.js
│   ├── Status.js
│   └── Admin.js
├── routes/
│   ├── profile.js
│   ├── projects.js
│   ├── certificates.js
│   ├── status.js
│   ├── auth.js
│   ├── ai-analyzer.js
│   ├── upload.js
│   ├── analytics.js
│   └── contact.js
├── uploads/
├── server.js
├── package.json
└── .env
```

---

**Last Updated**: July 2026
**Status**: Production Ready ✅
