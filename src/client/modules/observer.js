/**
 * BetterDiscord Observer Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const ISingleton = require('../interfaces/isingleton');
const Events = require('./events');
const { $ } = require('../vendor');

class ObserverModule extends ISingleton {

    constructor() {
        super("observer");
    }

    observe(options) {
        let self = this;
        if(self.observing) return;
        self.observing = true;
        self.observer = new MutationObserver(mutations => mutations.map(value => self.mutationHandler(value)));
        self.observer.observe(document, options);
    }

    mutationHandler(mutation) {
    
        let self = this;
        Events.emit("mutation", mutation);
        self.settingsPanel(mutation);
        self.contextMenu(mutation);
    }

    contextMenu(mutation) {
        if(mutation.type !== 'childList') return;
        if(!mutation.addedNodes) return;
        if(mutation.addedNodes.length <= 0) return;
        let firstChild = mutation.addedNodes[0];
        if(!firstChild.classList) return;
        if(firstChild.classList.length !== 2) return;
        if(firstChild.classList[0] !== 'context-menu') return;

        Events.emit('context-menu', $(".context-menu").first());
    }

    settingsPanel(mutation) {
        if(mutation.type !== 'childList') return;
        if(!mutation.addedNodes) return;
        if(mutation.addedNodes.length <= 0) return;
        let $userSettingsModal = $(mutation.addedNodes[0]).find(".user-settings-modal");
        if($userSettingsModal.length <= 0) return;
        Events.emit('user-settings-modal', $userSettingsModal);
    }
}

module.exports = new ObserverModule();
