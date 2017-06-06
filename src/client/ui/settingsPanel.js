/**
 * BetterDiscord Settings Panel Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, ReactDOM, $ } = require('../vendor');
const { Events, Settings, Renderer, CssEditor } = require('../modules');
import { CSettingsPanel, CProTip, CCheckboxGroup, CPluginList, CTabBarItem, CTabBarSeparator, CTabBarHeader } from './components';

import { CSP_Sidebar, CSP_Content } from './components/bd';

class SettingsPanel {
    
    constructor() {
        let self = this;

        //self.initUi();

        Events.on('user-settings-modal', e => {
            console.log("USER SETTINGS OPEN");
        });

		Events.on('user-settings-layer', layer => {
			self.renderSidebar(layer);
        });
    }
    /*
    initUi() {
        let self = this;

        self.ui = {
            "root": $("<div/>", { class: "settings-inner", css: { display: "none" } }),
            "button": $("<div/>", { "data-bd": "tbi-settings", class: "tab-bar-item", click: self.showSettings.bind(self) }).append($("<span/>", { text: "Better"  })).append($("<span/>", { text: "Discord" })),
            "footer": {
                "link": { "key": "splink", "text": "Jiiks", "onClick": (key) => { window.open("https://github.com/Jiiks", "_blank") } },
                "links": [
                    {"key": "splinks0", "text": "BetterDiscord.net", "onClick": (key) => { window.open("https://betterdiscord.net", "_blank") }},
                    {"key": "splinks1", "text": "changelog", "onClick": (key) => { console.log("show changelog"); }}
                ]
            },
            "content": {
                "core": (
                    <div className="control-groups">
                        <div className="control-group">
                            <CCheckboxGroup items={Settings.getCoreSettings} onChange={(key, checked) => self.onChange("core", key, checked)}/>
                        </div>
                    </div>
                ),
                "ui": (
                    <div className="control-groups">
                        <div className="control-group">
                            <CCheckboxGroup items={Settings.getUiSettings} onChange={(key, checked) => self.onChange("ui", key, checked)}/>
                        </div>
                    </div>
                ),
                "emotes": (
                    <div className="control-groups">
                        <div className="control-group">
                            <CCheckboxGroup items={Settings.getEmoteSettings} onChange={(key, checked) => self.onChange("emotes", key, checked)}/>
                        </div>
                    </div>
                ),
                "plugins": (
                    <CPluginList PluginManager={PluginManager} />   
                ),
                "security": (
                    <div className="control-group" >
                        <CCheckboxGroup items={Settings.getSecuritySettings} onChange={(key, checked) => self.onChange("security", key, checked)} />
                    </div>
                )
            },
            "tabs": [
                { "key": "core", "text": "Core"},
                { "key": "ui", "text": "UI" },
                { "key": "emotes", "text": "Emotes" },
                { "key": "plugins", "text": "Plugins" },
                { "key": "themes", "text": "Themes" },
                { "key": "security", "text": "Security" }
            ],
            "topbuttons": [
                { "key": "css", "text": "CSS Editor", onClick: key => self.openCssEditor()}
            ]
        };

    }
    */
    refreshLocalPlugins(cb) {
        PluginLoader.loadPlugins(plugins => cb(plugins));
    }

    openCssEditor() {
        CssEditor.open();
    }

    onChange(sub, key, checked) {
        Settings.setSetting(sub, key, checked);
        return true;
    }

    showSettings() {
        let self = this;
        $(".tab-bar.SIDE .tab-bar-item").removeClass("selected");
        self.ui.button.addClass("selected");
        $(".settings-inner").hide();
        self.ui.root.show();
    }

    hideSettings() {
        let self = this;
        $(".form .settings-right .settings-inner").first().show();
        self.ui.root.hide();
        self.ui.button.removeClass("selected");
    }

    toggleSetting(sub, key, checked) {
        Settings.setSetting(sub, key, checked);
    }

    render() {
        let self = this;
        $(".tab-bar.SIDE .tab-bar-item").on("click", self.hideSettings.bind(self));
        self.ui.button.removeClass("selected");
        self.ui.root.hide();
        self.ui.button.insertBefore($(".change-log-button-container"));

        let footer = <CProTip title="BetterDiscord v0.3.0-DEVELOPER PREVIEW 2 by" link={self.ui.footer.link} links={self.ui.footer.links} />;
        let settingsPanel = <CSettingsPanel initialTab="core" content={self.ui.content} tabs={self.ui.tabs} footer={footer} topbuttons={self.ui.topbuttons} />;
        Renderer.insertBefore(".form .settings-right .settings-actions", self.ui.root, settingsPanel);
    }

	get changeLogButton() {
		let changeLog = $(".ui-tab-bar-item:not(.danger)").last();
		if(!changeLog.length) return false;
		return changeLog;
	}

	get sidebarRoot() {
		return $("<span/>", { 'id': 'bd-settings-sidebar' });
	}

	get contentRoot() {
		return $("<div/>", { class: 'content-region', 'style': 'display:none'  });
	}

	sidebar(content) {
		return <CSP_Sidebar onClick={this.changeTab} content={content}/>;
	}

	get content() {
		return <CSP_Content/>;
	}

	changeTab(id) {
		
	}

	injectSidebarRoot() {
		let self = this;
		self.sidebarRoot.insertBefore(self.changeLogButton.prev());
	}

	renderSidebar(layer) {
		if($("#bd-settings-sidebar").length) return;
		let self = this;
		if(!self.changeLogButton) return;

		let content = Renderer.insertAfter(".content-region", self.contentRoot, self.content);
        Renderer.insertBefore($(".ui-tab-bar-item:not(.danger)").last(), self.sidebarRoot, self.sidebar(content));
	}
}

module.exports = SettingsPanel;