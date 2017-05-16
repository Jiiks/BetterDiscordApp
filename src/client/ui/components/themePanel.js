/**
 * BetterDiscord Theme Panel Component
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
import CThemeCard from './themeCard';

class CThemePanel extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.settingsHandler = this.settingsHandler.bind(this);
    }

    setInitialState() {
        this.state = {
            'settingsOpen': null
        };
    }

    render() {
        const { themes, ThemeManager } = this.props;

        return (
            <div className="content-column default">
                <h2 className="ui-form-title h2 margin-reset margin-bottom-20">Themes</h2>
                <div className="control-groups bd-themes">
                    <div className="tab-bar TOP" style={{ borderBottom: "none" }}>
                        <div className="tab-bar-item selected">Installed
                            <div className="bd-tab-refresh"></div>
                        </div>
                        <div className="tab-bar-item">Online
                            <div className="bd-tab-refresh"></div>
                        </div>
                    </div>
                    {themes.map(theme => {
                        return <CThemeCard ThemeManager={ThemeManager} settingsHandler={this.settingsHandler} settings={theme.name === this.state.settingsOpen} key={theme.name} theme={theme} />
                    })}
                </div>
            </div>    
        );
    }

    settingsHandler(id) {
        console.log(id);
    }

}

export default CThemePanel;