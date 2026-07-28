# 🚀 Render.com Deployment Guide

## Prerequisites
✅ GitHub account
✅ Render.com account (free)
✅ MongoDB Atlas connection string
✅ Your code ready

---

## Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Create a new repository on GitHub
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 2: Sign Up for Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended for easy integration)
4. Authorize Render to access your repositories

---

## Step 3: Create New Web Service

1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Click "Connect account" if needed
   - Search for "portfolio" repository
   - Click **"Connect"**

---

## Step 4: Configure the Web Service

Fill in the following settings:

### Basic Settings:
- **Name**: `portfolio` (or your preferred name)
- **Region**: Choose closest to you or your users
- **Branch**: `main` (or `master`)
- **Root Directory**: Leave blank (uses root)
- **Runtime**: `Node`

### Build Settings:
- **Build Command**: 
  ```bash
  npm install && cd client && npm install && npm run build
  ```
- **Start Command**:
  ```bash
  node server.js
  ```

### Instance Type:
- **Plan**: Select **"Free"** (perfect for portfolio)

---

## Step 5: Add Environment Variables

Scroll down to **"Environment Variables"** section:

Click **"Add Environment Variable"** and add these:

1. **Variable 1:**
   - Key: `NODE_ENV`
   - Value: `production`

2. **Variable 2:**
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
     ```
     mongodb+srv://shehan12345:shehan12345@cluster0.5qnjbe5.mongodb.net/portfolio?appName=Cluster0
     ```

3. **Variable 3 (Optional):**
   - Key: `PORT`
   - Value: `10000` (Render's default, auto-set)

---

## Step 6: Deploy!

1. Click **"Create Web Service"** button at the bottom
2. Render will now:
   - ✅ Clone your repository
   - ✅ Install dependencies
   - ✅ Build React frontend
   - ✅ Start Node.js server
   - ✅ Assign a URL

3. **Wait for deployment** (usually 5-10 minutes for first deploy)
   - You'll see logs in real-time
   - Green checkmarks indicate success

---

## Step 7: Get Your Live URL

Once deployed, you'll get a URL like:
```
https://portfolio-xxxx.onrender.com
```

**Your portfolio is now live!** 🎉

---

## Step 8: Test Your Application

Visit your URL and test:
- ✅ Homepage loads
- ✅ Projects page
- ✅ Certificates page
- ✅ Contact form
- ✅ Admin login: `https://your-url.onrender.com/admin/login`
  - Email: fernandoshehan313@gmail.com
  - Password: shehan123

---

## Step 9: Configure MongoDB Atlas (If Needed)

Make sure your MongoDB Atlas allows connections from Render:

1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"** in left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (for production, whitelist Render IPs)
5. Click **"Confirm"**

---

## Step 10: Custom Domain (Optional)

To use your own domain:

1. In Render dashboard, go to your service
2. Click **"Settings"**
3. Scroll to **"Custom Domain"**
4. Click **"Add Custom Domain"**
5. Enter your domain (e.g., `yourname.com`)
6. Follow DNS configuration instructions
7. Wait for SSL certificate (automatic & free)

---

## Automatic Deployments

Render automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Render automatically detects and deploys!
```

---

## Troubleshooting

### Issue: Build Failed

**Check logs in Render dashboard:**
- Usually due to missing dependencies
- Verify `package.json` has all dependencies

**Solution:**
```bash
# Locally test build
npm run render-build
node server.js
```

### Issue: MongoDB Connection Failed

**Possible causes:**
1. Wrong connection string
2. IP not whitelisted in MongoDB Atlas
3. Database user doesn't have permissions

**Solution:**
- Verify `MONGODB_URI` in environment variables
- Check MongoDB Atlas network access
- Test connection string locally first

### Issue: 503 Service Unavailable

**Cause:** Free tier services spin down after 15 minutes of inactivity

**Solution:** 
- First request will take 30-60 seconds (cold start)
- Subsequent requests are fast
- Upgrade to paid plan for always-on service

### Issue: Static Files Not Loading

**Cause:** Build folder not created or path wrong

**Solution:**
- Check build logs show successful React build
- Verify `client/build` folder exists after build
- Check `server.js` serves static files correctly

---

## Important Notes

### Free Tier Limitations:
- ✅ 750 hours/month (enough for one app)
- ✅ Custom domains
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ⚠️ Spins down after 15 min inactivity (cold start on first request)
- ⚠️ 512 MB RAM
- ⚠️ Shared CPU

### Upgrade Benefits:
- No spin-down (always fast)
- More resources
- Better performance
- Starting at $7/month

---

## Monitoring Your App

In Render Dashboard:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, bandwidth usage
- **Events**: Deployment history
- **Shell**: Access to your container

---

## Environment Variables

View/Edit anytime in Render dashboard:
1. Go to your service
2. Click "Environment"
3. Add/edit/delete variables
4. Service auto-restarts after changes

---

## Alternative: Deploy via Blueprint (Using render.yaml)

Your project includes `render.yaml`:

1. In Render dashboard, click **"New +"**
2. Select **"Blueprint"**
3. Connect your repository
4. Render reads `render.yaml` and configures automatically
5. Just add `MONGODB_URI` environment variable
6. Click "Apply"

This is faster as configuration is pre-defined!

---

## Support

- **Render Docs**: https://render.com/docs
- **Community Forum**: https://community.render.com
- **Your Email**: fernandoshehan313@gmail.com

---

## Summary

✅ **Files created for deployment:**
- `render.yaml` - Render configuration
- `RENDER_DEPLOYMENT.md` - This guide
- Updated `package.json` with build scripts
- `server.js` already configured for production

✅ **Your deployment checklist:**
1. ✅ Push code to GitHub
2. ✅ Sign up for Render.com
3. ✅ Create Web Service
4. ✅ Configure build/start commands
5. ✅ Add environment variables
6. ✅ Deploy!

---

**Ready to deploy!** 🚀

**Quick Start Command Line:**
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
# Then deploy via Render dashboard
```

**Your portfolio will be live at:**
`https://portfolio-[random].onrender.com`

Good luck! 🎉
