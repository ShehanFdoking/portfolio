# 🗄️ MongoDB Setup & Connection Guide

## Current Status
✅ MongoDB connection is already configured in your project
✅ Local MongoDB instance expected at `mongodb://localhost:27017/portfolio`
✅ Server is ready to connect once MongoDB is running

## Prerequisites

### 1. Install MongoDB Community Edition

#### **Windows**
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Follow the installation wizard
4. Choose "Install MongoDB as a Service" (recommended)
5. MongoDB will start automatically

#### **Verify Installation**
```bash
mongod --version
```

## Running MongoDB Locally

### **Start MongoDB Service (Windows)**

#### Option 1: As a Service (Automatic)
MongoDB should start automatically if installed as a service.

#### Option 2: Manual Start
```bash
# Navigate to MongoDB bin directory
cd "C:\Program Files\MongoDB\Server\<version>\bin"

# Start MongoDB
mongod
```

You should see:
```
[initandlisten] Waiting for connections on port 27017
```

## Connection Configuration

### **Current Setup in .env**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/portfolio
```

- **Host**: localhost (your machine)
- **Port**: 27017 (default MongoDB port)
- **Database**: portfolio

### **Connection in server.js**
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
```

## Database Collections (Automatically Created)

When you run the backend, these collections will be created automatically:

1. **profiles** - Your portfolio profile info
2. **projects** - Your projects
3. **certificates** - Your certificates
4. **statuses** - Your current status
5. **admins** - Admin credentials
6. **contacts** - Contact form submissions (optional)

## Verification

### Check Connection Status

#### Method 1: Check Server Logs
```bash
npm run server
```

Look for:
```
✅ MongoDB connected
✅ Server running on port 5001
```

#### Method 2: Test API
```bash
curl http://localhost:5001/api/test
# Should return: { "message": "API is working!" }
```

#### Method 3: MongoDB CLI
```bash
# Open MongoDB shell
mongosh

# Switch to portfolio database
use portfolio

# View collections
show collections

# View documents in a collection
db.profiles.find()
```

## Alternative: MongoDB Atlas (Cloud)

If you prefer cloud-hosted MongoDB:

### 1. Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free
- Create a project

### 2. Create Cluster
- Click "Create Deployment"
- Choose "Free" tier
- Select region close to you
- Create cluster

### 3. Get Connection String
- Click "Connect"
- Choose "Drivers"
- Copy the connection string
- Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Create Database User
- Set username and password
- Add IP address to whitelist (or use 0.0.0.0/0 for all)

## Running the Full Application

### Terminal 1: Start MongoDB
```bash
mongod
# Keeps running - shows "Waiting for connections on port 27017"
```

### Terminal 2: Start Backend
```bash
cd d:\portfolio
npm run server
# Shows: ✅ MongoDB connected, ✅ Server running on port 5001
```

### Terminal 3: Start Frontend
```bash
cd d:\portfolio\client
npm start
# Opens http://localhost:3000
```

### Or: Run Both Together
```bash
cd d:\portfolio
npm run dev
# Runs server and client concurrently
```

## Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution 1**: Ensure MongoDB is running
```bash
# Check if mongod process is running
tasklist | findstr mongod

# If not, start it:
mongod
```

**Solution 2**: Check connection string in `.env`
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**Solution 3**: Verify port 27017 is not blocked
```bash
netstat -ano | findstr 27017
```

### Issue: "Address already in use"
**Solution**: MongoDB already running. Check if service is active.
```bash
# View running services
Get-Service | where {$_.Name -match "MongoDB"}
```

### Issue: "Cannot connect to database from remote"
**Solution**: If using MongoDB Atlas, ensure:
- Connection string includes credentials
- IP address is whitelisted
- Network access is enabled

### Issue: "ECONNREFUSED 127.0.0.1:27017"
**Solution**: MongoDB is not running. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Or manually run mongod
mongod
```

## Database Management

### Access MongoDB Shell
```bash
mongosh
```

### View All Databases
```
show dbs
```

### Switch to Portfolio Database
```
use portfolio
```

### View All Collections
```
show collections
```

### View Documents
```javascript
// All documents in profiles
db.profiles.find()

// With formatting
db.profiles.find().pretty()

// Specific document
db.profiles.findOne()

// Count documents
db.profiles.countDocuments()
```

### Insert Test Data
```javascript
db.profiles.insertOne({
  bio: "Full Stack Developer",
  skills: ["React", "Node.js", "MongoDB"],
  profilePictureUrl: "",
  socialLinks: {}
})
```

### Delete Database
```javascript
// Switch to portfolio database
use portfolio

// Drop database
db.dropDatabase()
```

## MongoDB Models Used

### Profile Model
```javascript
{
  bio: String,
  skills: [String],
  profilePictureUrl: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  }
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  technologies: [String],
  githubUrl: String,
  deployedUrl: String,
  rating: Number,
  difficulty: String
}
```

### Certificate Model
```javascript
{
  title: String,
  issuer: String,
  date: Date,
  certificateImageUrl: String
}
```

### Status Model
```javascript
{
  currentRole: String,
  projectFocus: String,
  lookingForOpportunities: Boolean,
  availableForCollaboration: Boolean
}
```

### Admin Model
```javascript
{
  email: String,
  password: String,
  lastLogin: Date
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: Date,
  read: Boolean
}
```

## Performance Tips

1. **Create Indexes** for frequently queried fields
2. **Use Pagination** when fetching large datasets
3. **Store Images** in object storage (S3, Cloudinary) - save only URLs in DB
4. **Regular Backups** - especially for production

## Backup & Restore

### Backup Database
```bash
mongodump --db portfolio --out C:\backup\
```

### Restore Database
```bash
mongorestore --db portfolio C:\backup\portfolio\
```

## Next Steps

1. ✅ Install MongoDB if not already done
2. ✅ Start MongoDB service (mongod)
3. ✅ Run backend: `npm run server`
4. ✅ Run frontend: `npm start`
5. ✅ Add your portfolio data through the admin dashboard
6. ✅ Access at http://localhost:3000

## Useful Links

- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Shell: https://docs.mongodb.com/mongodb-shell/
- Mongoose Documentation: https://mongoosejs.com/
- MongoDB Commands: https://docs.mongodb.com/manual/reference/method/

## Quick Start Commands

```bash
# 1. Install MongoDB (first time only)
# Download from https://www.mongodb.com/try/download/community

# 2. Start MongoDB
mongod

# 3. Install dependencies (first time only)
npm install
cd client && npm install && cd ..

# 4. Start backend
npm run server

# 5. Start frontend (new terminal)
cd client && npm start

# 6. Run both together
npm run dev
```

---

**Status**: ✅ Ready to connect
**Current Connection**: `mongodb://localhost:27017/portfolio`
**Last Updated**: July 2026
