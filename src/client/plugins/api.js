/**
 * BetterDiscord Plugin Api
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
'use strict';

const Logger = require('../modules/logger');
const Api = require('../modules/api');

class PluginApi {
    constructor(props) {
        this.props = props;
    }

    log(message, level) {
        Logger.log(this.props.name, message, level);
    }

    injectStyle(id, css) {
        Api.injectStyle(id, css);
    }

    removeStyle(id) {
        Api.removeStyle(id);
    }

    injectScript(id, script) {
        Api.injectScript(id, script);
    }

    removeScript(id) {
        Api.removeScript(id);
    }
}

module.exports = PluginApi;