@echo off
echo ========================================
echo    Stopping Gabbot Servers
echo ========================================
echo.

echo Stopping processes on ports 3000 and 5000...
echo.

REM Kill Node.js processes (more reliable)
echo Stopping Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

REM Also kill processes on specific ports (backup method)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process on port 3000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process on port 5000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ========================================
echo    Servers Stopped!
echo ========================================
echo.
pause

