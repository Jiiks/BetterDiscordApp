/**
 * BetterDiscord Plugin Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/


const { Plugin, PluginApi, PluginStorage, PluginEvents } = require('../plugins');
const { jQuery, React, moment } = require('../vendor');
const IPC = require('./ipc');
const Utils = require('./utils');
const Logger = require('./logger');
const Settings = require('./settings');

const Plugins = [];

const Vendor = {
    'jQuery': jQuery,
    '$': jQuery,
    'React': React,
    'moment': moment
};

const blockedKeywords = {
    'token': 'ACCESS USER TOKEN',
    'localstorage': 'ACCESS LOCALSTORAGE',
    'require': 'REQUIRE MODULE',
    'iframe': 'CREATE IFRAMES',
    'eval': 'EVALUATE CODE'
};

const authorizedPlugins = [];

class PluginManager {

    constructor() {
        this.loadPlugins(() => { });
    }

    get pluginPath() {
        return `${Settings.settings.basePath}/plugins`;
    }

    get plugins() {
        return Plugins;
    }

    loadPlugins(cb) {
        Utils.readDir(this.pluginPath, files => {
            if (!files) {
                cb(this.plugins);
                return;
            }

            files.forEach(file => {
                this.loadPlugin(file, false, true);
            });

            cb(this.plugins);
        });
    }



    loadPlugin(name, reload, all, cb) {

        const basePath = `${this.pluginPath}/${name}`;

        if (this.getPlugin(name) && !reload) {
            if (!all) Logger.log('PluginManager', `Attempted to load already loaded plugin: ${name}`, 'warn');
            return;
        }

        const config = Utils.tryParse(Utils.readFileSync(`${basePath}/config.json`));

        if (!config) {
            Logger.log('PluginManager', `Failed to load config for: ${name}`, 'err');
            return;
        }

        Utils.readDir(basePath, files => {
            const pluginFile = files.find(file => file.endsWith('.js'));
            const absPath = `${basePath}/${pluginFile}`;
            if (!this.validatePlugin(absPath)) {
                console.log("INVALID PLUGIN");
                return;
            }

            if (reload) delete window.require.cache[window.require.resolve(absPath)];

            const storage = new PluginStorage(basePath, config.defaultSettings);

            const BD = {
                'Api': new PluginApi(config.info),
                'Storage': storage,
                'Events': PluginEvents
            };

            let plugin = null;
            let pluginInstance = null;

            try {
                plugin = window.require(absPath)(Plugin, BD, Vendor);
                pluginInstance = new plugin(config.info);
            } catch (err) {
                Logger.log('PluginManager', `Failed to load plugin: ${name} - ${err.message}`, 'err');
                console.log(err.stack);
                return;
            }

            pluginInstance.internal = {
                'storage': storage,
                'path': name
            };

            if (reload) {
                const index = this.getPluginIndex(name);
                this.plugins[index] = pluginInstance;
            } else {
                this.plugins.push(pluginInstance);
            }

            if (pluginInstance.internal.storage.getSetting('enabled')) pluginInstance.onStart();
            if (cb) cb(pluginInstance);
        });

    }

    reloadPlugin(id, cb) {
        const plugin = this.getPlugin(id);
        if (!plugin) {
            Logger.log('PluginManager', `Attempted to reload a plugin that is not loaded: ${id}`, 'warn');
            if (cb) cb(null);
            return;
        }

        if (plugin.internal.storage.getSetting('enabled')) plugin.onStop();

        this.loadPlugin(plugin.internal.path, true, false, cb);
    }

    startPlugin(id) {
        const plugin = this.getPlugin(id);
        if (!plugin) {
            Logger.log('PluginManager', `Attempted to start a plugin that is not loaded: ${id}`, 'err');
            return;
        }

        if (!plugin.onStart()) return false;
        plugin.internal.storage.setSetting('enabled', true);
        return true;
    }

    stopPlugin(id) {
        const plugin = this.getPlugin(id);
        if (!plugin) {
            Logger.log('PluginManager', `Attempted to stop a plugin that is not loaded: ${id}`, 'err');
            return;
        }

        if (!plugin.onStop()) return false;
        plugin.internal.storage.setSetting('enabled', false);
        return true;
    }

    getPluginIndex(name) {
        return this.plugins.findIndex(plugin => { return (plugin.name === name || plugin.internal.path === name); });
    }

    getPlugin(name) {
        return this.plugins.find(plugin => { return (plugin.name === name || plugin.internal.path === name); });
    }

    validatePlugin(path) {
        let pluginData = Utils.readFileSync(path);

        if (!pluginData) {
            Logger.log('PluginLoader', `Attempted to load a plugin that does not seem to exist: ${path}`, 'warn');
            return false;
        }

        pluginData = pluginData.toLowerCase();

        if (Object.keys(blockedKeywords).some(key => {
            if (pluginData.indexOf(key) !== -1) {
                Logger.log('PluginLoader', `BLOCKED LOADING OF PLUGIN ATTEMPTING TO ${blockedKeywords[key]}`, 'err');
                return false;
            }
        }));

        return true;
    }

    validateHash(path) {
        const hash = IPC.sendSync({ 'command': 'md5', 'data': path }).data;
        if (!authorizedPlugins.includes(hash)) {
            Logger.log('PluginLoader', 'BLOCKED LOADING OF UNAUTHORIZED PLUGIN', 'err');
            return false;
        }
        return true;
    }

}

module.exports = new PluginManager();