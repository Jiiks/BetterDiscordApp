/**
 * BetterDiscord Content Column Component
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

class CContentColumn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div className="content-column default">
				<h2 className="ui-form-title h2 margin-reset margin-bottom-20">{this.props.title}</h2>
				{this.props.children}
			</div>
		);
    }

}

export default CContentColumn;