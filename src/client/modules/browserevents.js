/**
 * BetterDiscord Browser Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const { $ } = require('../vendor');
const { Guild, Channel } = require('../api/structs');
const Events = require('./events');
const DeepReflection = require('./reflection_deep');
const Api = require('./api');
const Logger = require('./logger');

class BrowserEvents {

    constructor() {
        let self = this;

		self.page = {
			'previous': {
				'guild': Api.currentGuild,
				'channel': Api.currentChannel
			},
			'current': this.prev
		};

        Events.on('browser-event', e => {
            let { type, url } = e;
            switch (type) {
                case 'did-navigate-in-page':
                    self.didNavigateInPage(url);
					break;
            }
        });
    }

	didNavigateInPage(url) {
		let self = this;

		self.page.current = {
			'guild': Api.currentGuild,
			'channel': Api.currentChannel
		};

		if(!self.page.previous.guild) {
			Logger.debug("BrowserEvents", "Server Switch");
			Events.emit('server-switch', self.page);
			self.page.previous = self.page.current;
			return;
		}

		if(self.page.previous.guild.id !== self.page.current.guild.id) {
			Logger.debug("BrowserEvents", "Server Switch");
			Events.emit('server-switch', self.page);
			self.page.previous = self.page.current;
			return;
		}

		if(!self.page.previous.channel) {
			Logger.debug("BrowserEvents", "Channel Switch");
			Events.emit('server-switch', self.page);
			self.page.previous = self.page.current;
			return;
		}

		if(self.page.previous.channel.id !== self.page.current.channel.id) {
			Logger.debug("BrowserEvents", "Channel Switch");
			Events.emit('server-switch', self.page);
			self.page.previous = self.page.current;
			return;
		}
	}
    
    parseUrl(url) {
        let splice = url.split('/').splice(4);
        return {
            'server': splice[0],
            'channel': splice[1]
        };
    }

}

module.exports = new BrowserEvents();