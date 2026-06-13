# 🚀 Quick Start Guide

## Step 1: Start MongoDB
Make sure MongoDB is running on your system.

```bash
mongod
```

## Step 2: Start Backend Server
Open terminal in project root:

```bash
npm run server
```

✅ Server running on `http://localhost:5000`

## Step 3: Start Frontend
Open another terminal:

```bash
cd client
npm start
```

✅ React app running on `http://localhost:3000`

---

## 📝 First Time Setup

### 1. Access Your Portfolio
Visit: `http://localhost:3000`

### 2. Login as Admin
Click **Admin** link in navbar or visit: `http://localhost:3000/admin/login`

**Credentials:**
- Email: `fernandoshehan313@gmail.com`
- Password: `shehan123`

### 3. Setup Your Profile
1. Go to **Profile** tab
2. Fill in your:
   - Name
   - Title (e.g., "Full Stack Developer")
   - Description
   - Profile image URL
   - Social links (Email, LinkedIn, GitHub)
3. Click **Save Profile**

### 4. Add Projects (AI-Powered!)

#### Option A: Use AI Importer (Recommended!)
1. Go to **Projects** tab
2. Click **+ Add New Project**
3. In the blue AI section, paste your GitHub URL:
   ```
   https://github.com/yourusername/your-repo
   ```
4. Click **🔍 Analyze Repo**
5. ✨ AI automatically fills everything!
6. Review and edit if needed
7. Click **Add Project**

#### Option B: Manual Entry
1. Click **+ Add New Project**
2. Scroll down past AI section
3. Fill in details manually
4. Click **Add Project**

### 5. Add Certificates
1. Go to **Certificates** tab
2. Click **+ Add New Certificate**
3. Fill in:
   - Certificate title
   - Issuer (e.g., Coursera, Udemy)
   - Issue date
   - Image URL (optional)
   - Credential URL (optional)
4. Click **Add Certificate**

### 6. Update Your Status
1. Go to **Status** tab
2. Update your availability:
   - Status: "Available for new opportunities"
   - Description: Add details
3. Click **Update Status**

---

## 🎯 Try the AI Importer!

Want to see the AI in action? Try analyzing one of these repos:

```
https://github.com/facebook/react
https://github.com/nodejs/node
https://github.com/vercel/next.js
```

Or use your own repositories!

---

## 🌐 Access Points

- **Public Portfolio:** `http://localhost:3000/`
- **Admin Login:** `http://localhost:3000/admin/login`
- **Admin Dashboard:** `http://localhost:3000/admin/dashboard`
- **API:** `http://localhost:5000/api/`

---

## 🐛 Troubleshooting

### MongoDB not connecting?
```bash
# Start MongoDB
mongod

# Or check if it's running
mongo
```

### Port already in use?
```bash
# Change ports in .env file
PORT=5001  # Backend
# Change port in client/package.json for frontend
```

### Cannot find module errors?
```bash
# Reinstall dependencies
npm install
cd client && npm install
```

---

## 💡 Pro Tips

1. **GitHub Personal Access Token:** For more API requests, add token to `.env`:
   ```
   GITHUB_TOKEN=your_github_token
   ```

2. **Image Hosting:** Use services like:
   - Imgur
   - Cloudinary
   - GitHub raw URLs

3. **Test Data:** Use the AI importer with public repos to quickly populate your portfolio!

4. **Backup:** Export your MongoDB data regularly

---

## ✨ You're All Set!

Your portfolio is now ready. Start adding your projects, certificates, and let the world see your amazing work!

**Need Help?** Check the main README.md for detailed documentation.

---

**Happy Showcasing! 🎉**
