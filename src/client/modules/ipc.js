/**
 * BetterDiscord IPC Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const { ipcRenderer } = require('electron');
const Events = require('./events');

class IPC {
    constructor() {
        this.register = {};
        ipcRenderer.on("bd-async", this.onMessage.bind(this));
    }

    send(message, cb) {
        const id = Date.now() + Math.random();
        if (cb) this.register[id] = cb;
        ipcRenderer.send("bd-async", Object.assign({ id }, message));
    }

    sendSync(message) {
        return ipcRenderer.sendSync("bd-sync", message);
    }

    onMessage(event, args) {
        if (this.register[args.id]) {
            this.register[args.id](args);
            delete this.register[args.id];
            return; //Registered event
        }

        const { command } = args;
        switch (command) {
            case 'browser-event':
                Events.emit('browser-event', args.event);
                break;
        }
    }

    on(event, cb) {
        ipcRenderer.on(event, cb);
    }
}

module.exports = new IPC();