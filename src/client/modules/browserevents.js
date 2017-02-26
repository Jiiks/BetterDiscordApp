/**
 * BetterDiscord Browser Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';


const Events = require('./events');

class BrowserEvents {

    constructor() {

    }

    static init() {
        let self = this;
        self.prev = {
            'server': undefined,
            'channel': undefined
        }
        Events.on('browser-event', e => {
            let { type, url } = e;
            switch (type) {
                case 'did-navigate-in-page':
                    let parsed = self.parseUrl(url);
                    if (parsed.server !== self.prev.server) {
                        Events.emit('server-switch');
                        self.prev = parsed;
                        return;
                    }
                    if (parsed.channel !== self.prev.channel) {
                        Events.emit('channel-switch');
                        self.prev = parsed;
                        return;
                    }
                    break;
            }
        });
    }

    static parseUrl(url) {
        let splice = url.split('/').splice(4);
        return {
            'server': splice[0],
            'channel': splice[1]
        };
    }


}

module.exports = BrowserEvents;