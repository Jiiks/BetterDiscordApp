'use strict';

const { BDStorage, BDPluginStorage } = require('./storage');
const { BDLogger, BDUtils } = require('./utils');
const { BDEmoteModule } = require('./modules/modules');
const _bd_fs = require('fs');
const _bd_config = require('./config');
const _bd_logger = new BDLogger("g:/bdlogs.txt", _bd_config.debug);

class BetterDiscord {

    constructor(options) {
        if(!this.validateOptions(options)) return;
        _bd_logger.log(`v${_bd_config.version} starting up`);
        
        this.clientPrep();
        

    }

    //Some client preparations
    clientPrep() {
        //Inject jQuery
        BDUtils.injectScript(options.mainWindow, "window._$ = window.jQuery", "jquery.2.2.4.min.js");
        //Inject some initial css(move to separate file eventually)
        BDUtils.injectCss(options.mainWindow, '@-webkit-keyframes li-opacity { 0% { opacity: 0.2; } 50% { opacity: 0.7; } 100% { opacity: 0.2; } }[data-bd="loading-icon"] { -webkit-animation: li-opacity 2s ease-out infinite; position: absolute; bottom: 5px; right: 5px; display: block; width: 35px; height: 35px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAwIDIwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzRTgyRTUiIGQ9Ik0xNDAyLjIsNjMxLjdjLTkuNy0zNTMuNC0yODYuMi00OTYtNjQyLjYtNDk2SDY4LjR2NzE0LjFsNDQyLDM5OFY0OTAuN2gyNTdjMjc0LjUsMCwyNzQuNSwzNDQuOSwwLDM0NC45SDU5Ny42djMyOS41aDE2OS44YzI3NC41LDAsMjc0LjUsMzQ0LjgsMCwzNDQuOGgtNjk5djM1NC45aDY5MS4yYzM1Ni4zLDAsNjMyLjgtMTQyLjYsNjQyLjYtNDk2YzAtMTYyLjYtNDQuNS0yODQuMS0xMjIuOS0zNjguNkMxMzU3LjcsOTE1LjgsMTQwMi4yLDc5NC4zLDE0MDIuMiw2MzEuN3oiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI2Mi41LDEzNS4yTDEyNjIuNSwxMzUuMmwtNzYuOCwwYzI2LjYsMTMuMyw1MS43LDI4LjEsNzUsNDQuM2M3MC43LDQ5LjEsMTI2LjEsMTExLjUsMTY0LjYsMTg1LjNjMzkuOSw3Ni42LDYxLjUsMTY1LjYsNjQuMywyNjQuNmwwLDEuMnYxLjJjMCwxNDEuMSwwLDU5Ni4xLDAsNzM3LjF2MS4ybDAsMS4yYy0yLjcsOTktMjQuMywxODgtNjQuMywyNjQuNmMtMzguNSw3My44LTkzLjgsMTM2LjItMTY0LjYsMTg1LjNjLTIyLjYsMTUuNy00Ni45LDMwLjEtNzIuNiw0My4xaDcyLjVjMzQ2LjIsMS45LDY3MS0xNzEuMiw2NzEtNTY3LjlWNzE2LjdDMTkzMy41LDMxMi4yLDE2MDguNywxMzUuMiwxMjYyLjUsMTM1LjJ6Ii8+PC9nPjwvc3ZnPg==); }', 'initial-css');
        //Inject our react root
        BDUtils.injectElement(options.mainWindow, 'body', { type: 'div', id: 'bd-react-root' });
        //Inject loading spinner
        BDUtils.injectComponent(options.mainWindow, 'bd-react-root', '_REACT.createElement("div", { "data-bd": "loading-icon" })');
    }

    validateOptions(options) {
        if(options === undefined) {
            _bd_logger.log('NO OPTIONS SUPPLIED', 'ERR');
            _bd_logger.save(true);
            return;
        }
        if(options.mainWindow === undefined) {
            _bd_logger.log('MISSING PARAM: mainWindow', 'ERR');
            _bd_logger.save(true);
            return false;
        }
        return true;
    }

}

module.exports = {
    BetterDiscord: BetterDiscord
}