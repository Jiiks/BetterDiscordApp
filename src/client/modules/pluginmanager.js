/**
 * BetterDiscord Plugin Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

const { Plugin, PluginApi, PluginStorage } = require('../plugins');
const { jQuery, React } = require('../vendor');
const IPC = require('./ipc');

const Utils = require('./utils');
const Logger = require('./logger');
const Events = require('./events');
const Settings = require('./settings');

const Plugins = {};

const Vendor = {
    'jQuery': jQuery,
    'React': React
};


//Heuristic keyword ban
const blockedKeywords = {
    'token':        'ACCESS USER TOKEN',
    'localstorage': 'ACCESS LOCALSTORAGE',
    'require':      'REQUIRE MODULE',
    'iframe':       'CREATE IFRAMES',
    'eval':         'EVALUATE CODE'
};

const authorizedPlugins = [];

class PluginManager {

    constructor() {
        let self = this;
        self.pluginPath = `${Settings.settings.basePath}/plugins`;
        self.loadPlugins(() => { });
    }

    loadPlugins(cb) {
        let self = this;
        Utils.readDir(self.pluginPath, files => {
            if (!files) {
                cb(self.plugins);
                return;
            }
            files.forEach(file => {
                self.loadPluginv2(file, false, true);
                //if (!file.endsWith('.plugin.js')) return;
                //self.loadPlugin(file.replace('.plugin.js', ''));
            });

            cb(self.plugins);
        });
    }

    loadPluginv2(name, reload, all) {
        let self = this;

        let basePath = `${self.pluginPath}/${name}`;

        if (self.plugins.hasOwnProperty(name) && !reload) {
            if (!all) Logger.log('PluginManager', `Attempted to load already loaded plugin: ${name}`, 'warn');
            return;
        }

        let config = Utils.tryParse(Utils.readFileSync(`${basePath}/config.json`));

        if (!config) {
            Logger.log('PluginManager', `Failed to load config for: ${name}`, 'err');
            return;
        }

        Utils.readDir(basePath, files => {
            let pluginFile = files.find(file => file.endsWith('.js'));
            if (!self.validatePlugin(`${basePath}/${pluginFile}`)) return;

            if (reload) delete window.require.cache[window.require.resolve(`${basePath}/${pluginFile}`)];


            let BD = {
                'Api': new PluginApi(config.info),
                'Storage': new PluginStorage(basePath, config.defaultSettings),
                'Events': Events
            }

            let plugin = null;
            let pluginInstance = null;

            try {
                plugin = window.require(`${basePath}/${pluginFile}`)(Plugin, BD, Vendor);
                pluginInstance = new plugin(config.info);
            } catch (err) {
                Logger.log('PluginManager', `Failed to load plugin: ${name} - ${err.message}`, 'err');
                console.log(err.stack);
                return;
            }

            pluginInstance.internal = {
                'storage': BD.Storage,
                'path': name
            };

            Plugins[config.info.name] = pluginInstance;

            if (pluginInstance.internal.storage.getSetting('enabled')) pluginInstance.onStart();
        });
    }

    loadPlugin(name, reload) {
        let self = this; 

        if (self.plugins.hasOwnProperty(name) && !reload) return;

        let path = `${self.pluginPath}/${name}.plugin.js`;

        if (!self.validatePlugin(path)) return;

        if (reload) delete window.require.cache[window.require.resolve(path)];

        let plugin = null;
        let pluginInstance = null;
        try {
            plugin = window.require(path)(Plugin);
            pluginInstance = new plugin();
        } catch (err) {
            Logger.log('PluginLoader', `Failed to load plugin: ${name} - ${err.message}`, 'err');
            console.log(err.stack);
            return;
        }

        pluginInstance.id = name;

        Plugins[name] = pluginInstance;

        let storage = new PluginStorage({ 'basePath': self.pluginPath, 'name': name, 'defaults': pluginInstance.defaultConfig });
        storage.load();

        pluginInstance.onLoad({
            'Api': new PluginApi(pluginInstance.props),
            'Vendor': Vendor,
            'Storage': storage,
            'Events': Events
        });

        pluginInstance.internal = {
            'storage': storage
        };

        if (!storage.getSetting('enabled')) storage.setSetting('enabled', false);
        if (storage.getSetting('enabled')) pluginInstance.onStart();

        return pluginInstance;
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
                return true;
            }
        })) return false;

        //HASH VALIDATION IS DISABLED DURING DEVELOPMENT
       /* let hash = IPC.sendSync({ 'command': 'md5', 'data': path }).data;
        if (!authorizedPlugins.includes(hash)) {
            Logger.log('PluginLoader', 'BLOCKED LOADING OF UNAUTHORIZED PLUGIN', 'err');
            return false;
        }*/

        return true;
    }

    reloadPlugin(id) {
        if (!Plugins.hasOwnProperty(id)) {
            Logger.log('PluginManager', `Attempted to reload a plugin that is not loaded: ${id}`, 'warn');
            return null;
        }

        if (Plugins[id].internal.storage.getSetting('enabled')) Plugins[id].onStop();

        return this.loadPluginv2(Plugins[id].internal.path, true);
    }

    startPlugin(id) {
        if (!Plugins.hasOwnProperty(id)) {
            Logger.log('PluginManager', `Attempted to start a plugin that is not loaded: ${id}`, 'err');
            return;
        }

        if (!Plugins[id].onStart()) return false;
        Plugins[id].internal.storage.setSetting('enabled', true);
        return true;
    }

    stopPlugin(id) {
        if (!Plugins.hasOwnProperty(id)) {
            Logger.log('PluginManager', `Attempted to stop a plugin that is not loaded: ${id}`, 'err');
            return;
        }

        if (!Plugins[id].onStop()) return false;
        Plugins[id].internal.storage.setSetting('enabled', false);
        return true;
    }

    get plugins() {
        return Plugins;
    }

}

module.exports = new PluginManager();