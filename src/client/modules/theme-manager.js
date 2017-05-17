/**
 * BetterDiscord Theme Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
'use strict';

const Settings = require('./settings');
const Utils = require('./utils');
const Logger = require('./logger');
const Api = require('./api');
const { $ } = require('../vendor');

const Theme = require('../themes/theme');
const ThemeStorage = require('../themes/storage');

const Themes = [];

class ThemeManager {

    constructor() {
        this.loadThemes(() => { });
    }

    get themePath() {
        return `${Settings.settings.basePath}/themes`;
    }

    get themes() {
        return Themes;
    }

    loadThemes(cb) {
        Utils.readDir(this.themePath, files => {
            if (!files) {
                cb(this.themes);
                return;
            }

            files.forEach(file => {
                this.loadTheme(file, false, true);
            });

            cb(this.themes);
        });
    }

    loadTheme(name, reload, all, cb) {

        const basePath = `${this.themePath}/${name}`;

        if (this.getTheme(name) && !reload) {
            Logger.log('ThemeManager', `Attempted to load already loaded theme: ${name}`, 'warn');
            return;
        }

        const config = Utils.tryParse(Utils.readFileSync(`${basePath}/config.json`));
        if (!config) {
            Logger.log('ThemeManager', `Failed to load config for: ${name}`, 'err');
            return;
        }

        Utils.readDir(basePath, files => {
            const themeFile = files.find(file => file.endsWith('.css'));
            const absPath = `${basePath}/${themeFile}`;

            const css = Utils.readFileSync(absPath);
            if (!css) {
                Logger.log('ThemeManager', `Invalid theme ${name} at ${absPath}`, 'err');
                return;
            }

            const storage = new ThemeStorage(basePath, config.defaultSettings);
            const theme = new Theme(Object.assign(config.info, { css }));

            theme.internal = {
                storage,
                path: name
            };

            if (reload) {
                const index = this.getThemeIndex(name);
                this.themes[index] = theme;
            } else {
                this.themes.push(theme);
            }

            if (theme.enabled) Api.injectTheme(theme.name, theme.css);
            if (cb) cb(theme);
        });

    }

    reloadTheme(id, cb) {
        const theme = this.getTheme(id);
        if (!theme) {
            Logger.log('ThemeManager', `Attempted to reload a theme that is not loaded: ${id}`, 'warn');
            if (cb) cb(null);
            return;
        }

        if (theme.enabled) Api.removeTheme(theme.name);

        this.loadTheme(theme.internal.path, true, false, cb);
    }

    enableTheme(id) {

        const theme = this.getTheme(id);
        if (!theme) {
            Logger.log('ThemeManager', `Attempted to enable a theme that is not loaded: ${id}`, 'err');
            return false;
        }

        if (!theme.css) {
            Logger.log('ThemeManager', `Attempted to enable a theme that does not contain valid css: ${id}`, 'err');
            return false;
        }

        if (theme.enabled) {
            Logger.log('ThemeManager', `Attempted to enable already enabled theme: ${id}`, 'warn');
            return false;
        }

        theme.internal.storage.setSetting('enabled', true);

        Api.injectTheme(theme.name, theme.css);
        return true;
    }

    disableTheme(id) {

        const theme = this.getTheme(id);
        if (!theme) {
            Logger.log('ThemeManager', `Attempted to disable a theme that is not loaded: ${id}`, 'err');
            return false;
        }

        if (!theme.enabled) {
            Logger.log('ThemeManager', `Attempted to disable already disabled theme: ${id}`, 'warn');
            return false;
        }

        theme.internal.storage.setSetting('enabled', false);

        Api.removeTheme(theme.name);

        return true;
    }

    getTheme(name) {
        return this.themes.find(theme => theme.name === name || theme.internal.path === name);
    }

    getThemeIndex(name) {
        return this.themes.findIndex(theme => theme.name === name || theme.internal.path === name);
    }

}

module.exports = new ThemeManager();