/**
 * BetterDiscord Api
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

const { Message, Channel, User, Guild, Role } = require('./api/structs');
const { Reflection } = require('./modules');
const { $ } = require('./vendor');


class Api {

    constructor() {
        this.structs = {
            Message: Message,
            Channel: Channel,
            User: User,
            Guild: Guild,
            Role: Role
        }
    }

    getCurrentGuild() {
        let selectedGuild = $(".guild.selected");
        if(!selectedGuild) return null;
        let instance = Reflection.getReactInternalInstance(selectedGuild.last()[0]);
        if(!instance) return null;

        try {
            let props = Reflection.getProps(instance._currentElement);
            let children = Reflection.getChildren(props);

            let d = children[0].props.children.props.guild;

            return new Guild(d);

        }catch(err) {
            console.log(err);
            return null;
        }
    }



}

module.exports = new Api();