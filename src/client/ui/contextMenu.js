/**
 * BetterDiscord Context Menu
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Events, Renderer, CssEditor, Settings } = require('../modules');
const { React, ReactDOM, $ } = require('../vendor');
import { CContextMenu } from './components';

class ContextMenu {

    constructor() {
        let self = this;
        self.render = self.render.bind(self);
        Events.on('context-menu', contextMenu => {
            $(".context-menu .item").on("mouseover", () => {
                $("[data-bd=context-menu-sub]").remove();
            });
            self.button = $("<div/>", {
                class: "item item-subMenu",
                'data-bd': "context-menu",
                hover: () => self.render()
            }).append($("<span/>", {
                text: "Better",
                css: {
                    'color': '#3E82E5'
                }
            }).append($("<span/>", {
                text: "Discord",
                css: {
                    'color': '#FFF'
                }
            })));
            contextMenu.prepend(self.button);
        });
    }

    render() {
        let self = this;
        let $cmpos = $(".context-menu").first().position();
        let {top, left} = self.button.position();

        let items = [
            {
                "key": "core",
                "text": "Core",
                "type": "submenu",
                "items": Settings.getCoreSettings.reduce((arr, value) => { value.type = "toggle"; value.cat = "core"; arr.push(value); return arr; }, [])
            },
            {
                "key": "ui",
                "text": "UI",
                "type": "submenu",
                "items": Settings.getUiSettings.reduce((arr, value) => { value.type = "toggle"; value.cat = "ui"; arr.push(value); return arr; }, [])
            },
            {
                "key": "emotes",
                "text": "Emotes",
                "type": "submenu",
                "items": Settings.getEmoteSettings.reduce((arr, value) => { value.type = "toggle"; value.cat = "emotes"; arr.push(value); return arr; }, [])
            },
            {
                "key": "plugins",
                "text": "Plugins",
                "type": "submenu",
                "items": []
            },
            {
                "key": "themes",
                "text": "Themes",
                "type": "submenu",
                "items": []
            },
            {
                "key": "css-editor",
                "text": "CSS Editor",
                "type": "button",
                "onClick": () => { CssEditor.open() }
            }
        ];

        let contexMenu = <CContextMenu onChange={self.onChange} top={`${top + $cmpos.top}px`} left={`${left + $cmpos.left}px`} items={items} />;
        let subMenu = Renderer.append("[data-bd=context-menu]", $("<div/>", { "data-bd": "context-menu-sub" }), contexMenu);

    }

    onChange(id, checked, cat) {
        switch (cat) {
            case "core":
                Settings.setCoreSetting(id, checked);
                break;
            case "emotes":
                Settings.setEmoteSetting(id, checked);
                break;
            case "ui":
                Settings.setUiSetting(id, checked);
                break;
        }
    }

}

module.exports = new ContextMenu();
