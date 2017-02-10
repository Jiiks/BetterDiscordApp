'use strict';

class Utils {

}

class Logger {

    constructor(debug) {
        this.debug = debug || false;
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
        if(typeof message === "object") {
            console.log(`[BetterDiscord|${level}] - ${JSON.stringify(message)}`);
            return;
        }
        console.log(`[BetterDiscord|${level}] - ${message}`);
    }
}

module.exports = {
    Utils: new Utils(),
    Logger: Logger
};