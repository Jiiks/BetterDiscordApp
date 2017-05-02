/**
 * BetterDiscord Api Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

const { Message, Channel, User, Guild, Role } = require('../api/structs');
const DeepReflection = require('./reflection_deep');
const { $ } = require('../vendor');

class Api {

	static get currentGuild() {
		let guild = new Guild(DeepReflection.scan(".title-wrap", "guild"));
		return guild.null ? null : guild;
	}

	static get currentChannel() {
		let channel = new Channel(DeepReflection.scan(".title-wrap", "channel"));
		return channel.null ? null : channel;
	}

}

module.exports = Api;