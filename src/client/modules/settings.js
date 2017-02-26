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
const defaultSettings = {
    "core": [
        {
            "key": "voice-disconnect",
            "text": "Voice Disconnect",
            "helptext": "Disconnect from voice server when Discord closes",
            "enabled": false
        },
        {
            "key": "developer-mode",
            "text": "Developer Mode",
            "helptext": "BetterDiscord developer mode",
            "enabled": false
        }
    ],
    "ui": [
        {
            "key": "public-servers",
            "text": "Public Servers",
            "helptext": "Display public servers button",
            "enabled": false
        },
        {
            "key": "minimal-mode",
            "text": "Minimal Mode",
            "helptext": "Hide elements and reduce size of certain elements",
            "enabled": false
        },
        {
            "key": "voice-mode",
            "text": "Voice Mode",
            "helptext": "Only show voice chat",
            "enabled": false
        },
        {
            "key": "hide-channels",
            "text": "Hide Channels",
            "helptext": "Hide server channels in minimal mode",
            "enabled": false
        },
        {
            "key": "dark-mode",
            "text": "Dark Mode(wip)",
            "helptext": "Make certain elements dark by default",
            "enabled": false
        },
        {
            "key": "timestamp",
            "text": "24 Hour Timestamps",
            "helptext": "Replace 12 hour timestamps with proper ones",
            "enabled": false
        },
        {
            "key": "coloured-text",
            "text": "Coloured Text",
            "helptext": "Make text colour the same as role colour",
            "enabled": false
        }
    ],
    "emotes": [
        {
            "key": "twitch-emotes",
            "text": "Twitch Emotes",
            "helptext": "Show Twitch emotes",
            "enabled": false
        },
        {
            "key": "ffz-emotes",
            "text": "FrankerFaceZ Emotes",
            "helptext": "Show FrankerFaceZ emotes",
            "enabled": false
        },
        {
            "key": "bttv-emotes",
            "text": "BetterTTV Emotes",
            "helptext": "Show BetterTTV emotes",
            "enabled": false
        },
        {
            "key": "emote-menu",
            "text": "Emote Menu",
            "helptext": "Show Twitch/Favourite emotes in emote menu",
            "enabled": false
        },
        {
            "key": "emoji-menu",
            "text": "Emoji Menu",
            "helptext": "Show Discord emoji menu",
            "enabled": false
        },
        {
            "key": "emote-autocap",
            "text": "Emote Auto Capitalization",
            "helptext": "Automatically capitalize emotes as you type",
            "enabled": false
        },
        {
            "key": "emote-tooltips",
            "text": "Emote Tooltips",
            "helptext": "Show emote tooltips when you hover over them",
            "enabled": false
        },
        {
            "key": "emote-modifiers",
            "text": "Emote Modifiers",
            "helptext": "Enable emote modifiers",
            "enabled": false
        }
    ]
}

class SettingsModule {

    constructor() {}

    static init() {
        console.log("INIT!");
        let self = this;
        if(self.filePath !== undefined) {
            //TODO replace with Logger
            console.log("Attempt to reinitialize SettingsModule has been blocked");
            return;
        }

        let getSettings = IPC.sendSync({ 'command': 'getconfig' });
        self.settings = getSettings.data;
        
        self.load();
    }

    static load() {
        let self = this;
        let read = Utils.readFileSync(`${self.settings.dataPath}/user.settings.json`);

        if(!read) {
            console.log(self.settings.dataPath);
            self.userSettings = defaultSettings;
            return;
        }

        let settings = Utils.tryParse(read);
        
        self.userSettings = settings || defaultSettings;
    }

    static save() {
        let self = this;
        if (!Utils.writeFileSync(`${self.settings.dataPath}/user.settings.json`, JSON.stringify(self.userSettings))) {
            //TODO replace with Logger
            console.log("Failed to write settings file!");
        }
    }

    static get getCoreSettings() { return this.getSettings("core"); }
    static get getUiSettings() { return this.getSettings("ui"); }
    static get getEmoteSettings() { return this.getSettings("emotes"); }
    static get getSecuritySettings() { return this.getSettings("security"); }
    static getSettings(key) { return this.userSettings[key]; }

    static getCoreSetting(key)  { return this.getSetting("core",   key); }
    static getUiSetting(key)    { return this.getSetting("ui",     key); }
    static getEmoteSetting(key) { return this.getSetting("emotes", key); }
    static getSecuritySetting(key) { return this.getSetting("security", key); }
    static getSetting(sub, key) {
        return this.userSettings[sub].filter(value => value.key === key)[0];
    }

    static setCoreSetting(key, enabled) { this.setSetting("core", key, enabled); }
    static setUiSetting(key, enabled) { this.setSetting("ui", key, enabled); }
    static setEmoteSetting(key, enabled) { this.setSetting("emotes", key, enabled); }
    static setSecuritySetting(key, enabled) { this.setSetting("security", key, enabled); }
    static setSetting(sub, key, enabled) {
        this.getSetting(sub, key).enabled = enabled;
        this.save();
    }
}

module.exports = SettingsModule; 