'use strict';

const ISingleton = require('../interfaces/isingleton');
const Events = require('./events');

class ObserverModule extends ISingleton {

    constructor() {
        super("observer");
    }

    observe(options) {
        if(this.observing) return;
        this.observing = true;
        this.observer = new MutationObserver(mutations => mutations.map(value => this.mutationHandler(value)));
        this.observer.observe(document, options);
    }

    mutationHandler(mutation) {
        Events.emit("mutation", mutation);
    }

}

module.exports = new ObserverModule();



var obs = new MutationObserver(mutations => mutations.map(value => {
    console.log(value);
}));