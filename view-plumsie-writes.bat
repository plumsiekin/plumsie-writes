@echo off
cd /d "C:\Users\shala\Projects\plumsie-writes"
start "" cmd /k "npm run dev"
timeout /t 8 /nobreak >nul
start "" "http://localhost:1111"