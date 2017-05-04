/**
 * BetterDiscord ContextMenu Checkbox Component
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

class CContextMenuCheckBox extends Component {
    
    constructor(props) {
        super(props);
        this.setInitialState();
        this.bindings();
    }

    setInitialState() {
        this.state = {
            'checked': this.props.checked || this.props.enabled || false,
            'disabled': this.props.disabled || false
        };
    }

    bindings() {
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let { text } = this.props;
        let { checked } = this.state;
        return (
            <div onClick={this.onClick} className="item item-toggle">
                <div className="label">{text}</div>
                <div className="checkbox">
                    <div className="checkbox-inner">
                        <input onChange={() => { }} checked={checked} type="checkbox"></input>
                        <span/>
                    </div>
                    <span/>
                </div>
            </div>
        )
    }

    onClick() {
        let checked = !this.state.checked;
        this.props.onChange(this.props.id, checked, this.props.cat);
        this.setState({
            'checked': checked
        });
    }

}

export default CContextMenuCheckBox;