/**
 * BetterDiscord Modal Component
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

class CModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        let { child } = self.props;
        console.log(self);
        let rchild = React.cloneElement(child, { close: self.props.close || self.unmount });

        return (
            <div className="modal bd-modal">
                <div className="modal-inner">{rchild}</div>
            </div>
        );
    }

    unmount() { }

}

export default CModal;