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
    }

    render() {

        const { theme } = this.props;

        return (
            <div className="bd-card">
                <div className="bd-card-info">
                    <CSwitch text={`${theme.name} v${theme.version} by ${theme.authors.join(", ")}`} info="" checked={false} disabled={false} onChange={() => { }}/>
                    <CScroller>{theme.description}</CScroller>
                </div>
            </div>
        );
    }

}

export default CThemeCard;