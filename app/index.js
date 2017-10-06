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

const 
    config = require('./config'),
    electron = require('electron'),
    path = require('path'),
    fs = require('fs');

const { app, BrowserWindow } = electron;

const { BetterDiscord } = require(path.join(config.basePath, 'core', 'src'));

class BdMiddleware {

    constructor() {
        this.hooked = false;
        this.windowCreated = this.windowCreated.bind(this);
        console.log(`BetterDiscord v${config.version} Middleware loaded`);
    }

    rewriteAppPath() {
        app.getAppPath = () => this.appPath;
    }

    get mainWindow() {
        return this.discordWindow;
    }

    get appPath() {
        return this.asarPath == null ? this.asarPath = path.join(__dirname, '..', 'app.asar') : this.asarPath;
    }

    windowCreated(e, window) {
        if(this.bdInstance) return;
        window.webContents.on('did-navigate', (e, url) => this.didNavigate(e, url, window));
    }

    didNavigate(e, url, window) {
        if(this.bdInstance || (!url.startsWith("https://") && !url.includes("discordapp.com"))) return;
        this.discordWindow = window;
        this.bdInstance = new BetterDiscord(this, config);
    }

    initListeners() {
        app.on('browser-window-created', this.windowCreated);
    }

    loadDiscord() {
        const discord = require(app.getAppPath());
    }
}

const _bdMiddleware = new BdMiddleware();
_bdMiddleware.rewriteAppPath();
_bdMiddleware.initListeners();
_bdMiddleware.loadDiscord();