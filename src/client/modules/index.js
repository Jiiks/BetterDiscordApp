/**
 * BetterDiscord Modules Export
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const cache = require('./cache');
const events = require('./events');
const messageHandler = require('./messageHandler');
const observer = require('./observer');
const reflection = require('./reflection');
const renderer = require('./renderer');
const settings = require('./settings');
const settingsPanel = require('./settingsPanel');

module.exports = {
    Cache: cache,
    Events: events,
    MessageHandler: messageHandler,
    Observer: observer,
    Reflection: reflection,
    Renderer: renderer,
    Settings: settings,
    SettingsPanel: settingsPanel
}