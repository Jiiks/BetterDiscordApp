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
import CScroller from './scroller';
import CSwitch from './switch';

class CPluginCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        let { plugin } = self.props;
        return (
            <div className="bd-plugin-card">
                <div className="bd-plugin-info">
                    <CSwitch text={`${plugin.name} v${plugin.version} by ${plugin.authors.join(", ")}`} info="" checked={false} disabled={false} onChange={() => { }} />
                    <CScroller dark={true} fade={true} children={plugin.description} />
                </div>
                <div className="bd-plugin-controls">
                    <div style={{flex: "1 1 auto"}}></div>
                    <button type="button" className="ui-button filled brand small grow">
                        <div className="ui-button-contents">Settings</div>
                    </button>
                    <button type="button" className="ui-button filled brand small grow">
                        <div className="ui-button-contents">Reload</div>
                    </button>
                    <button type="button" className="ui-button filled brand small grow">
                        <div className="ui-button-contents">Uninstall</div>
                    </button>
                </div>
            </div>
        )
    }

    get renderDescription() {
        return (
            <span>
                {this.props.plugin.description}
            </span>    
        );
    }

}


export default CPluginCard;



