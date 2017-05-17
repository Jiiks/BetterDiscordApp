/**
 * BetterDiscord Api Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
'use strict';

const { Message, Channel, User, Guild, Role } = require('../api/structs');
const DeepReflection = require('./reflection_deep');
const Settings = require('./settings');
const Dom = require('./dom');
const { $ } = require('../vendor');

class Api {
    static get bdVersion() {
        return Settings.version;
    }

    static get jsVersion() {
        return Settings.jsversion;
    }

    static get Reflection() {
        return DeepReflection;
    }

    static get currentGuild() {
        const guild = new Guild(DeepReflection.scan(".title-wrap", "guild"));
        return guild.null ? null : guild;
    }

    static get currentChannel() {
        const channel = new Channel(DeepReflection.scan(".title-wrap", "channel"));
        return channel.null ? null: channel;
    }

    static injectTheme(id, css) {
        Dom.themeContainer.append($("<style/>", {
            'data-bd': id,
            'text': css
        }));
    }

    static removeTheme(id) {
        Dom.themeContainer.find(`[data-bd='${id}']`).remove();
    }

    static injectStyle(id, css) {
        Dom.styleContainer.append($("<style/>", {
            'data-bd': id,
            'text': css
        }));
    }

    static removeStyle(id) {
        Dom.styleContainer.find(`[data-bd='${id}']`).remove();
    }

    static injectScript(id, script) {
        Dom.scriptContainer.append($("<script/>", {
            'data-bd': id,
            'text': script
        }));
    }

    static removeScript(id) {
        Dom.scriptContainer.find(`[data-bd='${id}']`).remove();
    }
}

module.exports = Api;