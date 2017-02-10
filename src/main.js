const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger } = require('./utils');
const _bd_logger = new BDLogger(true);
const Config = require('./config');

class BDCore {

    constructor(options) {
        if(!this.validateOptions(options)) return;
        _bd_logger.log(`v${Config.version} starting up`);
    }

    validateOptions(options) 
        if(options.mainWindow === undefined) {
            _bd_logger.log('MISSING PARAM: mainWindow', 'ERR');
            return false;
        }
        return true;
    }

}

module.exports = {
    BetterDiscord: BDCore
}