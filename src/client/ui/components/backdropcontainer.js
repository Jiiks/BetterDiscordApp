/**
 * BetterDiscord Backdrop Container Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, ReactDOM } = require('../../vendor');
import { Component } from 'React';
import CBackdrop from './backdrop';

class CBackdropContainer extends Component {

    constructor(props) {
        super(props);
        this.bindings();
    }

    bindings() {
        this.unmount = this.unmount.bind(this);
    }

    componentDidMount() {
        let self = this;
        setTimeout(() => {
            self.refs.root.className = "bd-backdrop-container visible";
        }, 100);
    }

    render() {
        let self = this;
        let { child } = self.props;

        let rchild = React.cloneElement(child, { close: self.unmount });

        return (
            <div ref="root" className="bd-backdrop-container">
                <CBackdrop onClick={self.unmount} />
                <span className="bd-backdrop-container-content">
                    {rchild}
                </span>
            </div>
        );
    }

    unmount() {
        let self = this;
        self.refs.root.className = "bd-backdrop-container";
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
        }, 300);
    }
    
}

export default CBackdropContainer;