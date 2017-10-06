/**
 * BetterDiscord CSS Editor Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
declare var window: any;
declare var screen: any;

const { Config } = require('./');
import { DOM } from '../ui/dom';

let win: any = null;
const { remote, ipcRenderer } = window.require('electron');

const defaultWindowOptions = {
    x: screen.width / 2 - 400,
    y: screen.height / 2 - 300,
    width: 800,
    height: 600,
    frame: false
};

const windowOptions = defaultWindowOptions;

export class CssEditor {

    public static init(): void {
        ipcRenderer.on('bd-async', (event: any, arg: any) => {
            const { module, command } = arg;
            if (!module || !command || module !== 'css-editor') return;

            switch(command) {
                case 'close-editor':
                    if (arg.data && arg.data.bounds) {
                        const { bounds } = arg.data;
                        windowOptions.width = bounds.width;
                        windowOptions.height = bounds.height;
                        windowOptions.x = bounds.x;
                        windowOptions.y = bounds.y;
                    }
                    win = null;
                    break;
                case 'update-css':
                    if (arg.data && arg.data.css) {
                        DOM.customCssContainer.textContent = arg.data.css;
                    }
                    break;
            }
        });
    }

    public static open(): void {
        console.log(win);
        if (win) return;

        win = new remote.BrowserWindow(windowOptions);
        win.loadURL(`${Config.getConfig.basePath}/csseditor/index.html`);
    }

}