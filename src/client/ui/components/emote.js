/**
 * BetterDiscord Emote Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, $ } = require('../../vendor');
import { Component } from 'React';


class CEmote extends Component {

    constructor(props) {
        super(props);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            'favourite': this.props.favourite || false
        }
    }

    render() {
        return (
            <span className="bd-emotewrapper">
                <img className="bd-emote" src={this.props.src} />
                <input onClick={this.favourite} type="button" title="Favourite!" className="bd-emote-fav"/>
            </span>
        )
    }

    favourite() {
        console.log('clicked favourite!');
    }


}

export default CEmote;