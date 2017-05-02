/**
 * BetterDiscord Channel Struct
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

class Channel {
    constructor(data) {
		if(!data) {
			this.null = true;
			return;
		}
        this.application_id = data.application_id;
		this.bitrate = data.bitrate;
		this.guild_id = data.guild_id;
		this.icon = data.icon;
		this.id = data.id;
		this.name = data.name;
		this.ownerId = data.ownerId;
		this.position = data.position;
		this.topic = data.topic;
		this.type = data.type;
		this.userLimit = data.userLimit;
    }
}

module.exports = Channel;