# 🚀 GitHub Setup for Frontend Repository

## GitHub Username: **Shehan-Nim-Fdo**

---

## Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Fill in:
   - **Repository name**: `portfolio-client`
   - **Description**: `React frontend for portfolio application`
   - **Visibility**: Public (or Private if you prefer)
   - ⚠️ **DO NOT** check "Add a README file"
   - ⚠️ **DO NOT** add .gitignore or license (you already have them)
3. Click **"Create repository"**

---

## Step 2: Connect Local Repository to GitHub

Open terminal in `d:\client` and run these commands:

```bash
cd d:\client

# Check if git is initialized (should show .git folder)
git status

# If not initialized, initialize it
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: React frontend with production API URLs"

# Add remote (use YOUR GitHub username)
git remote add origin https://github.com/Shehan-Nim-Fdo/portfolio-client.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 3: Verify Upload

Go to: **https://github.com/Shehan-Nim-Fdo/portfolio-client**

You should see all your React code uploaded!

---

## Step 4: Connect to Vercel

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find **`Shehan-Nim-Fdo/portfolio-client`**
4. Click **"Import"**
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
6. **Environment Variables**:
   - Add: `REACT_APP_API_URL` = `https://portfolio-server-kupc.onrender.com`
7. Click **"Deploy"**

---

## ✅ Your Repositories:

### Frontend:
- **GitHub**: https://github.com/Shehan-Nim-Fdo/portfolio-client
- **Vercel**: Will be at `https://portfolio-client-xxxx.vercel.app`

### Backend:
- **GitHub**: https://github.com/ShehanFdoking/portfolio (existing)
- **Render**: https://portfolio-server-kupc.onrender.com

---

## 🔄 Auto-Deploy Setup:

Once connected to Vercel, every time you push to GitHub:

```bash
cd d:\client
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will **automatically rebuild and redeploy**! 🎉

---

## 📝 Commands Reference:

### Check git status:
```bash
git status
```

### Check remote:
```bash
git remote -v
```

### Change remote (if needed):
```bash
git remote set-url origin https://github.com/Shehan-Nim-Fdo/portfolio-client.git
```

### Push changes:
```bash
git add .
git commit -m "Update message"
git push origin main
```

---

## ⚠️ Important Notes:

1. **Username**: Use `Shehan-Nim-Fdo` for frontend repo
2. **Repository Name**: `portfolio-client`
3. **Backend stays**: At `ShehanFdoking/portfolio` (don't change)
4. **Build folder**: Already created and ready
5. **Environment Variables**: Set in Vercel dashboard

---

## 🎯 Quick Checklist:

- [ ] Create repository on GitHub: `Shehan-Nim-Fdo/portfolio-client`
- [ ] Connect local git to GitHub
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Add environment variable in Vercel
- [ ] Deploy
- [ ] Test live site

---

**Ready to deploy!** 🚀

Follow the steps above and your frontend will be live in ~5 minutes!
