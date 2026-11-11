# 🚀 Run Migration to Fix Image URLs

## Your backend has been updated with a migration endpoint!

---

## Step 1: Wait for Render to Deploy (2-3 minutes)

Check: https://dashboard.render.com
Wait for the backend to finish deploying the new code.

---

## Step 2: Run the Migration

Simply visit this URL in your browser:

**https://portfolio-server-kupc.onrender.com/api/migrate-image-urls**

You should see:
```json
{
  "success": true,
  "message": "Image URLs migrated successfully",
  "updatedCount": 1
}
```

---

## Step 3: Refresh Your Frontend

Go to: **https://portfolio-client-indol.vercel.app**

Press: **Ctrl + Shift + R** (hard refresh)

---

## ✅ Result:

- ❌ No more localhost image errors
- ✅ All images load from production backend
- ✅ Mixed content warnings gone!

---

## That's it! 🎉

The migration endpoint automatically finds all database records with `localhost:5001` URLs and updates them to `https://portfolio-server-kupc.onrender.com`.

You only need to run it once!
