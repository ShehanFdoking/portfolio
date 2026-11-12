# 🚀 Deploy Frontend from Subdirectory (Same Repo)

## Using: **ShehanFdoking/portfolio** repository

Your setup:
- ✅ Backend: Root directory (`/`)
- ✅ Frontend: `client/` subdirectory
- ✅ One GitHub repository for both

---

## Step 1: Push Your Changes

```bash
cd d:\portfolio

# Add all changes (both backend and frontend)
git add .

# Commit
git commit -m "Update frontend API URLs to production backend"

# Push to GitHub
git push origin main
```

---

## Step 2: Deploy Frontend to Vercel

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find: **`ShehanFdoking/portfolio`**
4. Click **"Import"**

---

## Step 3: Configure for Subdirectory

⚠️ **IMPORTANT**: Configure these settings:

### Framework Preset:
- Select: **Create React App**

### Root Directory:
- Click **"Edit"** next to Root Directory
- Select: **`client`** folder
- ✅ This tells Vercel to build from the `client/` subdirectory

### Build Settings:
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Environment Variables:
Click **"Environment Variables"** and add:
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://portfolio-server-kupc.onrender.com`
- **Environments**: Check all (Production, Preview, Development)

---

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Get your live URL: `https://portfolio-xxxx.vercel.app`

---

## ✅ Your Setup:

### GitHub Repository:
- **URL**: https://github.com/ShehanFdoking/portfolio
- **Backend**: Root directory → Deployed on Render
- **Frontend**: `client/` subdirectory → Deployed on Vercel

### Deployed URLs:
- **Backend (Render)**: https://portfolio-server-kupc.onrender.com
- **Frontend (Vercel)**: https://portfolio-xxxx.vercel.app (after deployment)

---

## 🔄 Future Updates:

When you make changes:

```bash
cd d:\portfolio

# Make changes to frontend files in client/ folder
# or backend files in root

git add .
git commit -m "Your update message"
git push origin main
```

- ✅ Render auto-deploys backend (from root)
- ✅ Vercel auto-deploys frontend (from client/ subdirectory)

---

## 📝 Key Points:

1. ✅ **One repository**: `ShehanFdoking/portfolio`
2. ✅ **Root Directory in Vercel**: Set to `client`
3. ✅ **Environment Variable**: `REACT_APP_API_URL`
4. ✅ **Both auto-deploy**: Push once, both update

---

## 🎯 Checklist:

- [ ] Push changes to GitHub
- [ ] Import `ShehanFdoking/portfolio` in Vercel
- [ ] Set Root Directory to `client`
- [ ] Add `REACT_APP_API_URL` environment variable
- [ ] Deploy
- [ ] Test live frontend
- [ ] Verify API connection to backend

---

**This is the easiest approach!** One repo, two deployments. 🚀
