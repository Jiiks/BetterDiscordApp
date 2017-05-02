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
            'head': $("<bd-head/>"),
            'body': $("<bd-body/>"),
            'modalContainer': $("<div/>", { 'data-bd': 'modal-container' })
        };

        self.containers.head.appendTo($("head"));
        self.containers.body.appendTo($("body"));
        self.containers.modalContainer.appendTo(self.containers.body);

    }

    get head() { return this.containers.head; }
    get styleContainer() { return this.head; }
    get body() { return this.containers.body; }
    get scriptContainer() { return this.body; }
    get modalContainer() { return this.containers.modalContainer; }

}

module.exports = new Dom();