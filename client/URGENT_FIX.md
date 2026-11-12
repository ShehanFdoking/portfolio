# 🚨 URGENT FIX - Vercel Environment Variable

## Problem:
The deployed build still has `//api/` (double slash) causing 404 errors.

The `.env.production` file exists locally but Vercel needs the environment variable set in its dashboard.

---

## ✅ FIX NOW - 3 Steps:

### Step 1: Set Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Click your **portfolio-client** project
3. Click **"Settings"** (left sidebar)
4. Click **"Environment Variables"** (left sidebar)
5. Find `REACT_APP_API_URL`
6. Click **"Edit"** (or delete and recreate)
7. Set value to: `https://portfolio-server-kupc.onrender.com`
   - ⚠️ **NO trailing slash!**
   - ⚠️ **NO slash at the end!**
   - ✅ Correct: `https://portfolio-server-kupc.onrender.com`
   - ❌ Wrong: `https://portfolio-server-kupc.onrender.com/`
8. Select all environments: Production ✅ Preview ✅ Development ✅
9. Click **"Save"**

---

### Step 2: Redeploy

After saving the environment variable:

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm

---

### Step 3: Run Migration (fixes images)

Once the new deployment is live:

Visit: **https://portfolio-server-kupc.onrender.com/api/migrate-image-urls**

This will fix the localhost image URLs in the database.

---

## 🎯 What Each Fix Does:

### Environment Variable Fix:
- Removes double slash `//api/` 
- Makes it single slash `/api/`
- Fixes 404 errors

### Migration Fix:
- Changes `http://localhost:5001/uploads/...`
- To `https://portfolio-server-kupc.onrender.com/uploads/...`
- Fixes image loading errors

---

## ✅ After Both Fixes:

1. Visit: https://portfolio-client-indol.vercel.app
2. Hard refresh: `Ctrl + Shift + R`
3. Check console:
   - ✅ No 404 errors
   - ✅ API calls succeed
   - ✅ Images load
   - ✅ No localhost errors

---

## 📝 Double-Check Environment Variable:

Make sure it's EXACTLY:
```
https://portfolio-server-kupc.onrender.com
```

NOT:
```
https://portfolio-server-kupc.onrender.com/
https://portfolio-server-kupc.onrender.com//
http://portfolio-server-kupc.onrender.com
```

---

The issue is the **Vercel environment variable** has a trailing slash or double slash.

Fix that, redeploy, run migration → Everything works! 🚀
