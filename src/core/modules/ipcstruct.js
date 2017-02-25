/**
 * BetterDiscord IPC Message Structure
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

class IpcStruct {

    constructor(event, props) {
        this.event = event;
        this.msg = props;
    }

    get id() {
        return this.msg.id;
    }

    get type() {
        return this.msg.type;
    }

    get action() {
        return this.msg.action;
    }

    get params() {
        return this.msg.params;
    }

    param(name) {
        return this.msg.params[name];
    }

}

module.exports = IpcStruct;