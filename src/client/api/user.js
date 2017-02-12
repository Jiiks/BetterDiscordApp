/**
 * BetterDiscord User Object
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/


class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.mobile = data.mobile;
        this.premium = data.premium;
        this.verified = data.verified;
        this.avatar = data.avatar;
        this.avatar_url = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`;
        this.bot = data.bot;
        this.createdAt = data.createdAt;
    }
}

module.exports = User;