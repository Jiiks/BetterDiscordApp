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

const Events = require('./events');
const { $ } = require('../vendor');

class ObserverModule {
    observe(options) {
        if (this.observing) return;
        this.observing = true;
        this.observer = new MutationObserver(mutations => mutations.map(value => this.mutationHandler(value)));
        this.observer.observe(document, options);
    }

    mutationHandler(mutation) {
        Events.emit("mutation", mutation);
        this.settingsPanel(mutation);
        this.contextMenu(mutation);
    }

    contextMenu(mutation) {
        if (mutation.type !== 'childList') return;
        if (!mutation.addedNodes) return;
        if (mutation.addedNodes.length <= 0) return;
        const firstChild = mutation.addedNodes[0];
        if (!firstChild.classList) return;
        if (firstChild.classList.length !== 2) return;
        if (firstChild.classList[0] !== 'context-menu') return;

        Events.emit('context-menu', $(".context-menu").first());
    }

	settingsPanel(mutation) {
		if (mutation.type !== 'childList') return;
        if (!mutation.addedNodes) return;
        if (!mutation.addedNodes.length) return;
		if (!mutation.target.classList.contains("layers")) return;
		if (!$(".ui-tab-bar-header:contains('App Settings')").length) return;

		Events.emit('user-settings-layer', mutation.addedNodes[0]);
	}

    settingsPanelOld(mutation) {
        if (mutation.type !== 'childList') return;
        if (!mutation.addedNodes) return;
        if (mutation.addedNodes.length <= 0) return;
        const $userSettingsModal = $(mutation.addedNodes[0]).find(".user-settings-modal");
        if ($userSettingsModal.length <= 0) return;
        Events.emit('user-settings-modal', $userSettingsModal);
    }
}

module.exports = new ObserverModule();