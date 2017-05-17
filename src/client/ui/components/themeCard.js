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
import CScroller from './scroller';
import CSwitch from './switch';

class CThemeCard extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.onChange = this.onChange.bind(this);
    }

    setInitialState() {
        this.state = {
            'theme': this.props.theme,
            'reload': false,
            'settings': false
        }
    }

    render() {

        const { theme } = this.props;

        return (
            <div className="bd-card">
                <div className="bd-card-info">
                    <CSwitch text={`${theme.name} v${theme.version} by ${theme.authors.join(", ")}`} info="" checked={theme.enabled} disabled={false} onChange={this.onChange}/>
                    <CScroller>{theme.description}</CScroller>
                </div>
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

}

export default CThemeCard;