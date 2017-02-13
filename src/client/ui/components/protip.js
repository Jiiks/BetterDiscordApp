/**
 * BetterDiscord Protip Component
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
import CLink from './link';

class CProTip extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-bd="protip" className="protip">
                <div className="tip">
                    {this.props.title}
                    {(this.props.link !== undefined) &&
                    <CLink id={this.props.link.key} text={this.props.link.text} onClick={this.props.link.onClick} />
                    } 
                    {(this.props.links !== undefined) &&
                    this.props.links.map((value, index, array) => {
                        return (
                            <span key={value.key}>
                                <CLink style={{float: "right"}} id={value.key} text={value.text} onClick={value.onClick}/>
                                {(index !== array.length -1) &&
                                <span style={{float: "right"}}>-</span>
                                }
                            </span>
                            )
                    })
                    }
                </div>
            </div>
            )
    }

}

export default CProTip;