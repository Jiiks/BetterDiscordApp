/**
 * BetterDiscord React Component Subclass
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

export abstract class ReactComponent<P, S> extends React.Component<P, S> {

    protected constructor(props?: P, context?: any) {
        super(props);
        this.bindings();
        if (props) this.setInitialState(props);
    }

    protected abstract bindings(): void;
    protected abstract setInitialState(props: P): void;
}