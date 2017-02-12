const Events = require('./events');
const ReactDOM = require("../vendor/reactdom");
const React = require("../vendor/react");

const Settings = require('./settings');
const Renderer = require('./renderer');

const $ = require('../vendor/jquery');

import CSettingsPanel from '../components/settingsPanel';
import CProTip from '../components/protip';
import CCheckboxGroup from '../components/checkboxGroup';
import CPluginList from '../components/pluginlist';

class SettingsPanel {
    
    constructor() {
        this.initSettings();//This will be moved to another class eventually

        var self = this;
        Events.on("mutation", mutation => {
            if(mutation.type !== 'childList') return;
            if(mutation.addedNodes.length <= 0) return;
            let $userSettingsModal = $(mutation.addedNodes[0]).find(".user-settings-modal");
            if($userSettingsModal.length <= 0) return;
            self.render();
        });
    }

    initSettings() {

        function toggleSetting(array, key, checked) {
            array.filter(value => value.key === key)[0].checked = checked;
        }

        this.coreItems = [
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.coreItems, key, checked),
                "key": "public-servers",
                "text": "Public Servers",
                "helptext": "Display public servers button"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.coreItems, key, checked),
                "key": "voice-disconnect",
                "text": "Voice Disconnect",
                "helptext": "Disconnect from voice server when Discord closes"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.coreItems, key, checked),
                "key": "developer-mode",
                "text": "Developer Mode",
                "helptext": "BetterDiscord developer mode"
            }
        ];

        this.emoteItems = [
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "twitch-emotes",
                "text": "Twitch Emotes",
                "helptext": "Show Twitch emotes"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "ffz-emotes",
                "text": "FrankerFaceZ Emotes",
                "helptext": "Show FrankerFaceZ emotes"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "bttv-emotes",
                "text": "BetterTTV Emotes",
                "helptext": "Show BetterTTV emotes"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "emote-menu",
                "text": "Emote Menu",
                "helptext": "Show Twitch/Favourite emotes in emote menu"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "emoji-menu",
                "text": "Emoji Menu",
                "helptext": "Show Discord emoji menu"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "emote-autocap",
                "text": "Emote Auto Capitalization",
                "helptext": "Automatically capitalize emotes as you type"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "emote-tooltips",
                "text": "Emote Tooltips",
                "helptext": "Show emote tooltips when you hover over them"
            },
            {
                "checked": false,
                "onChange": (key, checked) => toggleSetting(this.emoteItems, key, checked),
                "key": "emote-modifiers",
                "text": "Emote Modifiers",
                "helptext": "Enable emote modifiers"
            }
        ]

        this.tabs = [
            { "key": "core", "text": "Core"},
            { "key": "ui", "text": "UI" },
            { "key": "emotes", "text": "Emotes" },
            { "key": "css", "text": "Custom CSS" },
            { "key": "plugins", "text": "Plugins" },
            { "key": "themes", "text": "Themes" }
        ];

        this.content = {
            "core": (
                <div className="control-group">
                    <CCheckboxGroup items={this.coreItems}/>
                </div>
                ),
            "plugins": (
                <div className="control-group">
                    <CPluginList />
                </div>
                ),
            "emotes": (
                <div className="control-group">
                    <CCheckboxGroup items={this.emoteItems}/>
                </div>
                )
        };
    }

    render() {
        var self = this;
        let $root = $("<div/>", { class: "settings-inner", css: { display: "none" } });
        let $button = $("<div/>", { "data-bd": "tbi-settings", class: "tab-bar-item", click: showSettings })
        .append($("<span/>", { text: "Better"  }))
        .append($("<span/>", { text: "Discord" }));
        $(".tab-bar.SIDE .tab-bar-item").on("click", () => {
            $(".form .settings-right .settings-inner").first().show();
            $root.hide();
            $button.removeClass("selected");
        });
        $button.insertBefore($(".change-log-button-container"));
        function showSettings() {
            $(".tab-bar.SIDE .tab-bar-item").removeClass("selected");
            $button.addClass("selected");
            $(".settings-inner").hide();
            $root.show();
        }

        let footerLink = {"key": "ghjlink", "text": "Jiiks", "onClick": (key) => { console.log(key + " CLICKED"); }};
        let footerLinks = [
            {"key": "bdlink", "text": "BetterDiscord.net", "onClick": (key) => { console.log(key + " CLICKED"); }},
            {"key": "cllink", "text": "changelog", "onClick": (key) => { console.log(key + " CLICKED"); }}
        ];
        let footer = <CProTip title="BetterDiscord v0.3.0-1.8.0 by" link={footerLink} links={footerLinks} />;
        let settingsPanel = <CSettingsPanel initialTab="core" content={self.content} tabs={self.tabs} handleChange={self.changeHandler} settings={self.settings} footer={footer} />;

        let componentContainer = Renderer.insertBefore(".form .settings-right .settings-actions", $root, settingsPanel);
    }

    

    changeHandler(key, checked) {
        console.log(`${key} - ${checked}`);
    }

}

module.exports = SettingsPanel;


