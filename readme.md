Developer Preview 1 Install instructions:

Extract Discord app.asar(you can use the regular BetterDiscord installer if you don't know how)

Download the developer preview 1(dp1.7z)

Extract developer preview 1 anywhere on your computer

Edit the `index.js` file in Discord directory `%localappdata%/Discord/app-0.0.xxx/resources/app` with the following:

add:
`const { BetterDiscord } = require("PATHTODP1/core/main");` after `use strict`

add:
`let _betterDiscord = new BetterDiscord({ mainWindow: mainWindow });` after `mainWindow = new BrowserWindow(mainWindowOptions);`

Restart Discord

only the plugin loader and customcss editor are available in this test build.

Edit the `config.json` file in `PATHTODP1/core` so that your `basePath` and `dataPath` point to the correct directories