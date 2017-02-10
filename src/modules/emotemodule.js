'use strict';

class BDEmoteModule {

    constructor(dataPath) {
        this.dataPath = dataPath;
        this.cache = new BDEmoteCache(dataPath);
    }

     getEmotes(cb) {

    }

}

class BDEmoteCache {

    constructor(dataPath) {
        this.dataPath = dataPath;
    }

}

module.exports = {
    BDEmoteModule: BDEmoteModule
};