#!/bin/bash
# Complete Deployment Setup Script
# Run this once: ./deploy-setup.sh YourGitHubUsername

if [ -z "$1" ]; then
  echo "❌ Usage: ./deploy-setup.sh YOUR_GITHUB_USERNAME"
  echo "   Example: ./deploy-setup.sh john-doe"
  exit 1
fi

GITHUB_USER=$1
REPO_NAME="oral-microbiome-website"
GITHUB_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "🚀 Starting deployment setup..."
echo "   GitHub: ${GITHUB_URL}"
echo ""

# Step 1: Ensure git is ready
echo "📦 Step 1: Preparing git repository..."
git branch -M main 2>/dev/null || true

# Step 2: Add remote
echo "🔗 Step 2: Connecting to GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_URL"

# Step 3: Push to GitHub
echo "📤 Step 3: Pushing to GitHub (this may ask for auth)..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCCESS! Code is now on GitHub."
  echo ""
  echo "📋 NEXT STEPS:"
  echo ""
  echo "1️⃣  BACKEND (Railway):"
  echo "   • Go to https://railway.app"
  echo "   • New Project → Deploy from GitHub"
  echo "   • Select: ${GITHUB_USER}/${REPO_NAME}"
  echo "   • Root Directory: server/"
  echo "   • Add Variables:"
  echo "     - PORT = 5000"
  echo "     - MONGODB_URI = mongodb://ovenkatesh265_db_user:YEfqPQfI604yRDLr@ac-wglu5kz-shard-00-00.vdif0ri.mongodb.net:27017,ac-wglu5kz-shard-00-01.vdif0ri.mongodb.net:27017,ac-wglu5kz-shard-00-02.vdif0ri.mongodb.net:27017/?ssl=true&replicaSet=atlas-gvnq0z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  echo "   • Wait for green checkmark"
  echo "   • Copy your Railway URL (e.g., https://xxxxx.up.railway.app)"
  echo ""
  echo "2️⃣  FRONTEND (Vercel):"
  echo "   • Go to https://vercel.com"
  echo "   • Import Project → Select your GitHub repo"
  echo "   • Framework: Vite (auto-detected)"
  echo "   • Add Environment Variable:"
  echo "     - VITE_API_URL = (paste your Railway URL from step 1)"
  echo "   • Deploy"
  echo "   • Share the Vercel URL with others!"
  echo ""
else
  echo "❌ Failed to push to GitHub. Check:"
  echo "   • GitHub account is set up"
  echo "   • Repository exists: https://github.com/${GITHUB_USER}/${REPO_NAME}"
  echo "   • You have push access"
fi
