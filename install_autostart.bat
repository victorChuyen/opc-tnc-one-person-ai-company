@echo off
title OPC TNC — CAI DAT TU DONG CHAY NGAM KHI KHOI DONG PC
color 0A

echo =======================================================================
echo   OPC TNC GROUP — CAI DAT AUTO-START BACKGROUND (GIOING OLLAMA/OBSIDIAN)
echo   Domain: https://ai.breaths.live (Port 8085)
echo =======================================================================
echo.

set STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
set TARGET_VBS=%STARTUP_DIR%\OPC_TNC_AutoStart.vbs
set SOURCE_VBS=D:\OPC-TNC\run_opc_background.vbs

echo [1/2] Dang sao chep VBScript vao thu muc Windows Startup...
echo Target: %TARGET_VBS%

copy /Y "%SOURCE_VBS%" "%TARGET_VBS%" >nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================================
    echo   [THANH CONG] OPC-TNC DA DUOC CAI DAT TU DONG CHAY NGAM!
    echo.
    echo   - Moi khi khoi dong Windows, he thong se TU DONG CHAY NGAM:
    echo       1. Node.js Local Server (http://localhost:8085)
    echo       2. Cloudflare Tunnel Online (https://ai.breaths.live)
    echo   - Khong hien cua so CMD (chay an 100%% giong Ollama / 9router / Obsidian)
    echo =======================================================================
) else (
    echo [LOI] Khong the ghi vao thu muc Startup. Vui long chay voi quyen Admin!
)

echo.
echo [2/2] Kich hoat phien chay ngam ngay bay gio...
wscript "%TARGET_VBS%"

echo.
echo [DA HOAN THANH] Nhan phim bat ky de thoat...
pause >nul
