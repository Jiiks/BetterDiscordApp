### Manual installation steps for latest developer preview(DP2):

**Step 1**
Clone the v2 branch

**Step 2**
Run `npm install` in `BetterDiscordApp` directory

**Step 3**
Copy the files in `injector` to `discordpath/resources/app` folder. You do not need to extract app.asar

**Step 4**
Edit the `config.json` file in `discordpath/resources/app` (the injector config) to point to the correct paths

So that:
`basePath` points to where you cloned the branch to. This is where additional directories such as `plugins` are.
`dataPath` points to whatever directory you want data to be stored in.(custom css, user settings etc)

Ignore `windowsTest` and `macTest`

**Step 5**
Run `npm run build-client` to build or `npm run watch-client` in `BetterDiscordApp` directory to watch

**Step 6**
Restart Discord

You can now simply fetch the latest version whenever it's updated.

___

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