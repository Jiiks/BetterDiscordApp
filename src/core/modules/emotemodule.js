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

class BDEmoteModule {
    constructor(dataPath) {
        this.dataPath = dataPath;
        this.cache = new BDEmoteCache(dataPath);
    }

    getEmotes(cb) {}
}

class BDEmoteCache {
    constructor(dataPath) {
        this.dataPath = dataPath;
    }
}

module.exports = {
    BDEmoteModule
};