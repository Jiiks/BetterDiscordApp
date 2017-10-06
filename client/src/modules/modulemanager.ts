/**
 * BetterDiscord Module Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { BdModule } from './bdmodule';

export class ModuleManager {
    static _modules: BdModule[] = [];

    static getModule(name: string): BdModule {
        return this._modules.find(module => module.name === name);
    }

    static addModule(module: BdModule): void {
        this._modules.push(module);
    }

}