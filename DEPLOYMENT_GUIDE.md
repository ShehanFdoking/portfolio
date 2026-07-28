# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for cloud database)
- Vercel CLI installed globally

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

If you get permission errors, try:
```bash
npx vercel
```

## Step 2: Prepare MongoDB Atlas (Cloud Database)

Since Vercel is serverless, you need a cloud MongoDB instance:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`)
5. Replace `<password>` with your actual password
6. Add your database name at the end: `/portfolio`

## Step 3: Login to Vercel

```bash
vercel login
```

Or with npx:
```bash
npx vercel login
```

Follow the prompts to authenticate.

## Step 4: Set Environment Variables

You need to add your MongoDB URI as an environment variable in Vercel:

**Option A: Via Vercel Dashboard**
1. Go to your project on Vercel dashboard
2. Go to Settings > Environment Variables
3. Add:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string

**Option B: Via CLI**
```bash
vercel env add MONGODB_URI
```
Then paste your MongoDB connection string when prompted.

## Step 5: Deploy to Vercel

From the portfolio root directory:

```bash
vercel
```

Or with npx:
```bash
npx vercel
```

### First-time deployment prompts:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No
4. **Project name?** → portfolio (or your preferred name)
5. **Directory?** → ./ (current directory)
6. **Override settings?** → No

The CLI will:
- Build your frontend
- Deploy your backend
- Give you a preview URL

## Step 6: Production Deployment

After testing the preview, deploy to production:

```bash
vercel --prod
```

Or:
```bash
npx vercel --prod
```

## Step 7: Configure Admin Credentials

Your admin login credentials are hardcoded in `routes/auth.js`:
- Email: fernandoshehan313@gmail.com
- Password: shehan123

**⚠️ IMPORTANT SECURITY NOTE:**
For production, you should:
1. Store credentials in environment variables
2. Hash passwords properly
3. Use JWT for authentication

## Deployment URLs

After deployment, you'll get:
- **Frontend**: https://your-portfolio.vercel.app
- **API**: https://your-portfolio.vercel.app/api
- **Admin**: https://your-portfolio.vercel.app/admin/login

## Troubleshooting

### Issue: MongoDB Connection Failed
- Verify your MongoDB Atlas connection string
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure the database user has proper permissions

### Issue: Build Failed
- Check that all dependencies are in package.json
- Verify client/package.json has build script
- Check build logs in Vercel dashboard

### Issue: 404 on Routes
- Verify vercel.json routes configuration
- Check that server.js is handling API routes correctly

### Issue: Environment Variables Not Working
- Redeploy after adding environment variables
- Check variable names match exactly

## Alternative: Manual Steps

If CLI doesn't work, you can deploy via Vercel Dashboard:

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in settings
5. Deploy

## File Uploads Consideration

⚠️ **Important**: Vercel's serverless functions have a **4.5MB file size limit** and are **ephemeral** (files don't persist between requests).

For file uploads in production, you should:
1. Use a cloud storage service (AWS S3, Cloudinary, etc.)
2. Update multer configuration to upload to cloud storage
3. Store only URLs in MongoDB

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Contact: fernandoshehan313@gmail.com

---

**Ready to deploy!** 🚀

Run: `npx vercel` from the portfolio directory.
