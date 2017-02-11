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