/**
 * BetterDiscord Emote Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const Events = require('./events');

class Emotes {

    constructor() {
        let self = this;

        Events.on('new-message', message => {
            self.inspectMessage(message);
        });

    }

    inspectMessage(message) {

    }
}

module.exports = new Emotes();