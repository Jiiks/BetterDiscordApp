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
                <CScroller fade={true} dark={true} children={self.renderChanges}/>
            </div>    
        );
    }

    close() {
        console.log("close!");
    }

    renderChanges() {
        return <h3>HI!</h3>;
    }

}

export default CChangeLog;