/**
 * BetterDiscord Guild Struct
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const Role = require('./role');

class Guild {

    constructor(data) {
		if(!data) {
			this.null = true;
			return;
		}
		this.acronym = data.acronym;
        this.afkChannelId = data.afkChannelId;
        this.afkTimeout = data.afkTimeout;
		this.application_id = data.application_id;
		this.defaultMessageNotifications = data.defaultMessageNotifications;
		this.explicitContentFilter = data.explicitContentFilter;
        this.icon = data.icon;
        this.id = data.id;
        this.joinedAt = data.joinedAt;
        this.large = data.large;
		this.mfaLevel = data.mfaLevel;
        this.name = data.name;
        this.ownerId = data.ownerId;
        this.region = data.region;
        this.icon_url = `https://cdn.discordapp.com/icons/${this.id}/${this.icon}`;
		this.splash = data.splash;
		this.verificationLevel = data.verificationLevel;

        this.roles = Object.values(data.roles).map(value => {
            return new Role(value);
        });
    }
}

module.exports = Guild;