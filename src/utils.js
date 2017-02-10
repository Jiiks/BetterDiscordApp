'use strict';

class Utils {

}

class Logger {
    log(message, level) {
        level = level || 'INFO';
        console.log(`[BetterDiscord|${level}] - ${message}`);
    }
}

module.exports = {
    Utils: new Utils(),
    Logger: new Logger()
};