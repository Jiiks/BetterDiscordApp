# BetterDiscord v2

Version 2.x of BetterDiscord - Currently unstable

## Installation

1. Extract Discord app.asar (you can use the regular BetterDiscord installer if you don't know how)
2. Download the Developer Preview 1 - [dp1.7z](https://github.com/Jiiks/BetterDiscordApp/blob/v2/dp1.7z?raw=true)
3. Extract Developer Preview 1 anywhere on your computer and take note of the path
4. Edit the `index.js` file in Discord directory `%localappdata%/Discord/app-0.0.xxx/resources/app` with the following:
    add:
        `const { BetterDiscord } = require("PATH-TO-DP1/core/main");` after `use strict`
    
    add:
        `let _betterDiscord = new BetterDiscord({ mainWindow: mainWindow });` after `mainWindow = new BrowserWindow(mainWindowOptions);`
5. Restart Discord
6. Edit the `config.json` file in `PATH-TOD-P1/core` so that your `basePath` and `dataPath` point to the correct directories

* only the plugin loader and customcss editor are available in this test build.
