/**
 * BetterDiscord Theme List Component
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

import CTheme from './theme';

class CThemeList extends Component {

    constructor(props) {
        super(props);
        this.setInitialState();
        this.refreshLocal = this.refreshLocal.bind(this);
        this.refreshOnline = this.refreshOnline.bind(this);
    }

    setInitialState() {
        this.state = {
            'local': {
                'refreshing': false,
                'themes': this.props.ThemeManager.themes
            },
            refreshingOnline: false
        };
    }

    render() {

        const localThemes = this.state.local.themes;

        return (
            <div className="control-groups bd-plugins">
                <div className="tab-bar TOP">
                    <div className="tab-bar-item selected">Installed
                        <div className={this.state.local.refreshing ? "bd-tab-refresh animate" : "bd-tab-refresh"} onClick={this.refreshLocal}></div>
                    </div>
                    <div className="tab-bar-item">Online
                        <div className="bd-tab-refresh" onClick={this.refreshOnline}></div>
                    </div>
                </div>

                {Object.keys(localThemes).map((key, index, arr) => {
                    return <CTheme ThemeManager={this.props.ThemeManager} key={index} Theme={localThemes[key]} />
                })}
            </div>
        )
    }

    refreshLocal() {
        let self = this;
        this.setState({
            'local': {
                'refreshing': true,
                'themes': this.state.local.themes
            }
        });

        let { ThemeManager } = self.props;

        ThemeManager.loadThemes(themes => {
            self.setState({
                'local': {
                    'refreshing': false,
                    'themes': themes
                }
            });
        });
    }

    refreshOnline() {
        this.setState({
            refreshingOnline: true
        });
    }

}

export default CThemeList;