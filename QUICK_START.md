# 🚀 Quick Start Guide

## Step 1: Install MongoDB

### Windows
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Install MongoDB as a Service"
4. Finish installation

## Step 2: Start MongoDB
```bash
mongod
# Should show: Waiting for connections on port 27017
```

## Step 3: Install Dependencies (First Time Only)
```bash
cd d:\portfolio
npm install
cd client
npm install
cd ..
```

## Step 4: Run Both Backend & Frontend
```bash
cd d:\portfolio
npm run dev
```

Or separately:

**Terminal 1 - Backend:**
```bash
cd d:\portfolio
npm run server
# Should show: ✅ MongoDB connected, ✅ Server running on port 5001
```

**Terminal 2 - Frontend:**
```bash
cd d:\portfolio\client
npm start
# Opens http://localhost:3000
```

## Step 5: Access Your Portfolio
- Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin/login
  - Email: fernandoshehan313@gmail.com
  - Password: shehan123

## Features Available
✅ Dashboard with hero section
✅ Projects page (with AI GitHub importer)
✅ Certificates page
✅ Current Status page
✅ Contact form
✅ Admin panel for CRUD operations
✅ Image upload
✅ Analytics system
✅ Cursor antigravity effect

## Troubleshooting

### MongoDB not starting?
```bash
# Check if MongoDB is installed
mongod --version

# Restart MongoDB service
net start MongoDB
```

### Backend shows connection error?
1. Ensure MongoDB is running
2. Check `.env` file has correct MONGODB_URI
3. Verify port 27017 is available

### Frontend won't start?
1. Check if port 3000 is available
2. Clear cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `npm install`

## Database Connection
- **Local**: mongodb://localhost:27017/portfolio
- **Cloud**: Get connection string from MongoDB Atlas

## Important Ports
- Backend: 5001
- Frontend: 3000
- MongoDB: 27017

## File Structure
```
portfolio/
├── client/              # React frontend
├── routes/              # API endpoints
├── models/              # MongoDB schemas
├── uploads/             # Uploaded images
├── server.js            # Backend entry point
└── package.json         # Dependencies
```

## Next Steps After Setup
1. Add your profile information
2. Add your projects
3. Add your certificates
4. Update your current status
5. Test the contact form
6. Share with others!

---

**Questions?** Check MONGODB_SETUP.md for detailed guide.
