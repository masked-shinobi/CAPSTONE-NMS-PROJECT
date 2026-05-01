# Check if required tools are installed
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Environment Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Java
Write-Host "Checking Java..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    Write-Host "Java: OK" -ForegroundColor Green
} catch {
    Write-Host "Java: NOT FOUND" -ForegroundColor Red
    Write-Host "  Download: https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Gray
}

# Check Maven
Write-Host ""
Write-Host "Checking Maven..." -ForegroundColor Yellow
try {
    $mvnVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host "Maven: OK - $mvnVersion" -ForegroundColor Green
} catch {
    Write-Host "Maven: NOT FOUND" -ForegroundColor Red
    Write-Host "  Download: https://maven.apache.org/download.html" -ForegroundColor Gray
    Write-Host "  Extract to C:\apache-maven-3.9.15" -ForegroundColor Gray
    Write-Host "  Add to PATH: C:\apache-maven-3.9.15\bin" -ForegroundColor Gray
}

# Check Node.js
Write-Host ""
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVer = node -version
    Write-Host "Node.js: OK - $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "Node.js: NOT FOUND" -ForegroundColor Red
    Write-Host "  Download: https://nodejs.org (LTS version)" -ForegroundColor Gray
}

# Check npm
Write-Host ""
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVer = npm -version
    Write-Host "npm: OK - $npmVer" -ForegroundColor Green
} catch {
    Write-Host "npm: NOT FOUND" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Check Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
