'use strict';

const _bd_fs = require('fs');
const _bd_eol = require('os').EOL;
const _bd_open = require('open');

class BDUtils {

    //Injects an element to Discord window
    injectElement(window, selector, element) {
        this.execJs(window, 
            `
            let _ELEMENT = document.createElement("${element.type}");
            _ELEMENT.id = "${element.id}";
            _ELEMENT.class = "${element.class}";
            document.querySelector("${selector}").appendChild(_ELEMENT);
            `);
    }

    //Injects component to Discord window
    injectComponent(window, selector, component) {
        this.execJs(window, `require('react-dom').render(${component}, document.querySelector("${selector}"));`);
    }

    execJs(window, js) {
        window.webContents.executeJavaScript(`(() => { ${js} })();`);
    }

    injectScript(window, variable, file) {
        let path = `${__dirname}/vendor/${file}`.replace(/\\/g, '/');
        this.execJs(window, `${variable} = require("${path}");`);
    }

}

class BDLogger {

    constructor(logPath, debug) {
        this.debug = debug || false;
        this.logs = [];
        this.logPath = logPath;
    }

    log(message, level) {
        level = level || 'INFO';
        if(level === 'DBG') {
            if(this.debug) this.actualLog(message, level);
            return;
        }
        this.actualLog(message, level);
    }

    actualLog(message, level) {
        let msg = message;
        if(typeof message === "object") {
            msg = JSON.stringify(message);
        }
        this.logs.push(`[BetterDiscord|${level}] - ${message}`);
        console.log(`[BetterDiscord|${level}] - ${message}`);
    }

    save(err) {
        if(err)  { 
            _bd_fs.writeFileSync(this.logPath, ["BetterDiscord ERROR. Something went wrong :(", "=================================", ...this.logs].join(_bd_eol));
            _bd_open(this.logPath);
            return;
        }
        _bd_fs.writeFileSync(this.logPath, this.logs.join(_bd_eol));
    }
}

module.exports = {
    BDUtils: new BDUtils(),
    BDLogger: BDLogger
};