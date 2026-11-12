# ✅ All URLs Updated to Backend

## Changes Made:

### 1. Created `src/config.js`
```javascript
const API_URL = 'https://portfolio-server-kupc.onrender.com';
export default API_URL;
```

### 2. Updated ALL Components:
✅ Dashboard.js
✅ Projects.js
✅ Certificates.js
✅ CurrentStatus.js
✅ Contact.js
✅ AdminLogin.js
✅ AdminDashboard.js
✅ ProfileManager.js
✅ ProjectsManager.js
✅ CertificatesManager.js
✅ StatusManager.js

### 3. Updated `.env.production`
```
REACT_APP_API_URL=https://portfolio-server-kupc.onrender.com
```

---

## Next Steps:

### Rebuild and Redeploy Frontend:

```bash
cd d:\client
npm run build
git add .
git commit -m "Update all API URLs to production backend"
git push origin main
```

Then redeploy on Vercel (it should auto-deploy if connected to GitHub).

---

## Testing:

After redeployment, test these URLs:

1. **Frontend**: https://your-frontend.vercel.app
2. **API Connection**: Check browser console - no more localhost errors
3. **Backend**: https://portfolio-server-kupc.onrender.com/api/test

All API calls now go to:
`https://portfolio-server-kupc.onrender.com`

---

## Image URLs Fixed:

Images now load from:
`https://portfolio-server-kupc.onrender.com/uploads/image-xxx.jpeg`

No more mixed content warnings! ✅
