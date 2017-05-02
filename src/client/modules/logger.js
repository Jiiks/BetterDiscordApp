/**
 * BetterDiscord Logger Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const Settings = require('./settings');

class Logger {

    static log(moduleName, message, level) {
        console.log(`%c[%cBetter%cDiscord%c:${moduleName}%c]%c ${message} `, ...this.style(level || 'info'));
    }

	static debug(moduleName, message, level) {
		if(!Settings.debug) return;
		console.log(`%c[%cBetter%cDiscord%c:${moduleName}%c|DBG]%c ${message} `, ...this.style(level || 'info'));
	}

    static style(level) {
        return {
            'info': [
                'padding: 1px; color: #FFFFFF;',
                'padding: 1px; color: #3E82E5;',
                'padding: 1px; color: #FFFFFF;',
                'padding: 1px; color: #FFFFFF;',
                'padding: 1px; color: #FFFFFF;',
                'padding: 1px; color: #FFFFFF;'
            ],
            'warn': [
                'padding: 1px; color: #FFFFFF; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #3E82E5; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #fdda9c; background: #332a00; border-color: #665500; border-width: 1px 0 1px 0; border-style: solid;'
            ],
            'err': [
                'padding: 1px; color: #FFFFFF; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #3E82E5; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #FFFFFF; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;',
                'padding: 1px; color: #d56666; background: #280000; border-color: #5b0000; border-width: 1px 0 1px 0; border-style: solid;'
            ]
        }[level];
    }

}


module.exports = Logger;
