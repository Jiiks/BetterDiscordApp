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
        return (
            <div className="ui-form-divider margin-top-20 margin-bottom-20" style={{ flex: "1 1 auto" }}></div>
        )
    }

}

export default CUiDivider;