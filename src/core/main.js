/**
 * BetterDiscord Injector
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger, BDUtils } = require('./utils');
const { BDEmoteModule } = require('./modules/modules');
const CssEditor = require('./modules/csseditor');
const IpcStruct = require('./modules/ipcstruct');
const _bd_fs = require('fs');
let _bd_config = require('./config');
const _bd_logger = new BDLogger(`${_bd_config.dataPath}/log.log`, _bd_config.debug);
const _bd_IPC = require('electron').ipcMain;
const _bd_chokidar = require('chokidar');
const _bd_open = require('open');
const _bd_md5 = require('md5-file');

class BetterDiscord {
    constructor(options) {
        this.watchers = {};

        const { mainWindow, config } = options;

        if (config) {
            // Use config supplied by injector if present
            _bd_config = this.validateConfig(config) ? config : _bd_config;
        }

        if (!this.validateOptions(options)) return;
        this.options = options;

        CssEditor.setMainWindow(mainWindow);

        _bd_logger.log(`v${_bd_config.version} starting up`);

        this.initIpc();
        this.registerListeners();
        this.registerDomReady();
    }

    registerListeners() {
        this.fastHooked = true;
        const { webContents } = this.options.mainWindow;

        webContents.on('did-navigate-in-page', (event, url, isMainFrame) => {
            webContents.send('bd-async', {
                command: 'browser-event',
                event: {
                    url,
                    type: 'did-navigate-in-page'
                }
            });
        });
    }

    registerDomReady() {
        const { mainWindow } = this.options;

        BDUtils.execJs(mainWindow, `
            if(document.readyState === 'complete')
                window._bd.ipc.async({ command: 'dom-ready' });
        `);
        mainWindow.webContents.on('dom-ready', this.domReady.bind(this));
    }

    // dom ready listener
    domReady() {
        const { mainWindow } = this.options;

        _bd_logger.log("dom-ready", 'DBG');

        if (_bd_config.debug) {
            // If we're debugging then load the main script locally
            const waiter = setInterval(() => {
                // Wait for fasthook
                if (!this.fastHooked) return;

                clearInterval(waiter);
                this.clientPrep();

                BDUtils.execJs(mainWindow, `window._bd.options = {}`);
                if (_bd_config.debug) {
                    BDUtils.execJs(mainWindow, `window._bd.options.debug = true`);
                }

                BDUtils.injectDevScript(mainWindow, "betterdiscord.client.js");
            }, 100);
        }
    }

    // Adds IPC methods and listeners
    initIpc() {
        _bd_logger.log("initIpc", 'DBG');
        const { mainWindow } = this.options;

        this.ipcMain = _bd_IPC;
        this.ipcMain.on('bd-async', (e, a) => this.ipcAsync(e, a));
        this.ipcMain.on('bd-sync', (e, a) => this.ipcSync(e, a));

        BDUtils.execJs(mainWindow, `
            if (window._bd === undefined) window._bd = {};
            window._bd.ipc = require("electron").ipcRenderer;
            window._bd.ipc.async = function(message) {
                this.send("bd-async", message);
            };
            window._bd.ipc.sync = function(message) {
                this.send("bd-sync", message);
            };
        `);
    }

    watcher(path, event, cb) {
        let watcher = _bd_chokidar.watch(path);
        watcher.on(event, cb);
        return watcher;
    }

    // Asynchronous ipc event handler.
    ipcAsync(event, { command, data, id }) {
        _bd_logger.log(`ipcasync: ${command}:${JSON.stringify(data)}`, 'DBG');

        switch (command) {
            case "fasthook":
                this.fastHooked = data.hooked;
                break;
            case "getsettings":
                // TODO: Make this read from a settings file.
                event.sender.send('bd-async', { id: id, data: { paths: { settingsFile: 'g:/github/betterdiscordapp/devdata/bdsettings.json' } } });
                break;
            case "getconfig":
                event.sender.send('bd-async', { id: id, data: _bd_config });
                break;
            case "reset":
                this.fastHooked = true;
                break;
            case "dom-ready":
                this.domReady();
                break;
        }
    }

    // Synchronous ipc event handler.
    ipcSync(event, { command, data }) {
        _bd_logger.log(`ipcsync: ${command}:${JSON.stringify(data)}`, 'DBG');

        switch (command) {
            case "getsettings":
                return event.returnValue = { paths: { dataPath: _bd_config.dataPath } };
            case "getconfig":
                return event.returnValue = { data: _bd_config };
            case "md5":
                return event.returnValue = { data: _bd_md5.sync(data) };
        }

        event.returnValue = 'pong';
    }

    // Injects various properties into the main window to ensure bd runs properly.
    clientPrep() {
        const { mainWindow } = this.options;
        
        // Make sure _bd exists
        BDUtils.execJs(mainWindow, "window._bd = window._bd || {}");
        
        // Inject libraries
        BDUtils.injectScript(mainWindow, "window._bd.$ = window._bd.jQuery", "jquery.2.2.4.min.js");
        BDUtils.injectScript(mainWindow, "window._bd.moment", "moment.2.17.1.min.js");
        
        // Inject some initial css(move to separate file eventually)
        // BDUtils.injectCss(mainWindow, '@-webkit-keyframes li-opacity { 0% { opacity: 0.2; } 50% { opacity: 0.7; } 100% { opacity: 0.2; } }[data-bd="loading-icon"] { -webkit-animation: li-opacity 2s ease-out infinite; position: absolute; bottom: 5px; right: 5px; display: block; width: 35px; height: 35px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAwIDIwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzRTgyRTUiIGQ9Ik0xNDAyLjIsNjMxLjdjLTkuNy0zNTMuNC0yODYuMi00OTYtNjQyLjYtNDk2SDY4LjR2NzE0LjFsNDQyLDM5OFY0OTAuN2gyNTdjMjc0LjUsMCwyNzQuNSwzNDQuOSwwLDM0NC45SDU5Ny42djMyOS41aDE2OS44YzI3NC41LDAsMjc0LjUsMzQ0LjgsMCwzNDQuOGgtNjk5djM1NC45aDY5MS4yYzM1Ni4zLDAsNjMyLjgtMTQyLjYsNjQyLjYtNDk2YzAtMTYyLjYtNDQuNS0yODQuMS0xMjIuOS0zNjguNkMxMzU3LjcsOTE1LjgsMTQwMi4yLDc5NC4zLDE0MDIuMiw2MzEuN3oiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI2Mi41LDEzNS4yTDEyNjIuNSwxMzUuMmwtNzYuOCwwYzI2LjYsMTMuMyw1MS43LDI4LjEsNzUsNDQuM2M3MC43LDQ5LjEsMTI2LjEsMTExLjUsMTY0LjYsMTg1LjNjMzkuOSw3Ni42LDYxLjUsMTY1LjYsNjQuMywyNjQuNmwwLDEuMnYxLjJjMCwxNDEuMSwwLDU5Ni4xLDAsNzM3LjF2MS4ybDAsMS4yYy0yLjcsOTktMjQuMywxODgtNjQuMywyNjQuNmMtMzguNSw3My44LTkzLjgsMTM2LjItMTY0LjYsMTg1LjNjLTIyLjYsMTUuNy00Ni45LDMwLjEtNzIuNiw0My4xaDcyLjVjMzQ2LjIsMS45LDY3MS0xNzEuMiw2NzEtNTY3LjlWNzE2LjdDMTkzMy41LDMxMi4yLDE2MDguNywxMzUuMiwxMjYyLjUsMTM1LjJ6Ii8+PC9nPjwvc3ZnPg==); }', 'initial-css');
        
        // Inject our react root
        // BDUtils.injectElement(mainWindow, 'body', { type: 'div', id: 'bd-react-root' });
        
        // Inject loading spinner
        // BDUtils.injectComponent(mainWindow, 'bd-react-root', '_REACT.createElement("div", { "data-bd": "loading-icon" })');

        BDUtils.injectCss(mainWindow, '[data-bd=tbi-settings] span:first-child{color:#3E82E5;opacity:.5}[data-bd=tbi-settings] span:last-child{color:#FFF;opacity:.5}[data-bd=tbi-settings].selected span,[data-bd=tbi-settings]:hover span{opacity:1}[data-bd=protip]{position:absolute;left:0;right:12px;bottom:0;padding:10px;background:#3a71c1}[data-bd=protip] .tip a{color:#e0e0e0;margin:0 5px}[data-bd=protip] .tip a:hover{color:#FFF}', "somecss");
    }

    validateOptions(options) {
        if (options === undefined) {
            _bd_logger.log('NO OPTIONS SUPPLIED', 'ERR');
            _bd_logger.save(true);
            return false;
        }

        if (options.mainWindow === undefined) {
            _bd_logger.log('MISSING PARAM: mainWindow', 'ERR');
            _bd_logger.save(true);
            return false;
        }
        
        return true;
    }

    validateConfig(config) {
        return config.version && config.dataPath && config.basePath;
    }
}

module.exports = {
    BetterDiscord
};