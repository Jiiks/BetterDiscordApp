/**
 * BetterDiscord Plugin Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

class Plugin {

    constructor(props) {
        this.props = props;
    }

    get authors() {
        return this.props.authors;
    }

    get version() {
        return this.props.version;
    }

    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get reloadable() {
        return this.props.reloadable;
    }

    get permissions() {
        return this.props.permissions;
    }

}

module.exports = Plugin;