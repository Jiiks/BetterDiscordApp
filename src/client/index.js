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

class BDCore {

    constructor() {
        let self = this;
        Logger.log('Core', `v${Api.bdVersion}:${Api.jsVersion} Initialized`);

        window.onbeforeunload = (e) => {
            IPC.send({ "command": "reset" });
        };

        self.injectGlobal();
        Dom.injectContainers();


        self.tempStuff();
    }

    //Inject global BetterDiscord variable
    injectGlobal() {
        window.BetterDiscord = {
            'version': `${Settings.version}:${Settings.jsversion}`,
            'debug': Settings.debug
        };

        if (!Settings.debug) return;

        window.BetterDiscord = Object.assign(window.BetterDiscord, {
            Api: Api,
            jQuery: $,
            $: $,
            Logger: Logger,
            Utils: Utils,
            Settings: Settings,
            Reflection: DeepReflection,
            Events: Events,
            Dom: Dom
        });
    }

    tempStuff() {

        window.backdrop = CBackdrop;
        window.backdropContainer = CBackdropContainer;
        window.modal = CModal;
        window.clog = CChangeLog;

        let css = Utils.readFileSync(`${Settings.settings.dataPath}/betterdiscord.css`);
        Api.injectStyle('bd-main', css);

        Observer.observe({ 'childList': true, 'subtree': true });

        let settingsPanel = new SettingsPanel();

        Api.injectStyle('trans', `
        .bd-backdrop-container {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1000;
            opacity: 1;
        }

        .bd-backdrop-container .bd-backdrop {
            opacity: 0;
        }
        .bd-backdrop-container.visible .bd-backdrop {
            opacity: .85;
        }

        .bd-backdrop-container .bd-backdrop-container-content > div {
            transform: scale(.8);
            opacity: 0;
            transition: .15s;
        }

        .bd-backdrop-container.visible .bd-backdrop-container-content > div {
            transform: scale(1);
            opacity: 1;
        }
        .bd-backdrop {
            background: rgb(0,0,0);
            transition: opacity .3s;
        }

        .bd-modal {
            opacity: 1;
        }

        .markdown-modal {
            background-color: #2e3136;
        }

        .markdown-modal .markdown-modal-header {
            border-bottom: 1px solid hsla(218,5%,47%,.3);
        }

        .markdown-modal .markdown-modal-footer {
            background-color: #2b2e33;
            border-top: 1px solid hsla(218,5%,47%,.3);
        }
        
        .markdown-modal .scroller-wrap .scroller ul li {
            color: #b9bbbe;
        }
        `)
    }
}

new BDCore();