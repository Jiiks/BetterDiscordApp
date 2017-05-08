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

const { remote } = require('electron');
const IPC = require('./ipc');
const { $ } = require('../vendor');
const { ipcRenderer } = require('electron');

class CssEditor {
    constructor() {
        if (this.editor) return;
        this.editor = {
            open: false,
            options: {
                frame: false, 
                minWidth: 780, 
                minHeight: 400
            }
        };
        $("head").append('<style id="customcss"></style>');

        IPC.on('bd-css-editor', (sender, { command, data }) => {
            switch (command) {
                case 'update-css':
                    this.updateCss(data);
                    break;
            }
        });

        IPC.send({ command: 'getconfig' }, data => {
            let { dataPath } = data.data;
            this.dataPath = dataPath;
        });

        ipcRenderer.send('bd-css-editor', { command: 'load-css' });
    }

    updateCss(data) {
        $("#customcss").text(data);
    }

    setExEditorCss(data) {
        if (this.editor.window) {
            this.editor.window.webContents.send('set-css', data);
        }
    }

    open() {
        ipcRenderer.send('bd-css-editor', { command: 'open' });
    }

    loadURL(url) {
        if (!this.editor.window) return;
        this.editor.window.loadURL(url);
    }
}

module.exports = new CssEditor();