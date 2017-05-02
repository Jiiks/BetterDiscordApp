/**
 * BetterDiscord Dom Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

/*Used for storing common nodes and manipulating the dom*/

const { $ } = require('../vendor');

class Dom {

    constructor() {
        
    }

    injectContainers() {
        let self = this;
        if (self.containers) return;

        self.containers = {
            'styleContainer': $("<span/>", { 'data-bd': 'style-container' }),
            'scriptContainer': $("<span/>", { 'data-bd': 'script-container' }),
            'modalContainer': $("<div/>", { 'data-bd': 'modal-container' })
        };

        self.containers.styleContainer.insertBefore($("body"));
        self.containers.scriptContainer.insertAfter($("body"));
        self.containers.modalContainer.insertAfter($(".modal-container").first());

    }

    get styleContainer() { return this.containers.styleContainer; }
    get scriptContainer() { return this.containers.scriptContainer; }
    get modalContainer() { return this.containers.modalContainer; }

}

module.exports = new Dom();