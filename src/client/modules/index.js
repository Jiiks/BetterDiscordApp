/**
 * BetterDiscord Modules Export
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const Utils = require('./utils');
const Logger = require('./logger');
const IPC = require('./ipc');
const cache = require('./cache');
const events = require('./events');
const messageHandler = require('./messageHandler');
const observer = require('./observer');
const reflection = require('./reflection');
const renderer = require('./renderer');
const settings = require('./settings');
const CssEditor = require('./csseditor');
const Emotes = require('./emotes');
const PluginManager = require('./pluginmanager');

module.exports = {
    Utils: Utils,
    Logger: Logger,
    Cache: cache,
    Events: events,
    MessageHandler: messageHandler,
    Observer: observer,
    Reflection: reflection,
    Renderer: renderer,
    Settings: settings,
    IPC: IPC,
    CssEditor: CssEditor,
    Emotes: Emotes,
    PluginManager: PluginManager
}