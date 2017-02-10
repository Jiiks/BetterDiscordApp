const { Storage, PluginStorage } = require('./storage');
const { Logger } = require('./utils');
const _logger = new Logger(true);
const Config = require('./config');

class Core {

    constructor(options) {
        if(!this.validateOptions(options)) return;
        _logger.log(`v${Config.version} starting up`);
    }

    validateOptions(options) 
        if(options.mainWindow === undefined) {
            _logger.log('MISSING PARAM: mainWindow', 'ERR');
            return false;
        }
        return true;
    }

}

module.exports = {
    BetterDiscord: Core
}