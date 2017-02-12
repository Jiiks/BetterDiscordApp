/**
 * BetterDiscord Settings Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const ISingleton = require('../interfaces/isingleton');

const fs = require('fs');


class SettingsModule extends ISingleton {

    constructor(filePath) {
        super("settingsmodule");
        this.filePath = "g:/bdsettings.json"; //Static path for testing
    }

    load() {
        this.settings = JSON.parse(fs.readFileSync(this.filePath));
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.settings));
    }

    getCoreSetting(key)  { return this.getSetting("core",   key); }
    getUiSetting(key)    { return this.getSetting("ui",     key); }
    getEmoteSetting(key) { return this.getSetting("emotes", key); }
    getSetting(sub, key) {
        return this.settings[sub].filter(value => value.key === key)[0];
    }
}

module.exports = new SettingsModule(); 