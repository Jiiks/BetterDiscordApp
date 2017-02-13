/**
 * BetterDiscord Vendor Exports
 * Exports jQuery to be used in other classes
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const jquery = require('./jquery');
const moment = require('./moment');
const react = require('./react');
const reactdom = require('./reactdom');

module.exports = {
    jQuery: jquery,
    $: jquery,
    moment: moment,
    React: react,
    ReactDOM: reactdom
}
