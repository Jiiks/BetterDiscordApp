"use strict";

const React = require("React");
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
            activeTab: "core"
        };
    }

    render() {
        return (
            <div className="scroller-wrap">
                <div className="scroller settings-wrapper settings-panel user-settings-text-chat">
                    <div className="tab-bar TOP">
                        {this.props.tabs.map(value => {
                        return <div key={value.key} onClick={() => this.switchTab(value.key)} className={this.state.activeTab === value.key ? "tab-bar-item selected" : "tab-bar-item"}>{value.text}</div>
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


    handleChange(key, checked) {
        this.props.handleChange(key, checked);
    }

}

export default CSettingsPanel;