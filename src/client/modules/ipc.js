/**
 * BetterDiscord IPC Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

//Initialize new ipc instance
const { ipcRenderer } = require('electron');
const ISingleton = require('../interfaces/isingleton');
const Events = require('./events');

class IPC extends ISingleton {

    constructor() {
        super("ipcmodule");
        let self = this;
        if(self.initialized) return;
        self.initialized = true;
        self.register = {};
        ipcRenderer.on("bd-async", self.onMessage.bind(self));
    }

    send(message, cb) {
        let self = this;
        let id = Date.now()+ Math.random();
        if(cb) self.register[id] = cb;
        ipcRenderer.send("bd-async", Object.assign({"id": id}, message));
    }

    sendSync(message) {
        return ipcRenderer.sendSync("bd-sync", message);
    }

    onMessage(event, args) {
        let self = this;
        if(self.register[args.id]) {
            self.register[args.id](args);
            delete self.register[args.id];
            return; //Registered event
        }

        let { command } = args;

        switch(command) {
            case 'browser-event':
            let { event } = args;
            Events.emit('browser-event', event);
            break;
        }

    }

    on(event, cb) {
        ipcRenderer.on(event, cb);
    }

}

module.exports = new IPC();