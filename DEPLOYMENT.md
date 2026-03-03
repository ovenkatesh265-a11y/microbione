# Deployment Guide

## Quick Start

This project is ready to deploy. Follow these steps to make it live:

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a repository (e.g., `oral-microbiome-website`)
3. Copy the HTTPS URL

### Step 2: Push Code to GitHub

Run these commands in PowerShell from the project root:

```powershell
cd "c:\Users\venkatesh o\Downloads\oral-microbiome-toothpaste-website-1\local-project"
git add .
git commit -m "Initial deployment setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME/YOUR_REPO_NAME` with your actual GitHub usernames and repo name.

---

## Backend Deployment (Express API)

### Option A: Railway (Recommended)

1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Railway will auto-detect Node.js
5. Go to **Variables** and add:
   - `MONGODB_URI` = (your MongoDB Atlas connection string from server/.env)
   - `PORT` = `5000`
6. Deploy and note the public URL (e.g., `https://your-backend.up.railway.app`)

### Option B: Render

1. Go to https://www.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub repository
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start` (in `server/` directory, configure as root/server)
6. Add environment variables (MONGODB_URI)
7. Deploy

---

## Frontend Deployment (React App)

### Option A: Vercel (Recommended)

1. Go to https://vercel.com
2. Click **Import Project** and select your GitHub repo
3. **Framework Preset**: Vercel auto-detects Vite
4. Go to **Environment Variables**
5. Add: `VITE_API_URL` = `https://your-backend.up.railway.app` (use the backend URL from Step 1)
6. Click **Deploy**
7. Your site will be live at `https://your-project.vercel.app`

### Option B: Netlify

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Select GitHub
4. **Build command**: `npm run build`
5. **Publish directory**: `dist`
6. Add environment variable: `VITE_API_URL` = (your backend URL)
7. Deploy

---

## Test the Live Site

1. Visit your frontend URL
2. Click **Feedback** button and submit a test entry
3. Click **View Analytics** – should show the feedback you just submitted
4. Any page visitor will increment the counter

---

## Troubleshooting

**Analytics/Feedback not working?**
- Check that `VITE_API_URL` env var is set to your actual backend URL
- Verify backend is running and `MONGODB_URI` is correct
- Check browser console (F12) for CORS or fetch errors

**Backend won't start?**
- Ensure `MONGODB_URI` env var is set
- Check logs on Railway/Render dashboard for connection errors
- Verify Atlas IP whitelist includes the host's IP

**Can't push to GitHub?**
- Ensure you have a GitHub account and created a repo first
- Use HTTPS URL, not SSH (simpler on Windows)
- If `.gitignore` didn't exclude `.env`, manually remove it before pushing: `git rm --cached server/.env`

---

## That's it!

Once both frontend and backend are deployed, share the frontend URL with others. They can submit feedback and view analytics immediately.

