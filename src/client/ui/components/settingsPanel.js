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
                        return <div key={value.key} onClick={() => {value.onClick ? value.onClick(value.key) : this.switchTab(value.key)}} className={cn}>{value.text}</div>
                        })}
                        {(this.props.topbuttons !== undefined) &&
                        <div style={{position: "absolute", top: "24px", right: "20px"}}>
                        {this.props.topbuttons.map(value => {
                            return <div key={value.key} style={{height: "15px", fontSize: "10px", padding: "3px 6px"}} onClick={value.onClick} className="btn btn-primary">{value.text}</div>
                        })}
                        </div>
                        }
                    </div>
                    {this.props.content[this.state.activeTab]}
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