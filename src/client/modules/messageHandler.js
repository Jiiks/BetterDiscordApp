/**
 * BetterDiscord Message Handler Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const Cache = require('./cache');
const Events = require('./events');
const Reflection = require('./reflection');
const { Message } = require('../api/structs');
const { $, moment } = require('../vendor');

class MessageHandler {

    constructor() {
        this.messageCache = new Cache();
        Events.on('mutation', (mutation) => this.handler(mutation));
    }

    handler(mutation) {

        var self = this;
        //Check that mutation is a message
        if(mutation.target.classList.length !== 2) return;
        if(mutation.target.classList[1] !== "messages" && mutation.addedNodes.length) return;

        //We grab the last message instead of checking all of them for better performance 
        let lastMessage = $(".comment").last()[0];
        Reflection.getMessageProps(lastMessage, msg => {
            if(msg === null) return;

            let { id } = msg.message;

            if(self.messageCache.cached(id)) return;

            let message = new Message(msg);
            if(moment.duration(Date.now() - new Date(message.timestamp))._milliseconds >= 3000) return;

            self.messageCache.add(id, message);

            Events.emit('new-message', message);    
        });

    }

}

module.exports = new MessageHandler();