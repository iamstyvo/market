@echo off
echo Starting Inzozi Shop servers...

echo Starting frontend server...
start "Frontend Server" cmd /k "serve -p 8000"

echo Starting payment backend server...
start "Payment Server" cmd /k "cd server && node server.js"

echo.
echo Servers started:
echo Frontend: http://localhost:8000 (or next available port)
echo Payment API: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul