/**
 * BetterDiscord Plugin List Component
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

import CPlugin from './plugin';

class CPluginList extends Component {

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
                'plugins': this.props.PluginManager.plugins
            },
            refreshingOnline: false
        };
    }

    render() {

        const localPlugins = this.state.local.plugins;

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

                {Object.keys(localPlugins).map((key, index, arr) => {
                    return <CPlugin PluginManager={this.props.PluginManager} key={index} Plugin={localPlugins[key]} />
                })}
            </div>
        )
    }

    refreshLocal() {
        let self = this;
        this.setState({
            'local': {
                'refreshing': true,
                'plugins': this.state.local.plugins
            }
        });

        let { PluginManager } = self.props;

        PluginManager.loadPlugins(plugins => {
            self.setState({
                'local': {
                    'refreshing': false,
                    'plugins': plugins
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

export default CPluginList;