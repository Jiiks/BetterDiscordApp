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

const React = require('../vendor/react');
import { Component } from 'React';
import CCheckbox from './checkbox';

class CSettingsPanel extends Component {
    
    constructor(props) {
        super(props);
        this.setInitialState();
        this.switchTab = this.switchTab.bind(this);
    }

    setInitialState() {
        this.state = {
            activeTab: this.props.initialTab
        };
    }

    render() {
        return (
            <div className="scroller-wrap">
                <div className="scroller settings-wrapper settings-panel user-settings-text-chat">
                    <div className="tab-bar TOP">
                        {this.props.tabs.map(value => {
                        let cn = this.state.activeTab === value.key ? "tab-bar-item selected" : "tab-bar-item";
                        return <div key={value.key} onClick={() => this.switchTab(value.key)} className={cn}>{value.text}</div>
                        })}
                    </div>
                    <div className="control-groups">
                        {this.props.content[this.state.activeTab]}
                    </div>
                    {(this.props.footer !== undefined) &&
                    this.props.footer
                    }
                </div>
            </div>
        )
    }

    switchTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

}

export default CSettingsPanel;