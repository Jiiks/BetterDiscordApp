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

class CPluginSettings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>Not yet implemented</div>
    }

}

class CPlugin extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.reload = this.reload.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    setInitialState() {
        this.state = {
            'permissions': false,
            'checked': this.props.Plugin.internal.storage.getSetting('enabled')
        }
    }

    render() {
        const { Plugin } = this.props;

        return (
            <div className="bd-plugin-container">                                                                               
                <div className="bd-plugin-info">
                    <div className="bd-plugin-name">{`${Plugin.name} v${Plugin.version} by ${Plugin.authors.join(", ")}`}</div>
                    <div className="scroller-wrap fade bd-plugin-description">
                        <div className="scroller">
                            {Plugin.description}
                        </div>
                    </div>
                </div>
                <div className="bd-plugin-controls">
                    <CCheckbox checked={Plugin.internal.storage.getSetting('enabled')} onChange={this.onChange} id={Plugin.name} text="Enabled" />
                    {Plugin.reloadable &&
                        <div className="btn btn-primary" onClick={() => this.reload(Plugin.name)}>Reload</div>
                    }
                    <div className="btn btn-primary">Settings</div>
                    <div className="btn btn-primary">Uninstall</div>
                </div>
                {this.state.settings && 
                    <CPluginSettings />
                }
            </div>
        )
    }

    reload(id) {
        const { PluginManager } = this.props;
        PluginManager.reloadPlugin(id);
    }

    onChange(id, checked) {
        const { PluginManager, Plugin } = this.props;
        
        if (checked) {
            let success = PluginManager.startPlugin(id);
            return success;
        } else {
            let success = PluginManager.stopPlugin(id);
            return success;
        }
    }

}

export default CPlugin;

/*
if (Plugin.permissions.length >= 1 && checked) {
            this.setState({
                'permissions': true,
                'checked': false
            });
            return;
        }
*/

/*

{this.state.permissions &&
    <div className="bd-plugin-permissions">
        <div className="bd-plugin-permissions-inner">
        <h3>{Plugin.name} requests the following permissions</h3>
        <div className="scroller-wrap fade">
            <div className="scroller">
                {Plugin.permissions.map(permission => {
                    return (
                        <div className="bd-plugin-permission">
                            <h2>Send Messages</h2>
                            <span>Send messages on your behalf</span>
                        </div>
                        )
                })}
            </div>
        </div>
        <div className="bd-plugin-permissions-controls">
            <div className="btn btn-primary" style={{marginLeft: "10px"}}>Enable</div>
            <div className="btn btn-primary">Back</div>
        </div>
        </div>
    </div>
}
*/