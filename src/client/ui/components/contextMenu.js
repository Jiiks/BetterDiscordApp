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
import CContextMenuSub from './contextMenuSub';

class CContextMenu extends Component {
    
    constructor(props) {
        super(props);
        this.bindings();
    }

    bindings() {
        this.onChange = this.onChange.bind(this);
    }

    render() {
        let self = this;
        let { items } = self.props;
        let onChange = self.onChange;

        return (
            <div className="context-menu" style={{ top: self.props.top, left: self.props.left}}>
                {items.map(value => {

                    if(value.type === 'toggle') {
                        return (<CContextMenuCheckBox checked={value.enabled} disabled={value.disabled} onChange={onChange} cat={value.cat} id={value.key} key={value.key} text={value.text} />);
                    }
                    if (value.type === 'submenu') {
                        return (
                            <CContextMenuSub onChange={onChange} id={value.key} key={value.key} text={value.text} items={value.items} />
                        )
                    }
                    if (value.type === 'text') {
                        return (
                            <div key={value.key} className="item">
                                <span>{value.text}</span>
                            </div>
                        )
                    }
                    return (
                        <div onClick={value.onClick} key={value.key} className="item">
                            <span>{value.text}</span>
                            <div className="hint"></div>
                        </div>
                    )
                })}
            </div>
        )
    }

    onChange(id, checked, cat) {
        this.props.onChange(id, checked, cat);
    }
}

export default CContextMenu;