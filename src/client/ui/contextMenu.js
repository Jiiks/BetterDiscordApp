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
            if (!Settings.getUiSetting('bd-contextmenu').enabled) return;
            self.injectRoot(contextMenu);
        });
    }

    injectRoot(contextMenu) {
        let self = this;
        if ($("[data-bd='context-menu']").length) return;

        self.button = self.root;
        contextMenu.prepend(self.button);
    }

    get root() {
        let self = this;
        return $("<div/>", {
            class: "item item-subMenu",
            'data-bd': "context-menu",
            mouseenter: () => self.render(),
            mouseleave: () => self.unmount()
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
        }))).append($("<div/>", {
            'data-bd': 'context-menu-sub'
        }));
    }

    get items() {
        return [
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
                "items": [{ type: 'text', text: "Not yet implemented", key: "ni" }]
            },
            {
                "key": "themes",
                "text": "Themes",
                "type": "submenu",
                "items": [{ type: 'text', text: "Not yet implemented", key: "ni" }]
            },
            {
                "key": "css-editor",
                "text": "CSS Editor",
                "type": "button",
                "onClick": () => { CssEditor.open() }
            }
        ];
    }

    render() {
        let self = this;
        let $cmpos = $(".context-menu").first().position();
        let {top, left} = self.button.position();
        
        let contextMenu = <CContextMenu onChange={self.onChange} top={`${top + $cmpos.top}px`} left={`${left + $cmpos.left}px`} items={self.items} />;
        Renderer.render($("[data-bd=context-menu-sub]"), contextMenu);
    }

    unmount() {
        let sub = $("[data-bd='context-menu-sub']");
        ReactDOM.unmountComponentAtNode(sub[0]);
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
