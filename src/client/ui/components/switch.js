/**
 * BetterDiscord Switch Component
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

class CSwitch extends Component {

    constructor(props) {
        super(props);
		let self = this;

		self.bindings();
		self.setInitialState();
    }

	bindings() {
		let self = this;
		self.onChange = self.onChange.bind(self);
	}

	setInitialState() {
		this.state = {
			'checked': this.props.checked
		};
	}

    render() {
		let self = this;
        let { text, info, disabled } = self.props;
        let { checked } = self.state;
        let labelClassName = ['ui-switch-wrapper', 'ui-flex-child', disabled ? 'disabled' : ''];
		return (
            <div className="ui-flex flex-vertical flex-justify-start flex-align-stretch flex-nowrap ui-switch-item">
                <div className="ui-flex flex-horizontal flex-justify-start flex-align-stretch flex-nowrap">
                    <h3 className="ui-form-title h3 margin-reset margin-reset ui-flex-child">{text}</h3>
                    <label className={labelClassName.join(' ')} style={{ flex: '0 0 auto' }}>
                        <input className="ui-switch-checkbox" type="checkbox" checked={checked} onChange={self.onChange}></input>
                        <div className="ui-switch"></div>
                    </label>
                </div>
                <div className="ui-form-text style-description margin-top-4" style={{flex: '1 1 auto'}}>{info}</div>
            </div>
		);
    }

	onChange() {
        let self = this;
        if (self.props.disabled) return;
		self.props.onChange(self.props.id, !self.state.checked);
		self.setState({
			'checked': !self.state.checked
		});
	}

}

export default CSwitch;