/**
 * BetterDiscord UI Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

import { Events } from '../modules';
import { CSettingsPanel } from './components/settingspanel';
import { CModal } from './components';

const settingsPanelClassSelector: string = 'layers';

export class UI {

    _settingsPanel: CSettingsPanel;

    constructor() {
        this._settingsPanel = new CSettingsPanel();
        this.eventListeners();
    }

    private eventListeners(): void {
        Events.on('mutation.childList', mutation => {
            const { addedNodes, removedNodes, target } = mutation;

            if (removedNodes.length > 0 && target) {
                if (target.className.includes(settingsPanelClassSelector)) {
                    Events.emit('bd.settingsClosed');
                }
            }

            if(!addedNodes || addedNodes.length <= 0 || !target) return;

            if(target.className.includes(settingsPanelClassSelector)) {
                this.injectSettingsPanel();
                return;
            }
        });

        Events.on('bd.errorDialog', error => {
            const { title, message } = error;
            
        });
    }

    private injectSettingsPanel(): void {
        this._settingsPanel.render();
    }

}