/**
 * BetterDiscord ContextMenu Component
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
import CContextMenuCheckBox from './contextMenuCheckbox';

class CContextMenu extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="context-menu" style={{top: this.props.top, left: this.props.left}}>
            {this.props.items.map(value => {
                if(value.type === 'toggle') {
                    return (
                        <div key={value.key} className="item item-toggle">
                            <div className="label">{value.text}</div>
                            <CContextMenuCheckBox />
                        </div>
                    )
                }
                return (
                    <div key={value.key} className="item">
                        <span>{value.text}</span>
                        <div className="hint"></div>
                    </div>
                )
            })}
            </div>
        )
    }

}

export default CContextMenu;