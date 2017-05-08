/**
 * BetterDiscord Injector Middleware
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
"use strict";

const { bdPath } = require('./config');
const { BetterDiscord } = require(bdPath);

function BdInjector() {
    const { app, BrowserWindow } = require('electron');
    const path = require('path');

    const execPath = process.execPath;
    const discordExecutableName = path.basename(execPath, '.exe');

    app.setAppPath(app.getAppPath().replace(/app(?![\s\S]*app)/, 'app.asar'));

    process.execPath = `${discordExecutableName} with BetterDiscord`; // Append BetterDiscord to tray icon name

    const discord = require('../app.asar');

    const defer = setInterval(() => {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        const url = mainWindow.webContents.getURL();
        if (url.includes("discordapp.com")) {
            clearInterval(defer);
            mainWindow.setTitle(`${discordExecutableName} with BetterDiscord`); // Append BetterDiscord to window title
            process.execPath = execPath; // Reset exec path

            // Load BD
            const _betterDiscord = new BetterDiscord({ mainWindow, config });
        }
    }, 100);
}

BdInjector();