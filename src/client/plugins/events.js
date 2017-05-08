/**
 * BetterDiscord Plugin Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const Logger = require('../modules/logger');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

class PluginEvents {
    static on(eventName, callBack) {
        try {
            emitter.on(eventName, callBack);
        } catch (err) {
            Logger.log('PluginEvents', 'Plugin event error:', 'err');
            console.log(err);
        }
    }

    static off(eventName, callBack) {
        try {
            emitter.removeListener(eventName, callBack);
        } catch (err) {
            Logger.log('PluginEvents', 'Plugin event error:', 'err');
            console.log(err);
        }
    }

    static emit(...args) {
        try {
            emitter.emit(...args);
        } catch (err) {
            Logger.log('PluginEvents', 'Plugin event error:', 'err');
            console.log(err);
        }
    }
}

module.exports = PluginEvents;