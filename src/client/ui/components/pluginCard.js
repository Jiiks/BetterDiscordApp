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
import CContentColumn from './contentcolumn';
import CTextbox from './textbox';
import CUiDivider from './uidivider';

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
            'tooltip': null
        }
    }

    render() {
        let self = this;
        let { plugin, settings, settingsHandler, verified } = self.props;
        let { tooltip } = self.state;

        return (
            <div className="bd-plugin-card" style={verified ? {} : { border: "1px solid #f04747", boxShadow: "0 0 6px rgba(240,71,71,0.3)"}}>
                <div className="bd-plugin-info">
                    <CSwitch text={`${plugin.name} v${plugin.version} by ${plugin.authors.join(", ")}`} info="" checked={false} disabled={false} onChange={() => { }} />
                    <CScroller dark={true} fade={true} children={plugin.description} />
                </div>
                <div className="bd-plugin-controls">
                    {!verified && 
                        <div className="title" style={{ color: "rgb(240, 71, 71)", fontSize: "14px", lineHeight: "32px", fontWeight: "700" }}>Unverified plugin. Use at your own risk!</div>
                    }
                    <div style={{ flex: "1 1 auto" }}></div>
                    {tooltip === 'settings' &&
                        <span style={{position: "relative", top: "-20px"}}>
                            <CToolTip pos="top" text="Settings" />
                        </span>
                    }
                    <button onClick={() => { settingsHandler(plugin.name) }} onMouseEnter={(e) => { self.tooltip(e, 'settings'); }} onMouseLeave={(e) => { self.tooltip(e, null); }} type="button" className="ui-button filled brand small grow">
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
                {self.renderSettings}
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

    get renderSettings() {
        let self = this;
        
        let { plugin, settings } = self.props;

        let _settings = null;

        let override = plugin.settingsPanel;
        if (React.isValidElement(override)) {
            _settings = override;
        } else {
            _settings = plugin.settings.map(setting => {
                if (setting.type === "bool") return <CSwitch key={setting.id} text={setting.text} info={setting.description} checked={setting.value} />;
                return null;
            });
        }

        let column = <CContentColumn style={{ padding: "0", minHeight: "0" }} children={_settings} />;

        return (
            <div className="bd-plugin-settings" style={{ maxHeight: settings ? "200px" : "0" }}>
                <CScroller dark={true} fade={true} children={column} />

            </div>);
    }

    tooltip(e, id) {
        this.setState({
            'tooltip': id
        });
    }

}


export default CPluginCard;



