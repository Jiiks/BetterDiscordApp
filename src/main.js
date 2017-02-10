const { Storage, PluginStorage } = require('./storage');
const { Logger } = require('./utils');
const Config = require('./config');

class Core {

    constructor(options) {
        Logger.log(`v${Config.version} starting up`);
    }

}

module.exports = {
    Core: Core
}