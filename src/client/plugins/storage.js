/**
 * BetterDiscord Plugin Storage
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
'use strict';

const Utils = require('../modules/utils');

class PluginStorage {
    constructor(path, defaults) {
        this.path = `${path}/settings.json`;
        this.defaultConfig = defaults;
        this.load();
    }

    load() {
        this.settings = JSON.parse(JSON.stringify(this.defaultConfig));

        const loadSettings = Utils.tryParse(Utils.readFileSync(this.path));
        if (loadSettings) {
            Object.keys(loadSettings).map(key => {
                this.setSetting(key, loadSettings[key]);
            });
        }

        if (!this.getSetting('enabled')) this.setSetting('enabled', false);
    }

    save() {
        const reduced = this.settings.reduce((result, item) => { result[item.id] = item.value; return result; }, {});
        Utils.writeFileSync(this.path, JSON.stringify(reduced));
    }

    getSetting(id) {
        const setting = this.settings.find(setting => setting.id === id);
        if (!setting) return null;
        return setting.value;
    }

    setSetting(id, value) {
        const setting = this.settings.find(setting => setting.id === id);
        if (!setting) {
            this.settings.push({ id, value });
        } else {
            setting.value = value;
        }
        this.save();
    }

    setSettings(settings) {
        this.settings = settings;
    }
}

module.exports = PluginStorage;