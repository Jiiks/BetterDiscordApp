/**
 * BetterDiscord Observer Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const ISingleton = require('../interfaces/isingleton');
const Events = require('./events');

class ObserverModule extends ISingleton {

    constructor() {
        super("observer");
    }

    observe(options) {
        let self = this;
        if(self.observing) return;
        self.observing = true;
        self.observer = new MutationObserver(mutations => mutations.map(value => self.mutationHandler(value)));
        self.observer.observe(document, options);
    }

    mutationHandler(mutation) {
        let self = this;
        Events.emit("mutation", mutation);
    }
}

module.exports = new ObserverModule();