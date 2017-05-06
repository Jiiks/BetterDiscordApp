/**
 * BetterDiscord Plugin Storage
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

const Utils = require('../modules/utils');


class PluginStorage {

    constructor(path, defaults) {
        this.path = `${path}/settings.json`;
        this.defaultConfig = defaults;
        this.load();
    }

    load() {
        let self = this;
        self.settings = JSON.parse(JSON.stringify(self.defaultConfig));

        let loadSettings = Utils.tryParse(Utils.readFileSync(self.path));

        if (loadSettings) {
            Object.keys(loadSettings).map(key => {
                self.setSetting(key, loadSettings[key]);
            });
        }

        if (!this.getSetting('enabled')) this.setSetting('enabled', false);
    }

    save() {
        let reduced = this.settings.reduce((result, item) => { result[item.id] = item.value; return result; }, {});
        Utils.writeFileSync(this.path, JSON.stringify(reduced));
    }

    getSetting(id) {
        let setting = this.settings.find(setting => setting.id === id);
        if (!setting) return null;
        return setting.value;
    }

    setSetting(id, value) {
        let setting = this.settings.find(setting => setting.id === id);
        if (!setting) {
            this.settings.push({ 'id': id, 'value': value });
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