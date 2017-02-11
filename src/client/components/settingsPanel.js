"use strict";

const React = require("React");
import { Component } from 'React';
import Checkbox from './checkbox';

class SettingsPanel extends Component {
    
    constructor(props) {
        super(props);
        this.tabs = [
            { "id": "core", "text": "Core" },
            { "id": "ui", "text": "UI" },
            { "id": "emotes", "text": "Emotes" },
            { "id": "css", "text": "Custom CSS" },
            { "id": "plugins", "text": "Plugins" },
            { "id": "themes", "text": "Themes" }
        ];
        this.settings = this.settings.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            activeTab: "core"
        };
    }

    render() {
        return (
            <div className="settings-inner">
                <div className="scroller-wrap">
                    <div className="scroller settings-wrapper settings-panel user-settings-text-chat">
                        <div className="tab-bar TOP">
                            {this.tabs.map(value => {
                            return <div key={value.id} onClick={() => this.switchTab(value.id)} className={this.state.activeTab === value.id ? "tab-bar-item selected" : "tab-bar-item"}>{value.text}</div>
                            })}
                        </div>
                        <div>
                            {(this.state.activeTab === "core" || this.state.activeTab === "ui" || this.state.activeTab === "emotes") &&
                            this.settings()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    switchTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    settings() {
        return (
            <div className="control-group">
                <ul className="checkbox-group">
                    {this.props.settings[this.state.activeTab].map(value => {
                        return <Checkbox checked={value.checked} onChange={this.handleChange.bind(this, value.id)} key={value.id} text={value.text} helptext={value.helptext} />
                    })
                    }
                </ul>
            </div>
        );
    }

    handleChange(id, checked) {
        this.props.handleChange(id, checked);
    }

}

export default SettingsPanel;