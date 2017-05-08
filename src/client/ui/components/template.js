/**
 * BetterDiscord Template Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

/*Constants*/
const { React } = require('../../vendor');

/*Imports*/
import { Component } from 'React';

/*Component*/
class Template extends Component {

    constructor(props) {
        super(props);

		this.bindings();
        this.setInitialState();
    }

	bindings() {
	}

	setInitialState() {
		this.state = {};
	}

    render() {
        
    }

}

/*Export*/
export default Template;