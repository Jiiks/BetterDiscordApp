/*Messy dev script for dev preview*/

'use strict';

const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger, BDUtils } = require('./utils');
const { BDEmoteModule } = require('./modules/modules');
const IpcStruct = require('./modules/ipcstruct');
const _bd_fs = require('fs');
const _bd_config = require('./config');
const _bd_logger = new BDLogger(`${_bd_config.dataPath}/log.log`, _bd_config.debug);
const _bd_IPC = require('electron').ipcMain;
const _bd_chokidar = require('chokidar');
const _bd_open = require('open');
const _bd_md5 = require('md5-file');

class BetterDiscord {

    constructor(options) {
        let self = this;

        const { mainWindow } = options;
        let wc = mainWindow.webContents;

        if (!self.validateOptions(options)) return;
        self.options = options;

        _bd_logger.log(`v${_bd_config.version} starting up`);

        self.initIpc();
        self.listeners();
        //self.fastHook();

        self.domReady();

        self.watchers = {};

    }

    listeners() {
        let self = this;
        self.fastHooked = true;
        let { webContents } = self.options.mainWindow;

        webContents.on('did-navigate-in-page', (event, url, isMainFrame) => {
            webContents.send('bd-async', { 'command': 'browser-event', 'event': { 'type': 'did-navigate-in-page', 'url': url } });
        });
    }

    //dom ready listener
    domReady() {
        const { mainWindow } = this.options;
        var self = this;
        mainWindow.webContents.on('dom-ready', () => {
            _bd_logger.log("dom-ready", 'DBG');
            if (_bd_config.debug) {
                //If we're debugging then load the main script locally
                let waiter = setInterval(() => {
                    //Wait for fasthook
                    if (!self.fastHooked) return;
                    console.log("waiter");
                    clearInterval(waiter);
                    self.clientPrep();
                    //BDUtils.execJs(mainWindow, `window._bd = {}`);
                    BDUtils.execJs(mainWindow, `window._bd.options = {}`);
                    if (_bd_config.debug) {
                        BDUtils.execJs(mainWindow, `window._bd.options.debug = true`);
                    }
                    BDUtils.injectDevScript(mainWindow, "betterdiscord.client.js");
                }, 100);

            }
        });
    }

    //ipc injection. will be nulled later and not accessible to plugins/outside users.
    initIpc() {
        let self = this;
        _bd_logger.log("initIpc", 'DBG');
        const { mainWindow } = self.options;

        self.ipcMain = _bd_IPC;
        self.ipcMain.on('bd-async', (e, a) => self.ipcAsync(e, a));
        self.ipcMain.on('bd-sync', (e, a) => self.ipcSync(e, a));

        self.ipcMain.on('bd-async2', (e, a) => self.ipcAsync2(new IpcStruct(e, a)));

        self.customCssEditor();

        BDUtils.execJs(mainWindow, `if(window._bd === undefined) window._bd = {};
                                    window._bd.ipc = require("electron").ipcRenderer;
                                    window._bd.ipc.async = function(message) {
                                        this.send("bd-async", message);
                                    }
                                    window._bd.ipc.sync = function(message) {
                                        this.send("bd-sync", message);
                                    }
                                    `);
    }

    customCssEditor() {
        let self = this;
        let { mainWindow } = self.options;
        self.ipcMain.on('css-editor', (event, args) => {
            let { command, css } = args;
            switch (command) {
                case 'update-css':
                    mainWindow.webContents.send('css-editor', { 'command': 'update-css', 'css': css });
                    break;
                case 'open-ext-editor':
                    if (self.watchers.customcss) self.watchers.customcss.close();
                    self.watchers.customcss = self.watcher(`${_bd_config.dataPath}/custom.css`, 'change', path => {
                        console.log("change!");
                        if (path.indexOf('custom.css') === -1) return;
                        _bd_fs.readFile(path, 'utf8', (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            event.sender.send('set-css', data);
                        });
                    });
                    _bd_open(`${_bd_config.dataPath}/custom.css`);
                    break;
                case 'close-ext-editor':
                    if (!self.watchers.customcss) return;
                    console.log("close ext editor");
                    self.watchers.customcss.close();
                    self.watchers.customcss = null;
                    break;
                case 'get-css':
                    _bd_fs.readFile(`${_bd_config.dataPath}/custom.css`, 'utf8', (err, content) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        event.sender.send('set-css', content);
                    });
                    break;
                case 'save':
                    _bd_fs.writeFile(`${_bd_config.dataPath}/custom.css`, css, err => {
                        if (err) {
                            event.sender.send('save-error', err);
                            return;
                        }
                        event.sender.send('save-ok');
                    });
                    break;
            }
        });
    }

    watcher(path, event, cb) {
        let watcher = _bd_chokidar.watch(path);
        watcher.on(event, path => cb(path));
        return watcher;
    }

    //Asynchronous ipc event listener
    ipcAsync(event, arg) {
        let self = this;
        const { command, data, id } = arg;

        _bd_logger.log(`ipcasync: ${command}:${JSON.stringify(data)}`, 'DBG');

        switch (command) {
            case "fasthook":
                self.fastHooked = data.hooked;
                break;
            case "getsettings":
                event.sender.send('bd-async', { 'id': id, 'data': { 'paths': { 'settingsFile': 'g:/github/betterdiscordapp/devdata/bdsettings.json' } } });
                break;
            case "getconfig":
                event.sender.send('bd-async', { 'id': id, 'data': _bd_config });
                break;
            case "reset":
                self.fastHooked = true;
                break;
        }

    }

    //Synchronous ipc event listener
    ipcSync(event, arg) {
        const { command, data } = arg;

        _bd_logger.log(`ipcsync: ${command}:${JSON.stringify(data)}`, 'DBG');

        switch (command) {
            case "getsettings":
                return event.returnValue = { 'paths': { 'dataPath': _bd_config.dataPath } };
            case "getconfig":
                return event.returnValue = { 'data': _bd_config };
            case "md5":
                return event.returnValue = { 'data': _bd_md5.sync(data) };
        }

        event.returnValue = 'pong';
    }


    //Some client preparations
    clientPrep() {
        const { mainWindow } = this.options;
        //Make sure _bd exists
        BDUtils.execJs(mainWindow, "if(window._bd === undefined) { window._bd = {} }");
        //Inject jQuery
        BDUtils.injectScript(mainWindow, "window._bd.$ = window._bd.jQuery", "jquery.2.2.4.min.js");
        BDUtils.injectScript(mainWindow, "window._bd.moment", "moment.2.17.1.min.js");
        //Inject some initial css(move to separate file eventually)
        //BDUtils.injectCss(mainWindow, '@-webkit-keyframes li-opacity { 0% { opacity: 0.2; } 50% { opacity: 0.7; } 100% { opacity: 0.2; } }[data-bd="loading-icon"] { -webkit-animation: li-opacity 2s ease-out infinite; position: absolute; bottom: 5px; right: 5px; display: block; width: 35px; height: 35px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAwIDIwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzRTgyRTUiIGQ9Ik0xNDAyLjIsNjMxLjdjLTkuNy0zNTMuNC0yODYuMi00OTYtNjQyLjYtNDk2SDY4LjR2NzE0LjFsNDQyLDM5OFY0OTAuN2gyNTdjMjc0LjUsMCwyNzQuNSwzNDQuOSwwLDM0NC45SDU5Ny42djMyOS41aDE2OS44YzI3NC41LDAsMjc0LjUsMzQ0LjgsMCwzNDQuOGgtNjk5djM1NC45aDY5MS4yYzM1Ni4zLDAsNjMyLjgtMTQyLjYsNjQyLjYtNDk2YzAtMTYyLjYtNDQuNS0yODQuMS0xMjIuOS0zNjguNkMxMzU3LjcsOTE1LjgsMTQwMi4yLDc5NC4zLDE0MDIuMiw2MzEuN3oiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI2Mi41LDEzNS4yTDEyNjIuNSwxMzUuMmwtNzYuOCwwYzI2LjYsMTMuMyw1MS43LDI4LjEsNzUsNDQuM2M3MC43LDQ5LjEsMTI2LjEsMTExLjUsMTY0LjYsMTg1LjNjMzkuOSw3Ni42LDYxLjUsMTY1LjYsNjQuMywyNjQuNmwwLDEuMnYxLjJjMCwxNDEuMSwwLDU5Ni4xLDAsNzM3LjF2MS4ybDAsMS4yYy0yLjcsOTktMjQuMywxODgtNjQuMywyNjQuNmMtMzguNSw3My44LTkzLjgsMTM2LjItMTY0LjYsMTg1LjNjLTIyLjYsMTUuNy00Ni45LDMwLjEtNzIuNiw0My4xaDcyLjVjMzQ2LjIsMS45LDY3MS0xNzEuMiw2NzEtNTY3LjlWNzE2LjdDMTkzMy41LDMxMi4yLDE2MDguNywxMzUuMiwxMjYyLjUsMTM1LjJ6Ii8+PC9nPjwvc3ZnPg==); }', 'initial-css');
        //Inject our react root
        //BDUtils.injectElement(mainWindow, 'body', { type: 'div', id: 'bd-react-root' });
        //Inject loading spinner
        //BDUtils.injectComponent(mainWindow, 'bd-react-root', '_REACT.createElement("div", { "data-bd": "loading-icon" })');

        BDUtils.injectCss(mainWindow, '[data-bd=tbi-settings] span:first-child{color:#3E82E5;opacity:.5}[data-bd=tbi-settings] span:last-child{color:#FFF;opacity:.5}[data-bd=tbi-settings].selected span,[data-bd=tbi-settings]:hover span{opacity:1}[data-bd=protip]{position:absolute;left:0;right:12px;bottom:0;padding:10px;background:#3a71c1}[data-bd=protip] .tip a{color:#e0e0e0;margin:0 5px}[data-bd=protip] .tip a:hover{color:#FFF}', "somecss");
    }

    validateOptions(options) {
        if (options === undefined) {
            _bd_logger.log('NO OPTIONS SUPPLIED', 'ERR');
            _bd_logger.save(true);
            return;
        }
        if (options.mainWindow === undefined) {
            _bd_logger.log('MISSING PARAM: mainWindow', 'ERR');
            _bd_logger.save(true);
            return false;
        }
        return true;
    }

}

module.exports = {
    BetterDiscord: BetterDiscord
}