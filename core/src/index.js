const path = require('path');
const { ipcMain } = require('electron');

const { WindowUtils, Utils, Logger } = require('./utils');
const vendorScripts = require('./vendor');

class BdIpc {

    constructor(config) {
        this.config = config;
        this.async = this.async.bind(this);
        this.sync = this.sync.bind(this);
        this.resolveDir = this.resolveDir.bind(this);
        ipcMain.on('bd-async', this.async);
        ipcMain.on('bd-sync', this.sync);
    }

    async(event, arg) {

        const { module, command } = arg;
        if (!module || !command) return;

        switch(module) {
            case 'css-editor':
                this.cssEditorAsync(event, arg);
                return;
        }

        switch(command) {
            case 'opendir':
                Utils.openDir(this.resolveDir(arg.dir));
                return;
        }

    }

    resolveDir(dir) {
        switch(dir) {
            case 'plugindir':
                return path.join(this.config.dataPath, 'plugins');
                break;
        }
        return null;
    }

    cssEditorAsync(event, arg) {
        const { command, module, data } = arg;

        switch(command) {
            case 'get-css':
                event.sender.send('bd-async', { module, command: 'set-css', data: 'body { background: red }' });
                break;
            case 'close-editor':
                WindowUtils.webContents.send('bd-async', { module, command, data });
                event.sender.send('bd-async', { module, command, data });
                break;
            case 'update-css':
                WindowUtils.webContents.send('bd-async', { module, command, data });
                break;
        }
    }

    sync(event, arg) {
        //Return something if all else fail
        event.returnValue = 'Unknown';
    }

}

class BetterDiscord {

    constructor(middleWare, config) {
        this.middleWare = middleWare;
        this.config = config;
        this.ipc = new BdIpc(this.config);
        WindowUtils.setWindow(this.window);
        this.initListeners();
    }

    get window() { return this.middleWare.mainWindow; }
    get webContents() { return this.window.webContents; }

    initListeners() {
        this.webContents.on('dom-ready', this.domReady.bind(this));
    }

    domReady() {
        WindowUtils.execJs(`window.BetterDiscord = window.bd = ${JSON.stringify(this.config)}`);
        WindowUtils.execJs(`console.log("BetterDiscord v${this.config.version} Loading");`);
        this.injectVendorScripts();
        this.injectClientScript();
    }

    injectVendorScripts() {
        vendorScripts.forEach(vendorScript => {
            const { variable, file } = vendorScript;
            const vendorScriptPath = Utils.resolvePath('vendor', file);
            WindowUtils.injectScript(vendorScriptPath, variable, 'window.bd.vendor');
        });
    }

    injectClientScript() {
        WindowUtils.injectScript(Utils.resolvePath('../../', 'client', 'dist', 'bdclient.js'));
    }

}

module.exports = {
    BetterDiscord
};