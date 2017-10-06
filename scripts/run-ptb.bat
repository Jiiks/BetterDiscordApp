@echo off
taskkill /f /im discordptb.exe
for /f %%1 in ('dir "%localappdata%\DiscordPTB\app-*" /b /a:d') do set dir=%%1
start "" "%localappdata%\DiscordPTB\%dir%\DiscordPTB.exe"