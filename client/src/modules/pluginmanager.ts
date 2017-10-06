/**
 * BetterDiscord Plugin Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

declare var window : any;

import * as React from 'react';

import { IError } from '../interfaces';

import { BdModule } from './bdmodule';
import { Utils, Logger, Plugin, Config } from './';

import path = require('path');

import { CModal } from '../ui/components';

const Vendor: any = {
    React
};

class PluginManager extends BdModule {

   // private pluginPath: string;
    private plugins: Plugin[] = [];
    public get Plugins(): Plugin[] { return this.plugins; }
    
    public get name(): string { return 'PluginManager' }

    protected bindings(): void {

    }

    public cleanup(): void {}

    public init(): void {
        this.loadPlugins();
    }

    private get pluginPath(): string {
        return path.join(Config.get('dataPath'), 'plugins');
    }

    private setPlugins(plugins: Plugin[]): Plugin[] {
        return (this.plugins = plugins);
    }

    private resolvePlugin(sp: string | Plugin): Plugin {
        return (typeof (sp) === 'string') ? this.getPlugin(sp) : sp;
    }

    public async loadPlugins(): Promise<Plugin[]> {

        const pluginDirs = await Utils.readDirAsync(this.pluginPath);
        const loadedPlugins: Plugin[] = [];
        const errors: IError[] = [];

        for (let pluginDir of pluginDirs) {
            try {
                const plugin = await this.loadPlugin(pluginDir);
                loadedPlugins.push(plugin);
            } catch (err) {
                errors.push(err);
            }
        }

        if (errors.length > 0) {
            const errorModal = new CModal({
                'title': 'Failed to load one or more plugin(s)!',
                'message': 'The following plugin(s) failed to load:',
                errors
            });
            errorModal.render();
        }
        
        return this.setPlugins(loadedPlugins);
    }

    private async loadPlugin(directory: string, reload: boolean = false, index: number = 0): Promise<Plugin> {

        try {

            const pluginPath = reload ? directory : path.join(this.pluginPath, directory);

            const files = await Utils.readDirAsync(pluginPath);

            const [configFilePath, pluginFilePath] = [
                await this.locateConfigFile(pluginPath, files),
                await this.locatePluginFile(pluginPath, files)
            ];

            const pluginConfig = await Utils.readJsonAsync(configFilePath);

            if (!reload) {
                const loadedPlugin = this.getPlugin(pluginConfig.info.name);
                if (loadedPlugin) return loadedPlugin;
            }

            const plugin = window.require(pluginFilePath)(Plugin, {}, Vendor);
            const pluginInstance = new plugin() as Plugin;
            pluginInstance.setConfig(pluginConfig, { pluginFilePath, configFilePath, pluginPath });

            if (reload) {
                this.plugins[index] = pluginInstance;
                return pluginInstance;
            }

            this.plugins.push(pluginInstance);
            return pluginInstance;

        } catch (err) {
            const error: IError = {
                native: err,
                severity: 1,
                reason: err.message || err,
                shortReason: '',
                title: directory
            };
            Logger.log(this.name, error);
            return Promise.reject(error);
        }

    }

    public async reloadPlugin(name: string): Promise<Plugin> {
        const plugin = this.resolvePlugin(name);

        if (!plugin) Promise.reject('Attempted to reload a plugin that is not loaded');

        if (plugin.enabled) {
            if (!plugin.onStop()) Promise.reject('Failed to stop plugin!');
        }

        delete window.require.cache[window.require.resolve(plugin.getFilePath)];
        console.log(plugin.getBasePath);
        const reloaded = await this.loadPlugin(plugin.getBasePath, true, this.plugins.indexOf(plugin));
        if (plugin.enabled) return this.startPlugin(reloaded);

        return reloaded;
    }
    

    public async stopPlugin(sp: string | Plugin): Promise<Plugin> {
        const plugin = this.resolvePlugin(sp);

        if (!plugin) Promise.reject('Attempted to stop a plugin that doesn\'t exist');
        if (!plugin.enabled) Promise.reject('Attempted to stop a plugin that is already stopped.');
        if (!plugin.onStop()) Promise.reject('Failed to stop plugin!');

        plugin.enabled = false;
        return plugin;
    }

    public async startPlugin(sp: string | Plugin): Promise<Plugin> {
        const plugin = this.resolvePlugin(sp);

        if (!plugin) Promise.reject('Attempted to start a plugin that doesn\'t exist');
        if (plugin.enabled) Promise.reject('Attempted to start a plugin that is already started.');
        if (!plugin.onStart()) Promise.reject('Failed to start plugin!');

        plugin.enabled = true;
        return plugin;
    }

    private async locateConfigFile(basePath: string, files: string[]): Promise<string> {
        const configFile: string = files.find(file => file === 'config.json');
        if (!configFile) return Promise.reject('Config file not found!');

        return path.join(basePath, configFile);
    }

    private async locatePluginFile(basePath: string, files: string[]): Promise<string> {
        let pluginFile: string = files.find(file => file.endsWith('plugin.js'));
        if (!pluginFile) pluginFile = files.find(file => file.endsWith('.js'));

        if (!pluginFile) return Promise.reject('Plugin file not found!');

        return path.join(basePath, pluginFile);
    }

    private getPlugin(name: string): Plugin {
        if (this.plugins.length <= 0) return null;
        return this.plugins.find(plugin => plugin.getConfig.info.name === name );
    }

}

export default new PluginManager();