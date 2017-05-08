/**
 * BetterDiscord Coloured Text
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const { Events, Settings } = require('../../modules');
const { $ } = require('../../vendor');

class ColouredText {
    constructor() {
        if (Settings.getUiSetting('coloured-text').disabled) return;
        
        Events.on('channel-switch', () => this.replaceAll());
        Events.on('server-switch', () => this.replaceAll());
    }

    replaceAll() {
        if (!Settings.getUiSetting('coloured-text').enabled) return;

        const self = this;
        $(".user-name").each(function () {
            self.replace($(this));
        });
    }

    replace(parent) {
        const roleColour = parent.css("color");
        if (roleColour === "rgb(255, 255, 255)") return;

        parent.closest(".message-group").find(".markup").not("[data-colour]").each(function () {
            const t = $(this);
            t.attr("data-colour", true);
            t.css("color", roleColour);
        });
    }
}

module.exports = new ColouredText();