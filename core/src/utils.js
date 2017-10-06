'use strict';

const path = require('path');

class WindowUtils {

    static setWindow(window) {
        this.window = window;
    }

    static get getWindow() {
        return this.window;
    }

    static get webContents() {
        return this.window.webContents;
    }

    static execJs(js) {
        this.webContents.executeJavaScript(js);
    }

    static injectScript(path, variable, parent) {
        if(parent) {
            this.execJs(`if(${parent} === undefined) ${parent} = {};`);
            this.execJs(`${parent}['${variable}'] = require('${path}');`);
            return;
        }
        if(variable) {
            this.execJs(`${variable} = require("${path}");`);
            return;
        }
        this.execJs(`require("${path}");`);
    }
}

class Utils {

    static resolvePath(...args) {
        return path.resolve(__dirname, ...args).replace(/\\/g, '/');
    }

    static openDir(path) {
        if (path === null) return;
        switch (process.platform) {
        case 'win32':
            require('child_process').exec('start "" "' + path + '"');
            break;
        case 'darwin':
            require('child_process').exec('open ' + path);
            break;
        }
    }

}

class Logger {

}

module.exports = {
    WindowUtils,
    Utils,
    Logger
};