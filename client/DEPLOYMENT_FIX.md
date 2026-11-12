# 🔧 Deployment Issues & Fixes

## Problems Detected:

1. ❌ **Old localhost image URLs in database**
2. ❌ **Double slash in API calls** (`//api/`)
3. ❌ **404 errors from backend**

---

## 🛠️ Fixes Required:

### Fix 1: Clear Old Build & Rebuild

The deployed version might be using an old build with localhost URLs.

```bash
cd d:\client

# Delete old build
rmdir /s /q build

# Rebuild with production env
npm run build
```

### Fix 2: Verify Environment Variable in Vercel

Go to your Vercel dashboard:
1. Project Settings → Environment Variables
2. Add/Update: `REACT_APP_API_URL` = `https://portfolio-server-kupc.onrender.com`
3. **Important**: NO trailing slash!
4. Select: Production, Preview, Development
5. Click "Save"
6. Redeploy

### Fix 3: Update Image URLs in Database

The database has old `localhost:5001` URLs for images. You need to:

**Option A: Manual Update (Quick)**
1. Go to your backend: https://portfolio-server-kupc.onrender.com
2. Login to admin panel
3. Re-upload profile image
4. The new upload will have correct URL

**Option B: Database Update (Best)**
Update MongoDB directly:

```javascript
// In MongoDB Compass or shell
db.profiles.updateMany(
  {},
  {
    $set: {
      imageUrl: { 
        $replaceOne: { 
          find: "http://localhost:5001", 
          replacement: "https://portfolio-server-kupc.onrender.com" 
        }
      }
    }
  }
)
```

Or use this MongoDB query:
```javascript
db.profiles.find().forEach(function(doc) {
  if (doc.imageUrl && doc.imageUrl.includes("localhost:5001")) {
    db.profiles.updateOne(
      { _id: doc._id },
      { $set: { 
          imageUrl: doc.imageUrl.replace(
            "http://localhost:5001", 
            "https://portfolio-server-kupc.onrender.com"
          )
        }
      }
    );
  }
});
```

### Fix 4: Check Backend CORS

Make sure your backend allows requests from Vercel:

In `server.js`, the CORS should be:
```javascript
app.use(cors({
  origin: '*', // Or specific: 'https://your-frontend.vercel.app'
  credentials: true
}));
```

---

## 🧪 Testing Steps:

### 1. Test Backend Directly
```
https://portfolio-server-kupc.onrender.com/api/test
```
Should return: `{"message": "API is working!", "status": "success"}`

### 2. Test Backend API
```
https://portfolio-server-kupc.onrender.com/api/projects
```
Should return project data (not 404)

### 3. Test Frontend
After rebuild and redeploy:
- Open browser DevTools → Console
- Should see NO localhost errors
- API calls should go to: `https://portfolio-server-kupc.onrender.com/api/...`

---

## 📝 Deployment Checklist:

- [ ] `.env.production` has correct URL (no trailing slash)
- [ ] Delete `d:\client\build` folder
- [ ] Run `npm run build`
- [ ] Verify `build` folder created successfully
- [ ] Check Vercel environment variables
- [ ] Push to GitHub
- [ ] Vercel auto-deploys
- [ ] Test live site
- [ ] Update image URLs in database
- [ ] Test image loading

---

## 🚀 Quick Commands:

```bash
# In d:\client folder
rmdir /s /q build
npm run build
git add .
git commit -m "Fix: Update API URLs and rebuild"
git push origin main
```

Then Vercel will auto-deploy.

---

## ⚠️ Common Issues:

### Issue: Still seeing localhost
**Cause**: Old build cached
**Fix**: Hard refresh browser (Ctrl+Shift+R) or clear cache

### Issue: Double slash //api/
**Cause**: Trailing slash in env variable
**Fix**: Remove trailing slash from `REACT_APP_API_URL`

### Issue: 404 on API calls
**Cause**: Backend not running or wrong URL
**Fix**: Test backend URL directly in browser

### Issue: CORS error
**Cause**: Backend doesn't allow frontend origin
**Fix**: Update CORS in server.js to allow Vercel domain

---

## 📞 Support

Backend URL: `https://portfolio-server-kupc.onrender.com`
Frontend URL: `https://portfolio-client-kc8skn5cp-portfolio-944b.vercel.app`

Test both independently, then together!
