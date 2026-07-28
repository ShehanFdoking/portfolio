# 🚀 Alternative Deployment Methods

## Issue: NPM Registry Access Blocked

If you're getting `403 Forbidden` errors from npm registry, it might be due to:
- Corporate firewall
- Network restrictions
- VPN or proxy settings
- Antivirus software

## Solution 1: Deploy via GitHub + Vercel Dashboard (RECOMMENDED)

This is the easiest method and doesn't require CLI installation:

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio app"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Go to Vercel Dashboard:**
   - Visit https://vercel.com
   - Sign up / Log in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Build Settings:**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `client/build`
   - Install Command: `npm install`

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB Atlas connection string
     - Environment: Production, Preview, Development (check all)

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Get your live URL!

---

## Solution 2: Use Render.com (Free Alternative)

Render is another excellent free hosting platform:

### Steps:

1. **Push code to GitHub** (same as above)

2. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service for Backend:**
   - Click "New +"
   - Select "Web Service"
   - Connect your repository
   - Settings:
     - Name: `portfolio-backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `node server.js`
     - Add Environment Variable:
       - Key: `MONGODB_URI`
       - Value: Your MongoDB connection string

4. **Create Static Site for Frontend:**
   - Click "New +"
   - Select "Static Site"
   - Connect same repository
   - Settings:
     - Name: `portfolio-frontend`
     - Build Command: `cd client && npm install && npm run build`
     - Publish Directory: `client/build`

5. **Update Frontend API URL:**
   - In `client/package.json`, update proxy to your backend URL
   - Or create `.env.production` in client folder:
     ```
     REACT_APP_API_URL=https://portfolio-backend.onrender.com
     ```

---

## Solution 3: Deploy via Railway (Easiest for MERN)

Railway is very MERN-friendly:

### Steps:

1. **Push code to GitHub**

2. **Go to Railway:**
   - Visit https://railway.app
   - Sign up with GitHub

3. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your portfolio repository

4. **Add MongoDB:**
   - Click "New" in your project
   - Select "Database" > "MongoDB"
   - Railway will create a MongoDB instance
   - Copy the connection string

5. **Add Environment Variables:**
   - Click on your service
   - Go to "Variables"
   - Add `MONGODB_URI` with the connection string

6. **Configure Build:**
   - Railway auto-detects Node.js
   - It will run `npm install` and `npm start` automatically

7. **Get Your URL:**
   - Click "Settings"
   - Generate domain
   - Your app is live!

---

## Solution 4: Fix NPM Registry Issue (Advanced)

If you still want to use Vercel CLI, try these fixes:

### Method A: Change NPM Registry
```bash
npm config set registry https://registry.npmjs.org/
npm config set strict-ssl false
npm install -g vercel
```

### Method B: Use Yarn Instead
```bash
npm install -g yarn
yarn global add vercel
vercel login
vercel
```

### Method C: Download Vercel CLI Directly
1. Go to https://github.com/vercel/vercel/releases
2. Download the latest release for Windows
3. Extract and add to PATH
4. Run `vercel` from command line

### Method D: Use VPN
- If on corporate network, try using mobile hotspot or VPN
- Disable antivirus temporarily
- Check firewall settings

---

## Solution 5: Use Netlify (Frontend Only)

For frontend deployment only:

1. **Build your frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Drag and Drop Deploy:**
   - Go to https://netlify.com
   - Drag `client/build` folder to deploy area
   - Instant deployment!

3. **Backend:**
   - Deploy backend separately on Render/Railway/Heroku
   - Update API URLs in frontend

---

## Recommended Setup for Your Portfolio:

**Best Option: GitHub + Vercel Dashboard**
- ✅ No CLI needed
- ✅ Free tier generous
- ✅ Auto-deploys on git push
- ✅ Easy environment variables
- ✅ Fast global CDN
- ✅ HTTPS automatic
- ✅ Custom domain support

**Steps:**
1. Push to GitHub
2. Connect to Vercel Dashboard
3. Add MongoDB Atlas URI
4. Deploy (one click)
5. Done! 🎉

---

## MongoDB Atlas Setup (Required for All Methods)

You MUST use MongoDB Atlas (cloud) instead of local MongoDB:

1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0 Sandbox)
4. Database Access:
   - Create database user
   - Username: `portfoliouser`
   - Password: Generate strong password
   - Save credentials!
5. Network Access:
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, whitelist specific IPs
6. Connect:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your actual password
   - Add `/portfolio` at the end for database name

Example connection string:
```
mongodb+srv://portfoliouser:YourPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Files Created for Deployment:

✅ `vercel.json` - Vercel configuration
✅ `.vercelignore` - Files to exclude
✅ `package.json` - Updated with build scripts
✅ `DEPLOYMENT_GUIDE.md` - Full deployment guide
✅ `DEPLOY_ALTERNATIVES.md` - This file

---

## Quick Start (GitHub + Vercel):

```bash
# 1. Initialize git (if not already)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Ready for deployment"

# 4. Create GitHub repo and push
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# 5. Go to vercel.com and import your GitHub repo
# 6. Add MONGODB_URI environment variable
# 7. Deploy!
```

---

**Need Help?**
- Email: fernandoshehan313@gmail.com
- WhatsApp: +94 776367985

Choose the method that works best for your network restrictions! 🚀
