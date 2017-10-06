/**
 * BetterDiscord Plugin Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { IPluginConfig } from "../interfaces/index";

export abstract class Plugin {
    private config: IPluginConfig;
    private pluginFilePath: string;
    private pluginConfigPath: string;
    private pluginBasePath: string;
    public enabled: boolean = false;

    /**
     * Set plugin config
     * @param config Plugin config
     * @param pluginFilePath Code file path
     * @param pluginConfigPath Config file path
     * @param pluginBasePath Base directory path
     */
    public setConfig(config: IPluginConfig, paths: any): void {
        this.config = config;
        this.pluginFilePath = paths.pluginFilePath;
        this.pluginConfigPath = paths.pluginConfigPath;
        this.pluginBasePath = paths.pluginPath;
    }
    /*public setConfig(config: IPluginConfig, pluginFilePath: string, pluginConfigPath: string, pluginBasePath: string): void {
        this.config = config;
        this.pluginFilePath = pluginFilePath;
        this.pluginConfigPath = pluginConfigPath;
        this.pluginBasePath = pluginBasePath;
    }*/

    /**
     * @return Plugin Config
     */
    public get getConfig(): IPluginConfig {
        return this.config;
    }

    /**
     * @return Plugin Info
     */
    public get info(): any {
        return this.config.info;
    }

    /**
     * @return Plugin code file path
     */
    public get getFilePath(): string {
        return this.pluginFilePath;
    }

    /**
     * @return Plugin config file path
     */
    public get getConfigPath(): string {
        return this.pluginConfigPath;
    }

    /**
     * @return Plugin base path
     */
    public get getBasePath(): string {
        return this.pluginBasePath;
    }

    /**
     * Plugin onStart function
     */
    public abstract onStart(): boolean;
    /**
     * Plugin onStop function
     */
    public abstract onStop(): boolean;

    public abstract get settingsPanel(): any;
}