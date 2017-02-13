/**
 * BetterDiscord Checkbox Component
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

class CCheckBox extends Component {
    
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            checked: this.props.checked || this.props.enabled
        };
    }

    render() {
        return (
            <span>
                <li>
                    <div onClick={this.onClick} className="checkbox">
                        <div className="checkbox-inner">
                            <input onChange={this.onChange} checked={this.state.checked} type="checkbox"/>
                            <span/>
                        </div>
                        <span>{this.props.text}</span>
                    </div>
                </li>
                {this.props.helptext !== undefined &&
                <li>
                    <div className="help-text">{this.props.helptext}</div>
                </li>
                }
            </span>
        )
    }

    onClick() {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onChange(this.props.id, !this.state.checked);
    }

    onChange() {

    }
}

export default CCheckBox;