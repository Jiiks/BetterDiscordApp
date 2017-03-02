/**
 * BetterDiscord Tooltip Component
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


class CToolTip extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`tooltip tooltip-${this.props.pos || 'top'} tooltip-normal`} style={{ top: `${this.props.top}px`, left: `${this.props.left}px` }}>{this.props.text}</div>
        )
    }

}

export default CToolTip;
