@echo off
title OPC TNC — GO BOT CAI DAT TU DONG CHAY NGAM
color 0C

echo =======================================================================
echo   OPC TNC GROUP — GO BOT UNINSTALL AUTO-START BACKGROUND
echo =======================================================================
echo.

set STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
set TARGET_VBS=%STARTUP_DIR%\OPC_TNC_AutoStart.vbs

if exist "%TARGET_VBS%" (
    del /F /Q "%TARGET_VBS%"
    echo [THANH CONG] Da xoa OPC-TNC khoi thu muc Windows Startup!
) else (
    echo [THONG BAO] OPC-TNC chua duoc cai dat auto-start trong thu muc Startup.
)

echo.
echo Nhan phim bat ky de thoat...
pause >nul
