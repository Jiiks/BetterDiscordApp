const ISingleton = require('../interfaces/isingleton');

const { EventEmitter } = require('events');
const emitter = new EventEmitter();

let instance = null;

class Events extends ISingleton {

    constructor() {
        super("events");
    }

    on(eventName, callBack) {
        emitter.on(eventName, callBack);
    }

    emit(...args) {
        emitter.emit(...args);
    }

}

module.exports = new Events();