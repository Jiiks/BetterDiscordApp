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

const { Observer, Settings, IPC, Events, PluginManager, Utils, Logger, Reflection, BrowserEvents, DeepReflection, Api, Dom } = require('./modules');
const { SettingsPanel, ContextMenu } = require('./ui');
const { $ } = require('./vendor');
const { CBackdrop, CModal, CBackdropContainer } = require('./ui/components');
const { CChangeLog } = require('./ui/components/bd');
const mainCss = require('../scss/main.scss');

class BDCore {
    constructor() {
        Logger.log('Core', `v${Api.bdVersion}:${Api.jsVersion} Initialized`);

        window.onbeforeunload = (e) => {
            IPC.send({ "command": "reset" });
        };

        this.injectGlobal();
        Dom.injectContainers();

        this.tempStuff();
    }

    // Inject global BetterDiscord variable
    injectGlobal() {
        window.BetterDiscord = {
            version: `${Settings.version}:${Settings.jsversion}`,
            debug: Settings.debug
        };

        if (!Settings.debug) return;

        window.BetterDiscord = Object.assign(window.BetterDiscord, {
            Api,
            jQuery: $,
            $,
            Logger,
            Utils,
            Settings,
            Reflection: DeepReflection,
            Events,
            Dom,
            PluginManager
        });
    }

    tempStuff() {
        window.backdrop = CBackdrop;
        window.backdropContainer = CBackdropContainer;
        window.modal = CModal;
        window.clog = CChangeLog;

        // let css = Utils.readFileSync(`${Settings.settings.dataPath}/betterdiscord.css`);
        Api.injectStyle('bd-main', mainCss.toString());

        Observer.observe({ childList: true, subtree: true });

        let settingsPanel = new SettingsPanel();
    }
}

new BDCore();