"use strict";

const Vendor = require('./vendor');

class jQuery extends Vendor { 
    constructor() {
        super("vendor.jQuery");
    }
}

module.exports = new jQuery();