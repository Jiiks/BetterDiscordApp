/**
 * BetterDiscord Settings Panel Component
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
import CSwitch from './switch';
import CUiDivider from './uidivider';

class CSettingsPanel extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
		const { settings, title, onChange } = this.props;
		return (
			<div className="content-column default">
				<h2 className="ui-form-title h2 margin-reset margin-bottom-20">{title}</h2>
				{settings.map((setting, index) => {
                    return (
                        <span>
                            <CUiDivider />
                            <CSwitch key={setting.key} id={setting.key} text={setting.text} info={setting.helptext} checked={setting.enabled} disabled={setting.disabled} onChange={(id, checked) => { onChange(id, checked); this.setState({}) }} />
                        </span>
                    )
				})}
			</div>
		);
    }
}

export default CSettingsPanel;