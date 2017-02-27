/**
 * BetterDiscord 24 Hour Timestamps
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

class TimeStamps {

    constructor() {
        let self = this;

        Events.on('channel-switch', () => self.replaceAll());
        Events.on('server-switch', () => self.replaceAll());
    }

    replaceAll() {
        if (!Settings.getUiSetting('timestamp').enabled) return;

        let self = this;
        
        $(".timestamp").not("[data-24]").each(function () {
            self.replace($(this));
        });
    }

    replace(timestamp) {

        timestamp.attr("data-24", true);

        let matches = /(.*)?at\s+(\d{1,2}):(\d{1,2})\s+(.*)/.exec(timestamp.text());

        if (!matches) return;
        if (matches.length < 5) return;

        let h = parseInt(matches[2]);
        if (matches[4] == "AM") {
            if (h == 12) h -= 12;
        } else if (matches[4] == "PM") {
            if (h < 12) h += 12;
        }

        matches[2] = ('0' + h).slice(-2);

        timestamp.text(matches[1] + " at " + matches[2] + ":" + matches[3]);

    }

}

module.exports = new TimeStamps();