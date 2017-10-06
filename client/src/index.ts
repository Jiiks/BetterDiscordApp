/**
 * BetterDiscord Client Core
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
declare var window: any;

const bdcss = require('./styles/main.scss');

import { Observer, PluginManager, Config, Events, ModuleManager, CssEditor } from './modules';
import { UI } from './ui/ui';
import { DOM } from './ui/dom';
import { BdModule } from './modules/bdmodule';


class ClientCore {
    private bdModules: BdModule[] = [];

    constructor() {
        window.csse = CssEditor;
        CssEditor.init();
        Config.setConfig(window.bd);
        window.bdconfig = Config;
        window.DOM = DOM;
        window.Events = Events;
        DOM.injectStyleLink('https://fonts.googleapis.com/icon?family=Material+Icons');
        DOM.injectStyle(bdcss, 'bd-core-style');
        this.init();
    }

    private init(): void {
        document.addEventListener('click', e => {
            Events.emit('global.click', e);
        });
        const observer = new Observer();
       // const pluginManager = new PluginManager();
        const ui = new UI();

        //this.bdModules.push(observer, pluginManager);
        PluginManager.init();

        observer.observe();

      //  ModuleManager.addModule(pluginManager);
    }

    private getModule(name: string): BdModule {
        return this.bdModules.find(module => {
            return module.name === name;
        });
    }

    public quit(): void {
        this.bdModules.forEach(module => {
            module.cleanup();
        });
    }

}

new ClientCore();