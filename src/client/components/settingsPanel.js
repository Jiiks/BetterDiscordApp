"use strict";

const React = require("React");
import { Component } from 'React';
import Checkbox from './checkbox';

class SettingsPanel extends Component {
    
    constructor(props) {
        super(props);
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
                            <div onClick={() => this.switchTab("core")} className={this.state.activeTab === "core" ? "tab-bar-item selected" : "tab-bar-item"}>Core</div>
                            <div onClick={() => this.switchTab("ui")} className={this.state.activeTab === "ui" ? "tab-bar-item selected" : "tab-bar-item"}>UI</div>
                            <div onClick={() => this.switchTab("emotes")} className={this.state.activeTab === "emotes" ? "tab-bar-item selected" : "tab-bar-item"}>Emotes</div>
                            <div onClick={() => this.switchTab("css")} className={this.state.activeTab === "css" ? "tab-bar-item selected" : "tab-bar-item"}>Custom CSS</div>
                            <div onClick={() => this.switchTab("plugins")} className={this.state.activeTab === "plugins" ? "tab-bar-item selected" : "tab-bar-item"}>Plugins</div>
                            <div onClick={() => this.switchTab("themes")} className={this.state.activeTab === "themes" ? "tab-bar-item selected" : "tab-bar-item"}>Themes</div>
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