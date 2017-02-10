const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger } = require('./utils');
const _bd_config = require('./config');
const _bd_logger = new BDLogger(_bd_config.debug);

class BDCore {

    constructor(options) {
        if(!this.validateOptions(options)) return;
        _bd_logger.log(`v${_bd_config.version} starting up`);
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