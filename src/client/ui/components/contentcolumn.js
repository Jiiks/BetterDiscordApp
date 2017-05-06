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
        let { title, children } = this.props;
        let style = this.props.style || {};
        return (
            <div style={style} className="content-column default">
                {title &&
                    <h2 className="ui-form-title h2 margin-reset margin-bottom-20">{title}</h2>
                }
				{children}
			</div>
		);
    }

}

export default CContentColumn;