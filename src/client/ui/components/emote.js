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
import CToolTip from './tooltip';


class CEmote extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.favourite = this.favourite.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            'hover': false,
            'favourite': this.props.favourite || false,
            'loaded': false
        }
    }

    render() {
        return (
            <span className={(this.state.favourite ? "bd-emotewrapper fav" : "bd-emotewrapper") + (this.state.loaded ? '' : ' bd-emotewrapper-loading') } onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {this.state.hover && 
                    <CToolTip top={-40} left={-17} pos="top" text={this.props.name} />
                }
                {!this.state.loaded &&
                    <div className="bd-emote bd-emote-placeholder">
                        <div className="bd-emote-spinner-cube">
                            <div className="bd-emote-spinner-cube1" />
                            <div className="bd-emote-spinner-cube2"/>
                        </div>
                    </div>
                }
                <img alt={this.props.name} className="bd-emote" src={this.props.src} onLoad={this.onLoad}/>
                <input onClick={this.favourite} type="button" className="bd-emote-fav" />
            </span>
        )
    }

    onLoad() {
        this.setState({
            'loaded': true
        });
    }

    favourite() {
        this.setState({
            'favourite': !this.state.favourite
        });
    }

    onMouseOver() {
        this.setState({
            'hover': true
        });
    }

    onMouseOut() {
        this.setState({
            'hover': false
        });
    }


}

export default CEmote;