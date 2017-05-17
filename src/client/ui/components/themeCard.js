/**
 * BetterDiscord Theme Component
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
import CContentColumn from './contentcolumn';
import CTextbox from './textbox';
import CUiDivider from './uidivider';
import CUiButton from './uibutton';

class CThemeCard extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.onChange = this.onChange.bind(this);
        this.reload = this.reload.bind(this);
    }

    setInitialState() {
        this.state = {
            'theme': this.props.theme,
            'reload': false,
            'settings': false
        }
    }

    render() {

        const { theme } = this.state;

        return (
            <div className="bd-card">
                <div className="bd-card-info">
                    <CSwitch text={`${theme.name} v${theme.version} by ${theme.authors.join(", ")}`} info="" checked={theme.enabled} disabled={false} onChange={this.onChange}/>
                    <CScroller>{theme.description}</CScroller>
                </div>
                {this.renderControls}
            </div>
        );
    }

    onChange(id, checked) {

        const { theme } = this.state;
        const { ThemeManager } = this.props;

        if (checked) {
            ThemeManager.enableTheme(theme.name);
            this.setState({});
            return;
        }

        ThemeManager.disableTheme(theme.name);
        this.setState({});
    }

    reload() {
        const { theme } = this.state;
        const { ThemeManager, settingsHandler } = this.props;
        settingsHandler(null);

        this.setState({
            'reload': true
        });

        ThemeManager.reloadTheme(theme.name, theme => {
            this.setState({
                'reload': false,
                'theme': theme
            });
        });
    }

    get renderControls() {

        const { theme, reload } = this.state;
        const { settingsHandler } = this.props;

        return (
            <div className="bd-card-controls">
                <div style={{ flex: "1 1 auto" }}></div>
                <CUiButton disabled={reload} onClick={() => { settingsHandler(theme.name); }} tooltip={{ 'text': 'Settings' }}>
                    <CFontAwesome name="cog" />
                </CUiButton>
                <CUiButton disabled={reload} onClick={this.reload} tooltip={{ 'text': 'Reload' }}>
                    <CFontAwesome name={`refresh${reload ? ' fa-spin' : ''}`} />
                </CUiButton>
                <CUiButton disabled={reload} type="red" onClick={() => { console.log("uninstall"); }} tooltip={{ 'text': 'Uninstall' }}>
                    <CFontAwesome name="trash" />
                </CUiButton>
            </div>


        );

    }

}

export default CThemeCard;