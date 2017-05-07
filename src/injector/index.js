const { bdPath } = require('./config');
const { BetterDiscord } = require(bdPath);

function BdInjector() {

    let electron = require('electron');
    let { app } = electron;
    let path = require('path');

    let execPath = process.execPath;

    let discordVersion = path.basename(execPath, '.exe');

    app.setAppPath(app.getAppPath().replace(/app(?![\s\S]*app)/, 'app.asar'));

    process.execPath = `${discordVersion} with BetterDiscord`; //Append BetterDiscord to trayicon

    let discord = require('../app.asar');

    let defer = setInterval(() => {
        let mainWindow = electron.BrowserWindow.getAllWindows()[0];
        let url = mainWindow.webContents.getURL();
        if (url.includes("discordapp.com")) {
            clearInterval(defer);
            mainWindow.setTitle(`${discordVersion} with BetterDiscord`); //Append BetterDiscord to window title
            process.execPath = execPath; //Reset exec path
            //Load BD
            let _betterDiscord = new BetterDiscord({ mainWindow: mainWindow });
        }
    }, 100);
}

BdInjector();