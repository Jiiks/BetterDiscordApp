/**
 * BetterDiscord Backdrop Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, ReactDOM } = require('../../vendor');
import { Component } from 'React';

class CBackdrop extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        return (
            <div onClick={self.props.onClick} className="callout-backdrop bd-backdrop"></div>
        );
    }
}

export default CBackdrop;