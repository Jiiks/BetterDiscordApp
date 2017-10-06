/**
 * BetterDiscord Material Icon Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from "react";

export interface IIcon {
    icon: string
}

export class CMaterialIcon extends React.Component<IIcon, IIcon> {

    constructor(props: IIcon) {
        super(props);
    }

    render() {
        const { icon } = this.props;
        return (
            <i className="material-icons">{icon}</i>
        );
    }
}