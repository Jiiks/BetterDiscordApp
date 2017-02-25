/**
 * BetterDiscord Button Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React } = require('../../vendor');
import { Component } from 'React';

class CButton extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="btn btn-primary">
                {this.props.text}
            </div>
        )
    }

}

export default CButton;