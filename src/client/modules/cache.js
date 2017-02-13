/**
 * BetterDiscord Cache Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

class Cache {
    
    constructor(persistent) {
        this.cache = {};
        if(!persistent) {
            setInterval(this.clear.bind(this), 60000);
        }
    }

    add(id, o) {
        this.cache[id] = o;
    }

    cached(id) {
        return id in this.cache;
    }

    clear() {
        this.cache = {};
    }
}

module.exports = Cache;