/**
 * BetterDiscord Checkbox Group Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const React = require('../vendor/react');
import { Component } from 'React';
import CCheckbox from './checkbox';

class CCheckboxGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="checkbox-group">
            {this.props.items.map(value => {
                return <CCheckbox checked={value.checked || value.enabled} onChange={this.props.onChange} key={value.key} id={value.key} text={value.text} helptext={value.helptext} />
            })}
            </ul>
            )
    }

}

export default CCheckboxGroup;