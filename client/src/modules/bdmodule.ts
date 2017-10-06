/**
 * BetterDiscord Module Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

export abstract class BdModule {
    protected abstract bindings(): void;
    public abstract cleanup(): void;
    public abstract get name(): string;
    props: any;

    constructor(_props: any = null) { 
        if (_props) this.initWithProps(_props);
        this.bindings();
    }

    initWithProps(_props: any) {
        this.props = _props;
    }
}