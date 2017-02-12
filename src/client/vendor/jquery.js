"use strict";

const jQueryInstance = window._bd.jQuery;

class jQuery {
    constructor() {
        return jQueryInstance;
    }
}

module.exports = new jQuery();