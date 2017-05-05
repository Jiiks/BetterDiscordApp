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
import CFontAwesome from './fontAwesome';
import CScroller from './scroller';
import CSwitch from './switch';
import CToolTip from './tooltip';

class CPluginCard extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.tooltip = this.tooltip.bind(this);
    }

    setInitialState() {
        this.state = {
            'settings': false,
            'tooltip': null
        }
    }

    render() {
        let self = this;
        let { plugin } = self.props;
        let { tooltip, tooltipposition } = self.state;
        return (
            <div className="bd-plugin-card">
                <div className="bd-plugin-info">
                    <CSwitch text={`${plugin.name} v${plugin.version} by ${plugin.authors.join(", ")}`} info="" checked={false} disabled={false} onChange={() => { }} />
                    <CScroller dark={true} fade={true} children={plugin.description} />
                </div>
                <div className="bd-plugin-controls">
                    <div style={{ flex: "1 1 auto" }}></div>
                    {tooltip === 'settings' &&
                        <span style={{position: "relative", top: "-20px"}}>
                            <CToolTip pos="top" text="Settings" />
                        </span>
                    }
                    <button onMouseEnter={(e) => { self.tooltip(e, 'settings'); }} onMouseLeave={(e) => { self.tooltip(e, null); }} type="button" className="ui-button filled brand small grow">
                        <CFontAwesome name="cog"/>
                        <div className="ui-button-contents"></div>
                    </button>
                    {tooltip === 'reload' &&
                        <span style={{ position: "relative", top: "-20px", left: "3px" }}>
                            <CToolTip pos="top" text="Reload" />
                        </span>
                    }
                    <button onMouseEnter={(e) => { self.tooltip(e, 'reload'); }} onMouseLeave={(e) => { self.tooltip(e, null); }} type="button" className="ui-button filled brand small grow">
                        <CFontAwesome name="refresh" />
                        <div className="ui-button-contents"></div>
                    </button>
                    {tooltip === 'uninstall' &&
                        <span style={{ position: "relative", top: "-20px", left: "-3px" }}>
                            <CToolTip pos="top" text="Uninstall" />
                        </span>
                    }
                    <button onMouseEnter={(e) => { self.tooltip(e, 'uninstall'); }} onMouseLeave={(e) => { self.tooltip(e, null); }} type="button" className="ui-button filled red small grow">
                        <CFontAwesome name="close" />
                        <div className="ui-button-contents"></div>
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

    tooltip(e, id) {
        this.setState({
            'tooltip': id
        });
    }

}


export default CPluginCard;



