/**
 * BetterDiscord Changelog Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, ReactDOM } = require('../../../vendor');
import { Component } from 'React';
import { CScroller } from '../';

class CChangeLog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        return (
            <div className="markdown-modal change-log">
                <div className="markdown-modal-header">
                    <strong>What's new in BetterDiscord</strong>(v0.30:DP2)
                    <button onClick={self.props.close} className="markdown-modal-close"></button>
                </div>
                <CScroller fade={true} dark={true} children={self.renderChanges} />
                <div className="markdown-modal-footer"></div>
            </div>    
        );
    }

    close() {
        console.log("close!");
    }

    get renderChanges() {
        return (
            <span>
                <h1 className="changelog-added changelog-margin-top">New</h1>
                <ul>
                    <li>New Thing</li>
                    <li>Another new thing</li>
                </ul>
                <h1 className="changelog-fixed changelog-margin-top">Fixed</h1>
                <ul>
                    <li>Fixed thing</li>
                    <li>Another fixed thing</li>
                </ul>
            </span>
        );
    }

}

export default CChangeLog;