'use strict';

class BDCore {

    constructor() {
        this.options = window._bd.options;
        this.ws = window._bd.fastHook.ws;
        this.ipc = window._bd.ipc;
        this.$ = this.jQuery = window._bd.jQuery;
        if(this.options.debug) {
            window._bdDebug = window._bd;
            window.BD = window._bd;
        }
        window._bd = null;
    }

}

new BDCore();