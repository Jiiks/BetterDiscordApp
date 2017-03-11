/**
 * BetterDiscord Plugin Component
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

class CThemeSettings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Not yet implemented</div>
        )
    }

}

class CTheme extends Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            'permissions': false,
            'checked': this.props.Theme.storage.getSetting('enabled'),
            'settingsOpen': false
        }
    }

    render() {
        const { Theme } = this.props;

        return (
            <div className="bd-plugin-container">
                <div className="bd-plugin-main">
                    <div className="bd-plugin-info">
                        <div className="bd-plugin-name">{`${Theme.name} v${Theme.version} by ${Theme.authors.join(", ")}`}</div>
                        <div className="scroller-wrap fade bd-plugin-description">
                            <div className="scroller">
                                {Theme.description}
                            </div>
                        </div>
                    </div>
                    <div className="bd-plugin-controls">
                        <CCheckbox checked={true} onChange={this.onChange} id={Theme.name} text="Enabled" />
                        <div className="btn btn-primary" onClick={() => this.reload(Theme.name)}>Reload</div>
                        <div className="btn btn-primary" onClick={this.showSettings}>Settings</div>
                        <div className="btn btn-primary">Uninstall</div>
                    </div>
                </div>
                <div className={this.state.settingsOpen ? 'bd-plugin-settings open' : 'bd-plugin-settings'}>
                    <div className="scroller-wrap fade">
                        <div className="scroller">
                            <div className="control-group">
                                <label>Background Image</label>
                                <input type="text"></input>
                            </div>
                        </div>
                    </div>
                    <div className="bd-plugin-settings-controls">
                        {Theme.presets && 
                            <div className="control-group">
                                <label>Presets:</label>
                                <div className="select has-value">
                                    <input type="hidden" value="Preset Name"/>
                                    <div className="Select-control">
                                        <div className="Select-placeholder">Preset Name</div>
                                        <div className="Select-input " tabindex="0">&nbsp;</div>
                                        <span className="Select-arrow-zone">
                                        <span className="Select-arrow"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="btn btn-primary" onClick={this.saveSettings}>Save</div>
                    </div>
                </div>
            </div>
        )
    }

    reload(id) {
        let { ThemeManager } = this.props;
        ThemeManager.reloadTheme(id);
    }

    onChange(id, checked) {
        let { ThemeManager, Theme } = this.props;

        if (checked) {
            let success = ThemeManager.enableTheme(id);
            return success;
        } else {
            let success = ThemeManager.disabledTheme(id);
            return success;
        }
    }

    showSettings() {
        this.setState({
            'settingsOpen': !this.state.settingsOpen
        });
    }

    saveSettings() {
        let { ThemeManager } = this.props;
        ThemeManager.disableTheme('Example Theme');
        ThemeManager.themes["Example Theme"].storage.defaultConfig[0].value = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/CH_cow_2_cropped.jpg/250px-CH_cow_2_cropped.jpg";
        ThemeManager.enableTheme('Example Theme');
    }

}

export default CTheme;
