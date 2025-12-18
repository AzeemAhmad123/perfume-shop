@echo off
echo ========================================
echo    Starting Gabbot Application
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/2] Starting Backend Server (Port 5000)...
start "Gabbot Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server (Port 3000)...
start "Gabbot Frontend" cmd /k "cd frontend && npm start"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo    Servers Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two windows opened for the servers.
echo Use stop.bat to stop the servers.
echo.
pause

