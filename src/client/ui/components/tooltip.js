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
        let self = this;
        let { pos, top, left, text } = self.props;
        return (
            <div className={`tooltip tooltip-${pos || 'top'} tooltip-normal`} style={{ top: `${top}px`, left: `${left}px` }}>{text}</div>
        )
    }

}

export default CToolTip;
