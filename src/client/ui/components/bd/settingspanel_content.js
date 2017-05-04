/**
 * BetterDiscord SettingsPanel Content Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, $, ReactDOM } = require('../../../vendor');
const { Settings } = require('../../../modules');
import { Component } from 'React';

import { CTabBarSeparator, CTabBarHeader, CTabBarItem } from '../tabbar';

import { CContentColumn, CScroller, CSettingsPanel, CSwitch, CButton_Close } from '../';

class CSP_Content extends Component {

    constructor(props) { 
		super(props); 
		let self = this;
		self.setInitialState();
		self.bindings();
	}

	setInitialState() {
		this.state = {
			'selectedPanel': null
		};
	}

	bindings() {
		let self = this;
		self.changeTab = self.changeTab.bind(self);
		self.onChange = self.onChange.bind(self);
	}

	componentDidMount() {
        window.foob = this;
	}

    changeTab(id) {

        if (id === 'csseditor') return;
        let self = this;

        if (!id) {
            self.setState({
                'selectedPanel': null
            });
            ReactDOM.findDOMNode(self).parentNode.style.display = "none";
            $(".content-region").first().show();
            return;
        }

        ReactDOM.findDOMNode(self).parentNode.style.display = "";
        $(".content-region").first().hide()

		self.setState({
			'selectedPanel': id
		});
	}

    render() {
		let self = this;
        let { selectedPanel } = self.state;

        if (!selectedPanel) return <span></span>;

		switch(selectedPanel) {
			case 'core':
				return self.renderCorePanel;
			case 'emotes':
				return self.renderEmotesPanel;
			case 'ui':
				return self.renderUiPanel;
			case 'plugins':
				return self.renderPluginsPanel;
			case 'themes':
				return self.renderThemesPanel;
		}
    }

	onChange(cat, id, checked) {
		switch(cat) {
			case "core":
				Settings.setCoreSetting(id, checked);
			break;
			case "emotes":
				Settings.setEmoteSetting(id, checked);
			break;
			case "ui":
				Settings.setUiSetting(id, checked);
			break;
		}
	}

    get tools() {
        return (
            <div key="tools" className="tools">
                <CButton_Close onClick={() => { $(".btn-close").first().click(); }} />
                <div className="esc-text">ESC</div>
            </div>   
        );
    }

	get renderCorePanel() {
        return <CScroller fade={true} dark={true} children={[<CSettingsPanel key="cs" title="Core Settings" settings={Settings.getCoreSettings} onChange={(id, checked) => this.onChange("core", id, checked)} />, this.tools]}/>;
	}
	get renderEmotesPanel() {
        return <CScroller fade={true} dark={true} children={[<CSettingsPanel key="es" title="Emote Settings" settings={Settings.getEmoteSettings} onChange={(id, checked) => this.onChange("emotes", id, checked)} />, this.tools]}/>;
	}
	get renderUiPanel() {
        return <CScroller fade={true} dark={true} children={[<CSettingsPanel key="us" title="UI Settings" settings={Settings.getUiSettings} onChange={(id, checked) => this.onChange("ui", id, checked)} />, this.tools]}/>;
	}
	get renderPluginsPanel() {
		return <span>Plugins</span>;
	}
	get renderThemesPanel() {
		return <span>Themes</span>;
	}
}

export default CSP_Content;