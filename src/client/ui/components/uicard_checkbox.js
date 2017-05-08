/**
 * BetterDiscord UI Card Checkbox Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const { React, ReactDOM, $ } = require('../../vendor');

import { Component } from 'React';

class CUiCard_Checkbox extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.onClick = this.onClick.bind(this);
    }

    setInitialState() {
        this.state = {
            'checked': this.props.checked || false
        };
    }

    render() {
        const { title } = this.props;
        const { checked } = this.state;
        const checkboxClass = ['ui-checkbox box', checked ? 'checked' : ''];
        const cardClass = ['ui-card ui-card-primary flex-horizontal margin-bottom-8 editable', checked ? 'checked' : ''];
        const cardStyle = checked ? { borderColor: "rgb(114, 137, 218)", backgroundColor: "rgb(114, 137, 218)", padding: "10px" } : {padding: "10px"};
        return (
            <div onClick={this.onClick} className={cardClass.join(' ')} style={cardStyle}>
                <label className="ui-checkbox-wrapper">
                    <input type="checkbox" className="input"></input>
                    <div className={checkboxClass.join(' ')}>
                        <svg className="ui-icon-check-mark" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <g className="ui-icon-fg" fill="none" fillRule="evenodd">
                                <polyline className="ui-icon-fg" strokeWidth="2" points="3.5 9.5 7 13 15 5" style={checked ? { stroke: "rgb(114, 137, 218)" } : {}}></polyline>
                            </g>
                        </svg>
                    </div>
                </label>
                <div className="info">
                    <div className="title">{title}</div>
                </div>
            </div>
        );
    }

    onClick() {
        const { checked } = this.state;
        if (checked) return;
        this.setState({
            'checked': true
        });
    }
}

export default CUiCard_Checkbox;