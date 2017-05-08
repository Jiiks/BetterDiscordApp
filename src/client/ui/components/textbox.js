/**
 * BetterDiscord Textbox Component
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

class CTextbox extends Component {

    constructor(props) {
        super(props);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            'value': this.props.initialValue || ""
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.initialValue === this.refs.input.value) return;
        this.refs.input.value = this.props.initialValue || "";
    }

    render() {
        const {title, required, placeholder, maxlength, keydown, initialValue, onChange} = this.props;
        const value = initialValue || "";

        return (
            <div className="ui-form-item margin-bottom-20">
                <h5 className="ui-form-title h5 margin-reset margin-bottom-8">{title}
                    {required &&
                        <span className="is-required"></span>
                    }
                </h5>
                <div className="ui-text-input flex-vertical">
                    <input ref="input" onChange={onChange} type="text" className="input default" placeholder={placeholder || ""} maxLength={maxlength || 999}></input>
                </div>
            </div>
        );
    }

}

export default CTextbox;