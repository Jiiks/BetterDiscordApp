/**
 * BetterDiscord Config Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

import { IConfig } from '../interfaces';

export class Config {
    public static cfg: any;

    /**
     * Set global config
     * @param config Config object
     */
    public static setConfig(config: any) {
        this.cfg = config;
    }

    /**
     * @return Global config
     */
    public static get getConfig(): any {
        return this.cfg;
    }

    public static get(name: string): any {
        return this.cfg[name] || null;
    }

}