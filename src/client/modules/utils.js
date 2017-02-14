/**
 * BetterDiscord Utilities Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const Cache = require('./cache');

class Utils {

    constructor() {

    }

    tryParse(data) {
        try {
            return JSON.parse(data);
        }catch(err) {
            return null;
        }
    }

}

module.exports = new Utils();