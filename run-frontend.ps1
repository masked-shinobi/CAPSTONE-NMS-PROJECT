# PowerShell script to run the React frontend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Transport Frontend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend folder
Set-Location "D:\SANJAY WORKS\sem5\Networking Management Techniques\Capstone Project\Project\transport-frontend"

# Check if Node.js is available
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org (LTS version)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "Installing dependencies (first time)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install failed!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Start the application
Write-Host ""
Write-Host "Starting React application..." -ForegroundColor Green
Write-Host "Frontend will open at http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

npm start
