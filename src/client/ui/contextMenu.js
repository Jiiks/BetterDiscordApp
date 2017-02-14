/**
 * BetterDiscord Context Menu
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Events, Renderer, CssEditor } = require('../modules');
const { React, ReactDOM, $ } = require('../vendor');
import { CContextMenu } from './components';

class ContextMenu {

    constructor() {
        let self = this;
        Events.on('context-menu', contextMenu => {
            $(".context-menu .item").on("mouseover", () => {
                $("[data-bd=context-menu-sub]").remove();
            });
            self.button = $("<div/>", { 
                class: "item item-subMenu",
                'data-bd': "context-menu",
                hover: () => self.render()
            }).append($("<span/>", { 
                text: "BetterDiscord" 
            }));
            contextMenu.append(self.button);
        });
    }

    render() {
        let self = this;
        let $cmpos = $(".context-menu").first().position();
        let {top, left} = self.button.position();

        let items = [
            {
                "key": "voice-disconnect",
                "text": "Voice Disconnect",
                "type": "toggle"
            },
            {
                "key": "developer-mode",
                "text": "Developer Mode",
                "type": "toggle"
            },
            {
                "key": "css-editor",
                "text": "CSS Editor",
                "type": "button",
                "onClick": () => { CssEditor.open() }
            }
        ];

        let contexMenu = <CContextMenu top={`${top + $cmpos.top}px`} left={`${left + $cmpos.left}px`} items={items} />;
        let subMenu = Renderer.append("[data-bd=context-menu]", $("<div/>", { "data-bd": "context-menu-sub" }), contexMenu);

    }

}

module.exports = new ContextMenu();
