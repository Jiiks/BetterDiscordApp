/**
 * BetterDiscord Theme Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

class Theme {
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

    get css() {
        return this.props.css;
    }

    get storage() {
        return this.internal.storage;
    }

    get settings() {
        return this.storage.settings;
    }

    getSetting(id) {
        let setting = this.storage.settings.find(setting => { return setting.id === id; });
        if (setting && setting.value !== undefined) return setting.value;
    }

    get enabled() {
        return this.getSetting("enabled");
    }
}

module.exports = Theme;