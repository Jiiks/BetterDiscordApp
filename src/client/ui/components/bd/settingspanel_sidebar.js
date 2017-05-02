/**
 * BetterDiscord SettingsPanel Sidebar Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, $ } = require('../../../vendor');
const { Settings } = require('../../../modules');
import { Component } from 'React';

import { CTabBarSeparator, CTabBarHeader, CTabBarItem } from '../tabbar';

class CSP_Sidebar extends Component {

    constructor(props) { 
		super(props); 
		let self = this;

		$('.ui-tab-bar-item').on('click', e => {
            self.setState({
                'selectedItem': null
            });
        });

		self.setInitialState();
		self.bindings();
	}

	componentDidMount() {
		
	}

	setInitialState() {
		this.state = {
			'selectedItem': null
		};
	}

	bindings() {
		let self = this;
		self.onClick = self.onClick.bind(self);
	}

	get items() {
		return [
			{ 'text': 'Core', 'id': 'core' },
			{ 'text': 'UI', 'id': 'ui'},
			{ 'text': 'Emotes', 'id': 'emotes' },
			{ 'text': 'CSS Editor', 'id': 'csseditor' },
			{ 'text': 'Plugins', 'id': 'plugins' },
			{ 'text': 'Themes', 'id': 'themes' }
		];
	}

    render() {
		let self = this;
		return (
			<span>
				<CTabBarHeader text="BetterDiscord"/>
				{self.items.map(item => {
					return <CTabBarItem selected={self.state.selectedItem === item.id} text={item.text} key={item.id} onClick={() => { self.onClick(item.id); }}/>
				})}
				<span style={{fontSize: "12px", fontWeight: "600", color: "#72767d", padding: "6px 10px"}}>v{Settings.version}:{Settings.jsversion} by 
                    <a style={{marginLeft: "5px"}} href="https://github.com/Jiiks/" target="_blank">Jiiks</a>
                </span>
				<CTabBarSeparator/>
			</span>
		);
    }

	onClick(id) {
		let self = this;
		
		$('.ui-tab-bar-item').removeClass('selected');
		self.setState({
			'selectedItem': id
		});

		self.props.content.element.changeTab(id);
	}
}

export default CSP_Sidebar;