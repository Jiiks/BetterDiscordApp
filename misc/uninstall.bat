@echo off
echo We are now going to uninstall BetterDiscord, press any key to confirm.
pause > nul
del /f /q "%appdata%/BetterDiscord"
del /f /q "%localappdata%/Discord/app-0.0.291/resources/node_modules/BetterDiscord"
del /f /q "%localappdata%/Discord/app-0.0.291/resources/app"
echo Done.
taskkill /IM Discord.exe
echo Restarting your Discord...
start %localappdata%/Discord/app-0.0.291/Discord.exe
echo Quitting...