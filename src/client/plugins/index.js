/**
 * BetterDiscord Plugin Export
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const Plugin = require('./plugin');
const PluginStorage = require('./storage');
const PluginApi = require('./api');

module.exports = {
    Plugin: Plugin,
    PluginStorage: PluginStorage,
    PluginApi: PluginApi
}