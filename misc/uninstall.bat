@echo off
echo We are now going to uninstall BetterDiscord, press any key to confirm.
pause >nul
del /f /q "%appdata%/BetterDiscord" 1>nul 2>nul
del /f /q "%localappdata%/Discord/app-0.0.291/resources/node_modules/BetterDiscord" 1>nul 2>nul
del /f /q "%localappdata%/Discord/app-0.0.291/resources/app" 1>nul 2>nul
echo Done.
taskkill /f /im Discord.exe 1>nul 2>nul
echo Restarting your Discord...
start %localappdata%/Discord/app-0.0.291/Discord.exe
echo Cleaning up...
start /b "" cmd /c del "%~f0"