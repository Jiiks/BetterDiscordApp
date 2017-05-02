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

const IPC = require('./ipc');
const Utils = require('./utils');
const Logger = require('./logger');
const defaultSettings = require('../data/user.settings.default');

class SettingsModule {

    constructor() {
        let self = this;

        let getSettings = IPC.sendSync({ 'command': 'getconfig' });
        self.settings = getSettings.data;
        Logger.debugObject('SettingsModule', 'Settings:', self.settings, 'info', true);
        self.load();
    }

    load() {
        let self = this;
        self.userSettings = defaultSettings;
        let read = Utils.readFileSync(`${self.settings.dataPath}/user.settings.json`);

        if (!read) {
            Logger.log('SettingsModule', `Failed to read settings file: ${self.settings.dataPath}/user.settings.json. Loading default settings.`, 'warn');
            return;
        }

        let settings = Utils.tryParse(read);

        if (settings) {
            Object.keys(self.userSettings).some(cat => {
                if(!settings.hasOwnProperty(cat)) return true;
				if(!settings[cat].length) return true;
                self.userSettings[cat].some(setting => {
                    let userSetting = settings[cat].find(value => { return value.key === setting.key; });
                    if (userSetting) setting.enabled = userSetting.enabled;
                });
            });
        }

        Logger.debugObject('SettingsModule', 'Loaded user settings', self.userSettings, 'info', true);
    }

    save() {
        let self = this;
        if (!Utils.writeFileSync(`${self.settings.dataPath}/user.settings.json`, JSON.stringify(self.userSettings))) {
            Logger.log('SettingsModule', 'Failed to save settings file', 'err');
        }
    }

	get version() { return this.settings.version; }
	get jsversion() { return "DP2"; }
	get debug() { return this.settings.debug; }
	get basePath() { return this.settings.basePath; }
	get dataPath() { return this.settings.dataPath; }

    get getCoreSettings() { return this.getSettings("core"); }
    get getUiSettings() { return this.getSettings("ui"); }
    get getEmoteSettings() { return this.getSettings("emotes"); }
    getSettings(key) { return this.userSettings[key]; }

    getCoreSetting(key) { return this.getSetting("core", key); }
    getUiSetting(key) { return this.getSetting("ui", key); }
    getEmoteSetting(key) { return this.getSetting("emotes", key); }
    getSetting(sub, key) {
        return this.userSettings[sub].filter(value => value.key === key)[0];
    }

    setCoreSetting(key, enabled) { this.setSetting("core", key, enabled); }
    setUiSetting(key, enabled) { this.setSetting("ui", key, enabled); }
    setEmoteSetting(key, enabled) { this.setSetting("emotes", key, enabled); }
    setSetting(sub, key, enabled) {
        this.getSetting(sub, key).enabled = enabled;
        this.save();
    }
}

module.exports = new SettingsModule();