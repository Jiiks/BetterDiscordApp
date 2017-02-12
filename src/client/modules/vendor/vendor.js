"use strict";

const ISingleton = require('../../interfaces/isingleton');

class Vendor extends ISingleton {
    
    constructor(name) {
        super(name);
    }

    set(ref) {
        this.reference = ref;
    }

    get ref() {
        return this.reference;
    }
}

module.exports = Vendor;