@echo off
echo ============================================
echo Veridia Hiring Platform - Quick Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if MongoDB is installed
where mongo >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB might not be installed
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
)

echo.
echo Setting up Backend...
echo.

REM Navigate to backend directory
cd backend

REM Install dependencies
echo Installing backend dependencies...
call npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/veridia-hiring
        echo JWT_SECRET=veridia-secret-key-change-in-production-%RANDOM%
        echo ADMIN_SECRET=VERIDIA_ADMIN_SECRET_2026
    ) > .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

REM Create uploads directory
echo Creating uploads directory...
if not exist uploads\resumes mkdir uploads\resumes
echo [OK] Uploads directory created

echo.
echo ============================================
echo [SUCCESS] Backend setup complete!
echo ============================================
echo.
echo Next Steps:
echo.
echo 1. MongoDB should be running automatically on Windows
echo    Check Windows Services if you have issues
echo.
echo 2. Start the backend server:
echo    cd backend
echo    npm start
echo.
echo 3. Open frontend\index.html in your browser
echo.
echo 4. Create an admin user using the provided method
echo.
echo For detailed instructions, see README.md
echo.
echo Happy Hiring!
echo.
pause
