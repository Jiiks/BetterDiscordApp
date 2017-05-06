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

    render() {
        let {title, required, placeholder, maxlength} = this.props;
        let {value} = this.state;

        return (
            <div className="ui-form-item margin-bottom-20">
                <h5 className="ui-form-title h5 margin-reset margin-bottom-8">{title}
                    {required &&
                        <span className="is-required"></span>
                    }
                </h5>
                <div className="ui-text-input flex-vertical">
                    <input type="text" className="input default" value={value} placeholder={placeholder || ""} maxLength={maxlength || 999}></input>
                </div>
            </div>
        );
    }

}

export default CTextbox;