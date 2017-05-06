/**
 * BetterDiscord UI Divider Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const { React, $ } = require('../../vendor');
import { Component } from 'React';


class CUiDivider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let margin = this.props.margin || 10;
        return (
            <div className="ui-form-divider" style={{ flex: "1 1 auto", marginTop: `${margin}px`, marginBottom: `${margin}px`}}></div>
        )
    }

}

export default CUiDivider;