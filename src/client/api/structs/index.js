/**
 * BetterDiscord Api Structs Export
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const Channel = require('./channel');
const Guild = require('./guild');
const Message = require('./message');
const Role = require('./role');
const User = require('./user');

module.exports = {
    Channel: Channel,
    Guild: Guild,
    Message: Message,
    Role: Role,
    User: User
}