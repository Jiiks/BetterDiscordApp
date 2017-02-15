/**
 * BetterDiscord Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const ISingleton = require('../interfaces/isingleton');

const { EventEmitter } = require('events');
const emitter = new EventEmitter();

class Events extends ISingleton {

    constructor() {
        super("events");
    }

    on(eventName, callBack) {
        emitter.on(eventName, callBack);
    }

    emit(...args) {
        emitter.emit(...args);
    }

}

module.exports = new Events();