'use strict';

const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger } = require('./utils');
const { BDEmoteModule } = require('./modules/modules');
const _bd_config = require('./config');
const _bd_logger = new BDLogger("g:/bdlogs.txt", _bd_config.debug);

class BetterDiscord {

    constructor(options) {
        if(!this.validateOptions(options)) return;
        _bd_logger.log(`v${_bd_config.version} starting up`);
    }

    validateOptions(options) {
        if(options === undefined) {
            _bd_logger.log('NO OPTIONS SUPPLIED', 'ERR');
            _bd_logger.save(true);
            return;
        }
        if(options.mainWindow === undefined) {
            _bd_logger.log('MISSING PARAM: mainWindow', 'ERR');
            _bd_logger.save(true);
            return false;
        }
        return true;
    }

}

module.exports = {
    BetterDiscord: BetterDiscord
}