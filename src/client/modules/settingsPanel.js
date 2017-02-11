const Events = require('./events');
const ReactDOM = require("ReactDOM");
const React = require("React");

import CSettingsPanel from '../components/settingsPanel';

class SettingsPanel {
    
    constructor(jQuery) {

        var coreSettings = [
            {"checked": true, "key": "co1", "text": "Core Option 1", "helptext": "Core Option 1 helptext"},
            {"checked": false, "key": "co2", "text": "Core Option 2", "helptext": "Core Option 2 helptext"},
            {"checked": false, "key": "co3", "text": "Core Option 3", "helptext": "Core Option 3 helptext"}
        ];
        var emoteSettings = [
            {"checked": false, "key": "eo1", "text": "Emote Option 1", "helptext": "Emote Option 1 helptext"},
            {"checked": true, "key": "eo2", "text": "Emote Option 2", "helptext": "Emote Option 2 helptext"},
            {"checked": false, "key": "eo3", "text": "Emote Option 3", "helptext": "Emote Option 3 helptext"}
        ];
        var uiSettings = [
            {"checked": false, "key": "uo1", "text": "UI Option 1", "helptext": "UI Option 1 helptext"},
            {"checked": false, "key": "uo2", "text": "UI Option 2", "helptext": "UI Option 2 helptext"},
            {"checked": true, "key": "ui3", "text": "UI Option 3", "helptext": "UI Option 3 helptext"}
        ];
        
        this.settings = {
            core: coreSettings,
            emotes: emoteSettings,
            ui: uiSettings
        };

        this.$ = this.jQuery = jQuery;
        var self = this;
        Events.on("mutation", mutation => {
            if(mutation.type !== 'childList') return;
            if(mutation.addedNodes.length <= 0) return;
            let $userSettingsModal = this.$(mutation.addedNodes[0]).find(".user-settings-modal");
            if($userSettingsModal.length <= 0) return;
            self.render();
        });
    }

    render() {
        var self = this;
        let $root = self.$("<div/>", { class: "settings-inner", css: { display: "none" } }).insertBefore(self.$(".form .settings-right .settings-actions"))
        let $button = self.$("<div/>", { class: "tab-bar-item", text: "BetterDiscord", click: showSettings });
        self.$(".tab-bar.SIDE .tab-bar-item").on("click", () => {
            self.$(".form .settings-right .settings-inner").first().show();
            $root.hide();
            $button.removeClass("selected");
        });
        $button.insertBefore(self.$(".change-log-button-container"));
        function showSettings() {
            self.$(".tab-bar-item").removeClass("selected");
            $button.addClass("selected");
            self.$(".settings-inner").hide();
            $root.show();
        }
        ReactDOM.render(<CSettingsPanel handleChange={self.changeHandler} settings={self.settings} />, $root[0]);
    }

    changeHandler(key, checked) {
        console.log(`${key} - ${checked}`);
    }

}

module.exports = SettingsPanel;