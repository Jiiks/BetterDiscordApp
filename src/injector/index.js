/**
 * BetterDiscord Injector Middleware
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const config = require('./config');
const { bdPath } = config;
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
            let _betterDiscord = new BetterDiscord({ mainWindow: mainWindow, config: config });
        }
    }, 100);
}

BdInjector();