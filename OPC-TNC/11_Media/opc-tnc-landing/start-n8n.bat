@echo off
title OPC AI System

echo ======================================
echo OPC AI System
echo ======================================

where n8n >nul 2>nul

if %errorlevel% neq 0 (
  echo Khong tim thay lenh n8n.
  echo Hay cai n8n hoac sua file start-n8n.bat.
  timeout /t 5
  exit /b 1
)

start "" /min n8n

exit /b 0