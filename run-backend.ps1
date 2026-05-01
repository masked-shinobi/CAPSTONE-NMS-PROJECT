# PowerShell script to run the Spring Boot backend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Transport API Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend folder
Set-Location "D:\SANJAY WORKS\sem5\Networking Management Techniques\Capstone Project\Project\transport-api"

# Check if Maven is available
Write-Host "Checking Maven..." -ForegroundColor Yellow
try {
    $mvnVersion = mvn -version 2>&1
    Write-Host "Maven found!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Maven not found in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Maven first:" -ForegroundColor Yellow
    Write-Host "1. Download from https://maven.apache.org/download.html" -ForegroundColor White
    Write-Host "2. Extract to C:\apache-maven-3.9.15" -ForegroundColor White
    Write-Host "3. Add C:\apache-maven-3.9.15\bin to your PATH" -ForegroundColor White
    Write-Host "4. Restart PowerShell and try again" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Run the application
Write-Host ""
Write-Host "Starting Spring Boot application..." -ForegroundColor Green
Write-Host "Backend will be available at http://localhost:8080" -ForegroundColor Yellow
Write-Host ""

mvn spring-boot:run
