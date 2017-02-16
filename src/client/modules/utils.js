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

const fs = require('fs');
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

    fileExistsSync(path) {
        try {
            return fs.statSync(path).isFile();
        }catch(err) {
            return false;
        }
    }

    readFileSync(path, encoding) {
        if(!this.fileExistsSync(path)) return null;
        return fs.readFileSync(path, encoding || 'utf8');
    }

    writeFileSync(path, data, encoding) {
        try {
            fs.writeFileSync(path, data, encoding || 'utf8');
            return true;
        } catch(err) {
            return false;
        }
    }

}

module.exports = new Utils();