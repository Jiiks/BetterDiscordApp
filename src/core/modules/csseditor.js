/**
 * BetterDiscord CSS Editor Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const _bd_fs = require('fs');
const _bd_electron = require('electron');
const _bd_IPC = _bd_electron.ipcMain;
const _bd_config = require('../config');
const _bd_path = require('path');

const _bd_csseditor = {
    'path': _bd_path.resolve(__dirname, '../csseditor') + '/index.html',
    'open': false,
    'window': null,
    'options': {
        'frame': false,
        'minWidth': 780,
        'minHeight': 400
    }
};

class CssEditor {

    constructor() {
        let self = this;
        self.ipcAsync = self.ipcAsync.bind(self);
        _bd_IPC.on('bd-css-editor', self.ipcAsync);
    }

    setMainWindow(mainWindow) {
        this.mainWindow = mainWindow;
    }

    ipcAsync(event, args) {
        let self = this;
        const { command, data } = args;

        switch (command) {
            case 'open':
                self.openEditor();
                break;
            case 'get-css':
                self.loadCss(event);
                break;
            case 'update-css':
                self.mainWindow.webContents.send('bd-css-editor', { 'command': 'update-css', 'data': data });
                break;
        }
    }

    openEditor() {
        let self = this;
        if (_bd_csseditor.open) {
            _bd_csseditor.window.focus();
            _bd_csseditor.window.flashFrame(true);
            return;
        }

        _bd_csseditor.window = new _bd_electron.BrowserWindow(_bd_csseditor.options);
        _bd_csseditor.window.loadURL(`file://${_bd_csseditor.path}`);
        _bd_csseditor.open = true;
        _bd_csseditor.window.webContents.on('close', () => {
            _bd_csseditor.open = false;
        });
    }

    loadCss(event) {
        _bd_fs.readFile(`${_bd_config.dataPath}/custom.css`, 'utf-8', (err, content) => {
            if (err) {
                console.log(err);
                event.sender.send('set-css', '');
                return;
            }

            event.sender.send('set-css', content);
        });
    }


}

module.exports = new CssEditor();