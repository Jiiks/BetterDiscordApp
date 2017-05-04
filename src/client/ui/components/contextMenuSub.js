/**
 * BetterDiscord ContextMenu Sub Menu Component
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
import CContextMenu from './contextMenu';


class CContextMenuSub extends Component {

    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.setInitialState();
    }

    componentDidMount() {
        let root = $(this.refs.menu);
        root.find('.context-menu').css({ 'top': `${root.parent().position().top}px`, 'left': `${root.parent().position().left + root.width() + 20}px` });
    }

    componentDidUpdate() {
        let root = $(this.refs.menu);
        root.find('.context-menu').css({ 'top': `${root.parent().position().top}px`, 'left': `${root.parent().position().left + root.width() + 20}px` });
    }

    setInitialState() {
        this.state = {
            'visible': false
        }
    }

    render() {
        return (
            <div ref='menu' className="item item-subMenu" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <span>{this.props.text}</span>
                {this.state.visible &&
                    <CContextMenu onChange={this.props.onChange} style={{ display: 'none' }} items={this.props.items} />
                }
            </div>
        )
    }

    onMouseEnter() {
        this.setState({
            'visible': true
        });
    }

    onMouseLeave() {
        this.setState({
            'visible': false
        });
    }

}

export default CContextMenuSub;
