/**
 * BetterDiscord Injector
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const _bd_fs = require('fs');
const _bd_eol = require('os').EOL;
const _bd_open = require('open');

class BDUtils {
    // Injects an element to Discord window
    static injectElement(window, selector, element) {
        this.execJs(window, `window._bd.$("${selector}").append(window._bd.$("<${element.type}/>", { "data-bd": "${element.id}" }));`);
    }

    // Injects component to Discord window
    static injectComponent(window, selector, component) {
        this.execJs(window, `let _REACT = require('react'); require('react-dom').render(${component}, window._bd.$("[data-bd=${selector}]")[0]);`);
    }

    // Executes the specified javascript.
    static execJs(window, js) {
        window.webContents.executeJavaScript(`(() => { ${js} })();`);
    }

    // Injects the specified vendor script.
    static injectScript(window, variable, file) {
        let path = `${__dirname}/vendor/${file}`.replace(/\\/g, '/');
        this.execJs(window, `${variable} = require("${path}");`);
    }

    // Injects the specified built dev script.
    static injectDevScript(window, file) {
        let path = `${__dirname}/../../dist/client/${file}`.replace(/\\/g, '/');
        this.execJs(window, `require("${path}");`);
    }

    // Injects the specified CSS into a tag with the specified id.
    static injectCss(window, css, id) {
        this.execJs(window, `window._bd.$("head").append('<style data-bd="${id}">${css}></style>');`);
    }
}

class BDLogger {
    constructor(logPath, debug = false) {
        this.debug = debug;
        this.logs = [];
        this.logPath = logPath;
    }

    log(message, level = 'INFO') {
        if (level === 'DBG' && !this.debug) return;

        this.actualLog(message, level);
    }

    actualLog(message, level) {
        let msg = message;
        if (typeof message === "object") {
            msg = JSON.stringify(message);
        }

        this.logs.push(`[BetterDiscord|${level}] - ${message}`);
        console.log(`[BetterDiscord|${level}] - ${message}`);
    }

    save(err) {
        if (err) { 
            _bd_fs.writeFileSync(this.logPath, ["BetterDiscord ERROR. Something went wrong :(", "=================================", ...this.logs].join(_bd_eol));
            _bd_open(this.logPath);
            return;
        }

        _bd_fs.writeFileSync(this.logPath, this.logs.join(_bd_eol));
    }
}

module.exports = {
    BDUtils,
    BDLogger
};