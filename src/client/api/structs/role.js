/**
 * BetterDiscord Role Struct
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

class Role {
    constructor(data) {
		if(!data) {
			this.null = true;
			return;
		}
        this.color = data.color;
        this.colorString = data.colorString;
        this.hoist = data.hoist;
        this.id = data.id;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.originalPosition = data.originalPosition;
        this.permissions = data.permissions;
        this.position = data.position;
    }
}

module.exports = Role;