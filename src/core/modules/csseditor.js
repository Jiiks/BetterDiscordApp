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
        _bd_IPC.on('bd-async', self.ipcAsync);
    }

    ipcAsync(event, args) {
        let self = this;
        const { command, data, id } = args;
        if (command !== 'css-editor') return;

        switch (data) {
            case 'open':
                self.openEditor();
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


}

module.exports = new CssEditor();