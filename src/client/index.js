/**
 * BetterDiscord Client Core
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { Observer, Settings, IPC, Events, PluginManager, Utils, Logger, Reflection, BrowserEvents } = require('./modules');
const Api = require('./api');
const { SettingsPanel, ContextMenu } = require('./ui');
const { $ } = require('./vendor');


class BDCore {

    constructor() {

        window.Events = Events;
        window.Reflection = Reflection;

        let css = Utils.readFileSync(`${Settings.settings.dataPath}/betterdiscord.css`);

        $("head").append(`<style>${css}</style>`);

        window.onbeforeunload = (e) => {
            IPC.send({ "command": "reset" });
        };

        Observer.observe({ 'childList': true, 'subtree': true });

        let settingsPanel = new SettingsPanel();
    }

}

new BDCore();