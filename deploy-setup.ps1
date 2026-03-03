#!/usr/bin/env powershell
# Complete Deployment Setup Script for Windows
# Usage: .\deploy-setup.ps1 -GitHubUsername "your-username"

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

$RepoName = "oral-microbiome-website"
$GitHubUrl = "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "🚀 Starting deployment setup..." -ForegroundColor Green
Write-Host "   GitHub: $GitHubUrl" -ForegroundColor Cyan
Write-Host ""

# Ensure we are in project directory
$projectRoot = "c:\Users\venkatesh o\Downloads\oral-microbiome-toothpaste-website-1\local-project"
if ((Get-Location).Path -ne $projectRoot) {
    Set-Location $projectRoot
}

# Step 1: Ensure git is ready
Write-Host "📦 Step 1: Preparing git repository..." -ForegroundColor Yellow
git branch -M main 2>$null

# Step 2: Add remote
Write-Host "🔗 Step 2: Connecting to GitHub..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $GitHubUrl

# Step 3: Push to GitHub
Write-Host "📤 Step 3: Pushing to GitHub (you may need to authenticate)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS! Code is now on GitHub." -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Green
    Write-Host ""
    Write-Host "1️⃣  BACKEND (Railway):" -ForegroundColor Cyan
    Write-Host "   • Go to https://railway.app"
    Write-Host "   • New Project → Deploy from GitHub"
    Write-Host "   • Select: $GitHubUsername/$RepoName"
    Write-Host "   • Root Directory: server/"
    Write-Host "   • Add these Environment Variables:"
    Write-Host "     - PORT = 5000"
    Write-Host "     - MONGODB_URI = mongodb://ovenkatesh265_db_user:YEfqPQfI604yRDLr@ac-wglu5kz-shard-00-00.vdif0ri.mongodb.net:27017,ac-wglu5kz-shard-00-01.vdif0ri.mongodb.net:27017,ac-wglu5kz-shard-00-02.vdif0ri.mongodb.net:27017/?ssl=true&replicaSet=atlas-gvnq0z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
    Write-Host "   • Wait for green checkmark ✓"
    Write-Host "   • Copy your Railway URL (format: https://xxxxx.up.railway.app)"
    Write-Host ""
    Write-Host "2️⃣  FRONTEND (Vercel):" -ForegroundColor Cyan
    Write-Host "   • Go to https://vercel.com"
    Write-Host "   • Import Project → Select your GitHub repo"
    Write-Host "   • Framework Preset: Vite (auto-detected)"
    Write-Host "   • Add ONE Environment Variable:"
    Write-Host "     - Name: VITE_API_URL"
    Write-Host "     - Value: (paste your Railway URL from step 1)"
    Write-Host "   • Click Deploy"
    Write-Host "   • Once live, share the Vercel URL with others! 🎉"
    Write-Host ""
} else {
    Write-Host "❌ Failed to push to GitHub. Troubleshooting:" -ForegroundColor Red
    Write-Host "   1. Make sure repo exists: https://github.com/$GitHubUsername/$RepoName"
    Write-Host "   2. Verify you have push permissions"
    Write-Host "   3. If using 2FA, generate a Personal Access Token instead"
    Write-Host "   4. Try again with: git push -u origin main"
}
