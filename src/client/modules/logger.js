/**
 * BetterDiscord Logger Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

class Logger {

    static log(moduleName, message, level = 'log') {
        level = this.parseLevel(level);
        console[level]('[%cBetter%cDiscord:%s] %s', 'color: #3E82E5', '', `${moduleName}${level === 'debug' ? '|DBG' : ''}`, message);
    }

    static logObject(moduleName, message, object, level) {
        if (message) this.log(moduleName, message, level);
        console.log(object);
    }

    static debug(moduleName, message, level, force) {
        if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }
        this.log(moduleName, message, 'debug', true);
    }

    static debugObject(moduleName, message, object, level, force) {
        if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }

        if (message) this.debug(moduleName, message, level, force);
        console.debug(object);
    }

    static parseLevel(level) {
        return {
            'log': 'log',
            'warn': 'warn',
            'err': 'error',
            'error': 'error',
            'debug': 'debug',
            'dbg': 'debug',
            'info': 'info'
        }[level];
    }

}

module.exports = Logger;