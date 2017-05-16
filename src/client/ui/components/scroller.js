/**
 * BetterDiscord Scroller Component
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

class CScroller extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const fade = this.props.fade === undefined ? true : this.props.fade;
        const dark = this.props.dark === undefined ? true : this.props.fade;

		return (
            <div className={`scroller-wrap${fade ? ' fade' : ''} ${dark ? ' dark' : ''}`}>
				<div ref="scroller" className="scroller">
					{this.props.children}
				</div>
			</div>
		);
    }

}

export default CScroller;