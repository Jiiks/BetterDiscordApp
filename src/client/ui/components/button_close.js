/**
 * BetterDiscord Close Button Component
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

class CButton_Close extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onClick} className="btn-close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" style={{ width: "18px", height: "18px" }}>
                    <g className="background" fill="none" fill-rule="evenodd">
                        <path d="M0 0h12v12H0"></path>
                        <path className="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
                    </g>
                </svg>
            </div>
        )
    }

}

export default CButton_Close;