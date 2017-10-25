/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = window.require('react');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var observer_1 = __webpack_require__(14);
exports.Observer = observer_1.Observer;
var pluginmanager_1 = __webpack_require__(15);
exports.PluginManager = pluginmanager_1.default;
var utils_1 = __webpack_require__(32);
exports.Utils = utils_1.Utils;
exports.Logger = utils_1.Logger;
var plugin_1 = __webpack_require__(34);
exports.Plugin = plugin_1.Plugin;
var config_1 = __webpack_require__(35);
exports.Config = config_1.Config;
var events_1 = __webpack_require__(36);
exports.Events = events_1.Events;
var modulemanager_1 = __webpack_require__(38);
exports.ModuleManager = modulemanager_1.ModuleManager;
var csseditor_1 = __webpack_require__(39);
exports.CssEditor = csseditor_1.CssEditor;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord React Component Subclass
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class ReactComponent extends React.Component {
    constructor(props, context) {
        super(props);
        this.bindings();
        if (props)
            this.setInitialState(props);
    }
}
exports.ReactComponent = ReactComponent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bdcomponent_1 = __webpack_require__(18);
exports.BdComponent = bdcomponent_1.BdComponent;
exports.BdMultiComponent = bdcomponent_1.BdMultiComponent;
var settingspanel_1 = __webpack_require__(8);
exports.CSettingsPanel = settingspanel_1.CSettingsPanel;
var plugincard_1 = __webpack_require__(28);
exports.CPluginCard = plugincard_1.CPluginCard;
var button_1 = __webpack_require__(10);
exports.CButton = button_1.CButton;
exports.CInlineButton = button_1.CInlineButton;
var materialicon_1 = __webpack_require__(29);
exports.CMaterialIcon = materialicon_1.CMaterialIcon;
var switch_1 = __webpack_require__(30);
exports.CSwitch = switch_1.CSwitch;
var modal_1 = __webpack_require__(31);
exports.CModal = modal_1.CModal;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord DOM Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class DOM {
    static injectContainers() {
        if (this._containers)
            return this._containers;
        const head = this.appendChild(document.head, document.createElement('bd-head'));
        const body = this.appendChild(document.body, document.createElement('bd-body'));
        const style = this.appendChild(head, document.createElement('bd-styles'));
        const script = this.appendChild(body, document.createElement('bd-scripts'));
        const theme = this.appendChild(head, document.createElement('bd-themes'));
        const modal = this.appendChild(body, document.createElement('bd-modals'));
        const customcss = this.appendChild(style, document.createElement('style'));
        return (this._containers = {
            head,
            body,
            style,
            script,
            theme,
            modal,
            customcss
        });
    }
    static get containers() {
        return this._containers || this.injectContainers();
    }
    static get headContainer() { return this.containers.head; }
    static get bodyContainer() { return this.containers.body; }
    static get styleContainer() { return this.containers.style; }
    static get scriptContainer() { return this.containers.script; }
    static get themeContainer() { return this.containers.theme; }
    static get modalContainer() { return this.containers.modal; }
    static get customCssContainer() { return this.containers.customcss; }
    static createElement(type = 'div', className = null, id = null) {
        const element = document.createElement(type);
        if (className)
            element.className = className;
        if (id)
            element.id = id;
        return element;
    }
    static injectStyle(style, id) {
        const styleContainer = document.createElement("style");
        styleContainer.id = id;
        styleContainer.textContent = style;
        this.appendChild(this.styleContainer, styleContainer);
    }
    static injectStyleLink(link) {
        const linkContainer = document.createElement("link");
        linkContainer.href = link;
        linkContainer.rel = "stylesheet";
        this.headContainer.appendChild(linkContainer);
    }
    static appendChild(parent, child) {
        return parent.appendChild(child);
    }
    static insertBefore(target, child) {
        console.log("INSERT BEFORE!");
        const parent = target.parentNode;
        return parent.insertBefore(child, target);
    }
    static insertAfter(target, child) {
        console.log("INSERT AFTER!");
        const parent = target.parentNode;
        if (parent.lastChild == target) {
            return this.appendChild(parent, child);
        }
        return parent.insertBefore(child, target.nextSibling);
    }
}
exports.DOM = DOM;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(22);
exports.Button = button_1.Button;
exports.InlineButton = button_1.InlineButton;
exports.EButtonType = button_1.EButtonType;
var materialicon_1 = __webpack_require__(23);
exports.MaterialIcon = materialicon_1.MaterialIcon;
var modal_1 = __webpack_require__(24);
exports.Modal = modal_1.Modal;
var sidebar_1 = __webpack_require__(25);
exports.Sidebar = sidebar_1.Sidebar;
var contentregion_1 = __webpack_require__(26);
exports.ContentRegion = contentregion_1.ContentRegion;
var contentpanel_1 = __webpack_require__(27);
exports.ContentPanel = contentpanel_1.ContentPanel;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var einjectmethod_1 = __webpack_require__(20);
exports.EInjectMethod = einjectmethod_1.EInjectMethod;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Module Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class BdModule {
    constructor(_props = null) {
        if (_props)
            this.initWithProps(_props);
        this.bindings();
    }
    initWithProps(_props) {
        this.props = _props;
    }
}
exports.BdModule = BdModule;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Settings Panel Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const { ipcRenderer } = window.require('electron');
const _1 = __webpack_require__(3);
const enums_1 = __webpack_require__(6);
const helpers_1 = __webpack_require__(21);
const dom_1 = __webpack_require__(4);
const modules_1 = __webpack_require__(1);
const reactcomponent_1 = __webpack_require__(2);
const templates_1 = __webpack_require__(5);
class PluginsPanel extends reactcomponent_1.ReactComponent {
    bindings() {
        this.reloadLocal = this.reloadLocal.bind(this);
    }
    setInitialState(props) {
        this.state = props;
    }
    render() {
        if (this.state.loading)
            return React.createElement("div", null, "Loading");
        return (React.createElement(templates_1.ContentPanel, { name: 'Plugins' },
            React.createElement("div", { className: 'bd-plugins-tabs bd-flex-row' },
                React.createElement("div", { className: 'bd-plugins-tab bd-weight-semibold bd-selected' },
                    "Local",
                    React.createElement("div", { className: 'bd-plugins-opendir', onClick: this.openDir },
                        React.createElement(templates_1.MaterialIcon, { icon: 'folder' })),
                    React.createElement("div", { className: 'bd-plugins-refresh', onClick: this.reloadLocal },
                        React.createElement(templates_1.MaterialIcon, { icon: 'refresh' }))),
                React.createElement("div", { className: 'bd-plugins-tab bd-weight-semibold' },
                    "Online",
                    React.createElement("div", { className: "bd-plugins-refresh" },
                        React.createElement(templates_1.MaterialIcon, { icon: "refresh" })))),
            React.createElement("div", { className: 'bd-plugins-local bd-plugins-list' }, this.localPlugins),
            React.createElement("div", { className: 'bd-plugins-online bd-plugins-list' })));
    }
    get localPlugins() {
        return this.state.localPlugins.map((plugin, index) => {
            return React.createElement(_1.CPluginCard, { key: index, plugin: plugin, uninstall: this.uninstallPlugin });
        });
    }
    uninstallPlugin() { }
    reloadLocal() {
        this.setState({ loading: true });
        modules_1.PluginManager.loadPlugins().then(localPlugins => {
            this.setState({ localPlugins, loading: false });
        });
    }
    openDir() {
        ipcRenderer.send('bd-async', { 'module': 'settingspanel', 'command': 'opendir', 'dir': 'plugindir' });
    }
}
class CorePanel extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        return (React.createElement(templates_1.ContentPanel, { name: 'Core' }));
    }
}
class EmotesPanel extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        return (React.createElement(templates_1.ContentPanel, { name: 'Emotes' }));
    }
}
class ThemesPanel extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        return (React.createElement(templates_1.ContentPanel, { name: 'Themes' }));
    }
}
class CSettingsPanel extends _1.BdMultiComponent {
    constructor() {
        super();
        modules_1.Events.on('global.click', e => {
            const target = e.target;
            if (!target
                || !target.className
                || !target.className.includes
                || !target.parentElement
                || !target.parentElement.className
                || !target.parentElement.className.includes)
                return;
            if (target.className.includes('itemDefault') && target.parentElement.className.includes('side')) {
                if (target === this._lastSelected)
                    target.className = this._selectedClassName;
                this._lastSelected = target;
                this.switch(null);
            }
        });
    }
    render() {
        super.render();
        this._selectedClassName = helpers_1.DH.selectedItemClassName;
        this._notSelectedClassName = helpers_1.DH.notSelectedItemClassName;
        this._lastSelected = helpers_1.DH.selectedItem;
    }
    bindings() {
        this.switch = this.switch.bind(this);
    }
    get componentDefs() {
        return [
            this.sideBar,
            this.contentPanel
        ];
    }
    /*Sidebar*/
    get sideBar() {
        if (this._sideBar) {
            this._sideBar.root = helpers_1.DH.sideBarRoot;
            return this._sideBar;
        }
        return (this._sideBar = {
            root: helpers_1.DH.sideBarRoot,
            container: dom_1.DOM.createElement('div', 'bd-sidebar'),
            reactComponent: React.createElement(templates_1.Sidebar, { selectedId: 'none', items: this.sidebarItems, onClick: this.switch, title: 'BetterDiscord v2: DP3' }),
            method: enums_1.EInjectMethod.insertBefore
        });
    }
    get sidebarItems() {
        return [
            { 'id': 'core', 'text': 'Core' },
            { 'id': 'emotes', 'text': 'Emotes' },
            { 'id': 'plugins', 'text': 'Plugins' },
            { 'id': 'themes', 'text': 'Themes' },
            { 'id': 'css', 'text': 'Custom CSS' }
        ];
    }
    /*Panel*/
    get contentPanel() {
        if (this._contentPanel) {
            this._contentPanel.root = helpers_1.DH.settingsPanelRoot;
            return this._contentPanel;
        }
        return (this._contentPanel = {
            root: helpers_1.DH.settingsPanelRoot,
            container: dom_1.DOM.createElement('div', 'bd-content-region bd-hidden'),
            reactComponent: React.createElement(templates_1.ContentRegion, { hidden: false, selectedId: 'none', panels: this.panels }),
            method: enums_1.EInjectMethod.insertAfter
        });
    }
    get panels() {
        return [
            { 'id': 'core', 'element': React.createElement(CorePanel, null) },
            { 'id': 'emotes', 'element': React.createElement(EmotesPanel, null) },
            { 'id': 'plugins', 'element': React.createElement(PluginsPanel, { localPlugins: modules_1.PluginManager.Plugins }) },
            { 'id': 'themes', 'element': React.createElement(ThemesPanel, null) },
            { 'id': 'css', 'element': React.createElement("span", null) }
        ];
    }
    update(oldState, newState) {
        this.setComponentState(newState, this.sideBar);
        this.setComponentState(newState, this.contentPanel);
    }
    switch(selectedId) {
        if (!selectedId) {
            this.addContainerClass('bd-hidden', this.contentPanel);
            helpers_1.DH.settingsPanelRoot.classList.remove('bd-hidden');
        }
        else {
            this.removeContainerClass('bd-hidden', this.contentPanel);
            this._lastSelected.className = this._notSelectedClassName;
            helpers_1.DH.settingsPanelRoot.classList.add('bd-hidden');
        }
        if (selectedId === 'css') {
            modules_1.CssEditor.open();
            return;
        }
        this.setState({
            selectedId
        });
    }
}
exports.CSettingsPanel = CSettingsPanel;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord React Component Subclass
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class ReactComponent extends React.Component {
    constructor(props, context) {
        super(props);
        this.bindings();
        if (props)
            this.setInitialState(props);
    }
}
exports.ReactComponent = ReactComponent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Button Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const _1 = __webpack_require__(3);
const reactcomponent_1 = __webpack_require__(2);
var EButtonType;
(function (EButtonType) {
    EButtonType[EButtonType["default"] = 0] = "default";
    EButtonType[EButtonType["red"] = 1] = "red";
    EButtonType[EButtonType["green"] = 2] = "green";
    EButtonType[EButtonType["none"] = 3] = "none";
})(EButtonType = exports.EButtonType || (exports.EButtonType = {}));
class CButton extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        const { text, onClick, type, icon, zeroPadding } = this.props;
        const className = ['bd-button'];
        switch (type) {
            case EButtonType.default:
                className.push('bd-button-db');
                break;
            case EButtonType.red:
                className.push('bd-button-red');
                break;
            case EButtonType.green:
                className.push('bd-button-green');
                break;
        }
        if (zeroPadding)
            className.push('bd-button-zeropad');
        return (React.createElement("button", { className: className.join(' '), onClick: onClick },
            React.createElement("div", { className: "bd-button-text" }, icon ? React.createElement(_1.CMaterialIcon, { icon: icon }) : text || '')));
    }
}
exports.CButton = CButton;
class CInlineButton extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        const { text, icon, onClick, type, left, right } = this.props;
        const className = ['bd-button', 'bd-button-inline', left ? 'bd-button-inline-left' : right ? 'bd-button-inline-right' : 'bd-button-inline-middle'];
        switch (type) {
            case EButtonType.default:
                className.push('bd-button-db');
                break;
            case EButtonType.red:
                className.push('bd-button-red');
                break;
            case EButtonType.green:
                className.push('bd-button-green');
                break;
        }
        return (React.createElement("button", { className: className.join(' '), onClick: onClick },
            React.createElement("div", { className: "bd-button-text" }, icon ? React.createElement(_1.CMaterialIcon, { icon: icon }) : text || '')));
    }
}
exports.CInlineButton = CInlineButton;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bdcss = __webpack_require__(12);
const modules_1 = __webpack_require__(1);
const ui_1 = __webpack_require__(40);
const dom_1 = __webpack_require__(4);
class ClientCore {
    constructor() {
        this.bdModules = [];
        window.csse = modules_1.CssEditor;
        modules_1.CssEditor.init();
        modules_1.Config.setConfig(window.bd);
        window.bdconfig = modules_1.Config;
        window.DOM = dom_1.DOM;
        window.Events = modules_1.Events;
        dom_1.DOM.injectStyleLink('https://fonts.googleapis.com/icon?family=Material+Icons');
        dom_1.DOM.injectStyle(bdcss, 'bd-core-style');
        this.init();
    }
    init() {
        document.addEventListener('click', e => {
            modules_1.Events.emit('global.click', e);
        });
        const observer = new modules_1.Observer();
        // const pluginManager = new PluginManager();
        const ui = new ui_1.UI();
        //this.bdModules.push(observer, pluginManager);
        modules_1.PluginManager.init();
        observer.observe();
        //  ModuleManager.addModule(pluginManager);
    }
    getModule(name) {
        return this.bdModules.find(module => {
            return module.name === name;
        });
    }
    quit() {
        this.bdModules.forEach(module => {
            module.cleanup();
        });
    }
}
new ClientCore();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, ".bd-hidden {\n  display: none !important; }\n\n.bd-zero-padding {\n  padding: 0; }\n\n.bd-margin-top-8 {\n  margin-top: 8px; }\n\n.bd-margin-top-16 {\n  margin-top: 16px; }\n\n.bd-margin-top-20 {\n  margin-top: 20px; }\n\n.bd-margin-bottom-8 {\n  margin-bottom: 8px; }\n\n.bd-margin-bottom-20 {\n  margin-bottom: 20px; }\n\n.bd-margin-left-8 {\n  margin-left: 8px; }\n\n.bd-margin-left-20 {\n  margin-left: 20px; }\n\n.bd-margin-right-8 {\n  margin-right: 8px; }\n\n.bd-margin-right-20 {\n  margin-right: 20px; }\n\n.bd-margin-auto {\n  margin: auto; }\n\n.bd-line-height-8 {\n  line-height: 8px; }\n\n.bd-line-height-10 {\n  line-height: 10px; }\n\n.bd-line-height-12 {\n  line-height: 12px; }\n\n.bd-line-height-16 {\n  line-height: 16px; }\n\n.bd-line-height-20 {\n  line-height: 20px; }\n\n.bd-line-height-24 {\n  line-height: 24px; }\n\n.bd-line-height-30 {\n  line-height: 30px; }\n\n.bd-weight-semibold {\n  font-weight: 600; }\n\n.bd-weight-bold {\n  font-weight: 700; }\n\n.bd-size-8 {\n  font-size: 8px; }\n\n.bd-size-10 {\n  font-size: 10px; }\n\n.bd-size-12 {\n  font-size: 12px; }\n\n.bd-size-16 {\n  font-size: 16px; }\n\n.bd-size-20 {\n  font-size: 20px; }\n\n.bd-transform-normal {\n  text-transform: none; }\n\n.bd-transform-uppercase {\n  text-transform: uppercase; }\n\n.bd-transform-lowercase {\n  text-transform: lowercase; }\n\n.bd-transform-capitalize {\n  text-transform: capitalize; }\n\n.bd-flex-row {\n  display: flex;\n  flex-direction: row; }\n\n.bd-flex-column, .bd-flex-col {\n  display: flex;\n  flex-direction: column; }\n\n.bd-flex-spacer {\n  display: flex;\n  flex-grow: 1; }\n\n.bd-flex-grow {\n  flex-grow: 1; }\n\n.bd-button {\n  cursor: pointer;\n  transition: background-color .17s ease;\n  display: flex;\n  -webkit-box-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  align-items: center;\n  background: none;\n  border: none;\n  border-radius: 3px;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 16px;\n  padding: 2px 16px; }\n\n.bd-button-inline {\n  display: inline; }\n\n.bd-button-inline-left {\n  border-radius: 3px 0 0 3px; }\n\n.bd-button-inline-middle {\n  border-radius: 0; }\n\n.bd-button-inline-right {\n  border-radius: 0 3px 3px 0; }\n\n.bd-button-zeropad {\n  padding: 0; }\n\n.bd-switch {\n  position: relative;\n  display: block;\n  user-select: none;\n  -webkit-box-flex: 0;\n  flex: 0 0 auto;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.15);\n  border-radius: 14px;\n  width: 42px;\n  height: 24px;\n  opacity: 1;\n  overflow: hidden;\n  transition: background .15s ease-in-out,box-shadow .15s ease-in-out,border .15s ease-in-out,opacity .15s ease-in-out; }\n  .bd-switch:before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 0;\n    opacity: 0;\n    background-color: #000; }\n  .bd-switch:after {\n    content: \"\";\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    transform: translateZ(0);\n    transition: transform .15s ease-in-out,width .1s ease-in-out,left .1s ease-in-out;\n    border-radius: 9px;\n    height: 18px;\n    width: 18px;\n    margin: 3px;\n    display: block;\n    position: absolute;\n    background-color: #fff;\n    z-index: 1; }\n  .bd-switch .bd-switch-checkbox {\n    cursor: pointer;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    padding: 0;\n    margin: 0;\n    z-index: 2; }\n  .bd-switch.bd-switch-checked {\n    background-color: #7289da; }\n    .bd-switch.bd-switch-checked:after {\n      transform: translate3d(18px, 0, 0); }\n\n.bd-content-region {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  -webkit-box-flex: 1;\n  flex: 1 1 800px;\n  -webkit-box-align: start;\n  align-items: flex-start;\n  box-sizing: border-box; }\n  .bd-content-region .bd-content-transition-wrap {\n    -webkit-box-flex: 1;\n    flex: 1;\n    height: 100%;\n    box-sizing: border-box; }\n  .bd-content-region .bd-scroller-wrap {\n    height: 100%;\n    position: relative;\n    min-height: 1px;\n    display: flex;\n    -webkit-box-flex: 1;\n    flex: 1; }\n  .bd-content-region .bd-scroller {\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-direction: row;\n    -webkit-box-pack: start;\n    justify-content: flex-start;\n    -webkit-box-align: start;\n    align-items: flex-start;\n    overflow-x: hidden;\n    box-sizing: border-box;\n    overflow-y: scroll;\n    min-height: 1px;\n    -webkit-box-flex: 1;\n    flex: 1;\n    contain: layout; }\n    .bd-content-region .bd-scroller::-webkit-scrollbar {\n      width: 14px; }\n    .bd-content-region .bd-scroller::-webkit-scrollbar-track {\n      border-width: initial;\n      border-color: transparent; }\n    .bd-content-region .bd-scroller::-webkit-scrollbar-thumb, .bd-content-region .bd-scroller::-webkit-scrollbar-track {\n      background-clip: padding-box;\n      border-width: 3px;\n      border-style: solid;\n      border-radius: 7px; }\n  .bd-content-region .bd-content-column {\n    padding: 60px 40px 80px;\n    -webkit-box-flex: 1;\n    flex: 1 1 auto;\n    max-width: 740px;\n    min-width: 460px;\n    min-height: 100vh;\n    box-sizing: border-box; }\n    .bd-content-region .bd-content-column .bd-panel .bd-panel-title {\n      flex: 1;\n      -webkit-box-flex: 1;\n      cursor: default;\n      text-transform: uppercase; }\n\n.bd-sidebar-header {\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  flex-shrink: 0;\n  font-weight: 500; }\n\n.bd-sidebar-separator {\n  margin-left: 10px;\n  margin-right: 10px;\n  height: 1px; }\n\n.bd-sidebar-item {\n  padding: 6px 10px;\n  margin-bottom: 2px;\n  cursor: pointer;\n  position: relative;\n  font-size: 16px;\n  line-height: 20px;\n  border-radius: 3px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  flex-shrink: 0;\n  font-weight: 500; }\n\n.bd-panel-plugins .bd-plugins-container .bd-plugins-tabs {\n  background: #292b2f;\n  border-radius: 3px 3px 0 0; }\n  .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab {\n    position: relative;\n    flex-grow: 1;\n    text-align: center;\n    padding: 10px;\n    color: rgba(221, 222, 223, 0.3);\n    cursor: pointer; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab:hover {\n      color: #FFF;\n      background: #2e3034; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab:first-of-type {\n      border-right: 1px solid #2b2d32;\n      border-radius: 3px 0 0 0; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab:last-of-type {\n      border-radius: 0 3px 0 0; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab.bd-selected {\n      color: #FFF;\n      background: #7289da;\n      cursor: default; }\n      .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab.bd-selected:hover .bd-plugins-refresh,\n      .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab.bd-selected:hover .bd-plugins-opendir {\n        opacity: 1; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab .bd-plugins-refresh {\n      position: absolute;\n      right: 7px;\n      top: 7px;\n      height: 24px;\n      opacity: 0;\n      border: none;\n      border-radius: 3px;\n      cursor: pointer; }\n      .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab .bd-plugins-refresh:hover {\n        background: #677bc4; }\n    .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab .bd-plugins-opendir {\n      position: absolute;\n      right: 37px;\n      top: 7px;\n      opacity: 0;\n      border: none;\n      border-radius: 3px;\n      cursor: pointer; }\n      .bd-panel-plugins .bd-plugins-container .bd-plugins-tabs .bd-plugins-tab .bd-plugins-opendir:hover {\n        background: #677bc4; }\n\n.bd-panel-plugins .bd-plugins-container .bd-plugins-list {\n  background: #292b2f;\n  padding: 10px; }\n\n.bd-plugincard {\n  position: relative;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  flex-direction: column; }\n  .bd-plugincard .bd-plugincard-inner {\n    padding: 20px;\n    position: relative;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 5px;\n    min-height: 215px; }\n    .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-name {\n      text-transform: uppercase;\n      flex: 1;\n      cursor: default; }\n    .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-description {\n      flex-grow: 1;\n      min-height: 100px;\n      max-height: 100px;\n      overflow-y: scroll;\n      overflow-x: hidden;\n      border-width: 1px;\n      border-style: solid;\n      border-radius: 3px;\n      padding: 5px;\n      cursor: default; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-description::-webkit-scrollbar {\n        width: 14px; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-description::-webkit-scrollbar-track {\n        border-width: initial;\n        border-color: transparent; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-description::-webkit-scrollbar-thumb, .bd-plugincard .bd-plugincard-inner.bd-plugincard-info .bd-plugincard-description::-webkit-scrollbar-track {\n        background-clip: padding-box;\n        border-width: 3px;\n        border-style: solid;\n        border-radius: 7px; }\n    .bd-plugincard .bd-plugincard-inner.bd-plugincard-settings {\n      opacity: 0;\n      display: none; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-settings .bd-plugincard-back button {\n        max-height: 30px; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-settings .bd-plugincard-settings-scroller {\n        max-height: 130px;\n        min-height: 130px;\n        padding: 10px;\n        border: 1px solid #202225;\n        border-radius: 3px; }\n    .bd-plugincard .bd-plugincard-inner.bd-plugincard-uninstall-dialog {\n      padding-top: 50px; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-uninstall-dialog .bd-button {\n        margin-left: 5px; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-uninstall-dialog .bd-plugincard-uninstall-delconfig .bd-switch {\n        margin-left: 5px; }\n      .bd-plugincard .bd-plugincard-inner.bd-plugincard-uninstall-dialog .bd-plugincard-uninstall-delconfig span {\n        line-height: 24px; }\n  .bd-plugincard .bd-plugincard-uninstall {\n    opacity: 0;\n    position: absolute;\n    top: -12px;\n    right: -12px;\n    box-shadow: 0 0 0 1px rgba(32, 34, 37, 0.6), 0 1px 5px 0 rgba(0, 0, 0, 0.3);\n    text-indent: -9999em;\n    overflow: hidden;\n    cursor: pointer;\n    width: 24px;\n    height: 24px;\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBvbHlnb24gZmlsbD0iI0YwNDc0NyIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjE0LjI1IDQuODA4IDEzLjE5MyAzLjc1IDkgNy45NDIgNC44MDggMy43NSAzLjc1IDQuODA4IDcuOTQyIDkgMy43NSAxMy4xOTMgNC44MDggMTQuMjUgOSAxMC4wNTcgMTMuMTkzIDE0LjI1IDE0LjI1IDEzLjE5MyAxMC4wNTcgOSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSIwIDAgMTggMCAxOCAxOCAwIDE4Ii8+CiAgPC9nPgo8L3N2Zz4K);\n    background-position: 50% 50%;\n    background-repeat: no-repeat;\n    border-radius: 50%;\n    transition: opacity .1s ease-in-out,box-shadow .1s ease-in-out,transform .2s ease;\n    background-color: #292b2f; }\n  .bd-plugincard:hover .bd-plugincard-uninstall {\n    opacity: 1; }\n  .bd-plugincard.bd-plugincard-settings .bd-plugincard-settings {\n    opacity: 1;\n    display: flex; }\n  .bd-plugincard.bd-plugincard-settings .bd-plugincard-info {\n    opacity: 0;\n    display: none; }\n\n.bd-modal-backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9001; }\n  .bd-modal-backdrop .bd-modal {\n    -webkit-box-direction: normal;\n    -webkit-box-orient: vertical;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-box-pack: center;\n    -webkit-box-sizing: border-box;\n    -webkit-user-select: none;\n    align-content: space-around;\n    align-items: center;\n    box-sizing: border-box;\n    contain: content;\n    flex-direction: column;\n    height: 100%;\n    justify-content: center;\n    left: 0;\n    min-height: 340px;\n    opacity: 1;\n    padding-bottom: 60px;\n    padding-top: 60px;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    user-select: none;\n    width: 100%;\n    z-index: 1000; }\n    .bd-modal-backdrop .bd-modal .bd-modal-inner {\n      -ms-flex-direction: column;\n      contain: layout;\n      flex-direction: column;\n      pointer-events: auto;\n      -webkit-box-direction: normal;\n      -webkit-box-orient: vertical;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      border-radius: 3px;\n      height: 546px;\n      min-height: 360px;\n      width: 540px;\n      overflow: hidden;\n      padding: 10px; }\n      .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-title {\n        padding: 5px; }\n        .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-title span {\n          line-height: 25px;\n          flex-grow: 1; }\n      .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body {\n        -ms-flex-direction: column;\n        -webkit-box-direction: normal;\n        -webkit-box-orient: vertical;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        flex-direction: column;\n        position: relative;\n        padding: 5px;\n        white-space: pre; }\n        .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body .bd-modal-errors {\n          margin-top: 10px; }\n          .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body .bd-modal-errors .bd-modal-error {\n            margin-top: 5px;\n            margin-bottom: 5px; }\n            .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body .bd-modal-errors .bd-modal-error .bd-modal-error-title {\n              font-weight: 700; }\n            .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body .bd-modal-errors .bd-modal-error .bd-modal-error-reason {\n              font-weight: 600;\n              font-size: 12px;\n              margin-top: 5px; }\n          .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-body .bd-modal-errors .bd-modal-errorhint {\n            font-weight: 600;\n            padding-top: 10px; }\n\n.theme-dark .bd-sidebar-header {\n  color: #72767d; }\n\n.theme-dark .bd-sidebar-separator {\n  background-color: rgba(114, 118, 126, 0.3); }\n\n.theme-dark .bd-sidebar-item {\n  color: #b9bbbe; }\n  .theme-dark .bd-sidebar-item:hover {\n    color: #f6f6f7;\n    background-color: rgba(186, 188, 191, 0.1); }\n  .theme-dark .bd-sidebar-item.bd-selected {\n    color: #fff;\n    background-color: #7289da; }\n\n.theme-dark .bd-scroller::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.4);\n  background-color: #202225;\n  border-color: transparent; }\n\n.theme-dark .bd-scroller::-webkit-scrollbar-track {\n  background-color: rgba(0, 0, 0, 0.1);\n  background-color: #2e3338; }\n\n.theme-dark .bd-content-region .bd-content-column .bd-panel .bd-panel-title {\n  color: #f6f6f7; }\n\n.theme-dark .bd-plugincard .bd-plugincard-inner {\n  background: rgba(32, 34, 37, 0.6);\n  border-color: #202225; }\n  .theme-dark .bd-plugincard .bd-plugincard-inner:hover {\n    background: rgba(32, 34, 37, 0.5); }\n  .theme-dark .bd-plugincard .bd-plugincard-inner .bd-plugincard-name {\n    color: rgba(221, 222, 223, 0.3); }\n  .theme-dark .bd-plugincard .bd-plugincard-inner .bd-plugincard-description {\n    color: rgba(221, 222, 223, 0.3);\n    border-color: #202225; }\n  .theme-dark .bd-plugincard .bd-plugincard-inner.bd-plugincard-uninstall-dialog {\n    background: #582727; }\n\n.bd-modal-error {\n  border-bottom: 1px solid #313131; }\n\n.bd-modal-error-reason {\n  color: rgba(221, 222, 223, 0.3); }\n\n.bd-modal-errorhint {\n  border-top: 1px solid #313131;\n  color: rgba(221, 222, 223, 0.3); }\n\n.bd-white {\n  color: #FFF; }\n\n.bd-button {\n  color: #FFF; }\n\n.bd-dark-gray {\n  color: rgba(221, 222, 223, 0.3); }\n\n.bd-button-db {\n  background-color: #7289da; }\n\n.bd-button-green {\n  background-color: #43b581; }\n\n.bd-button-red {\n  background-color: #f04747; }\n\n.bd-button-transparent {\n  background-color: transparent; }\n\n.bd-switch {\n  background-color: #72767d; }\n\n.bd-modal-backdrop {\n  background: rgba(0, 0, 0, 0.85); }\n  .bd-modal-backdrop .bd-modal .bd-modal-inner {\n    background-color: #202225; }\n    .bd-modal-backdrop .bd-modal .bd-modal-inner .bd-modal-title {\n      border-bottom: 1px solid #313131; }\n\n.bd-icon {\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAwIDIwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzRTgyRTUiIGQ9Ik0xNDAyLjIsNjMxLjdjLTkuNy0zNTMuNC0yODYuMi00OTYtNjQyLjYtNDk2SDY4LjR2NzE0LjFsNDQyLDM5OFY0OTAuN2gyNTdjMjc0LjUsMCwyNzQuNSwzNDQuOSwwLDM0NC45ICAgSDU5Ny42djMyOS41aDE2OS44YzI3NC41LDAsMjc0LjUsMzQ0LjgsMCwzNDQuOGgtNjk5djM1NC45aDY5MS4yYzM1Ni4zLDAsNjMyLjgtMTQyLjYsNjQyLjYtNDk2YzAtMTYyLjYtNDQuNS0yODQuMS0xMjIuOS0zNjguNiAgIEMxMzU3LjcsOTE1LjgsMTQwMi4yLDc5NC4zLDE0MDIuMiw2MzEuN3oiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI2Mi41LDEzNS4yTDEyNjIuNSwxMzUuMmwtNzYuOCwwYzI2LjYsMTMuMyw1MS43LDI4LjEsNzUsNDQuM2M3MC43LDQ5LjEsMTI2LjEsMTExLjUsMTY0LjYsMTg1LjMgICBjMzkuOSw3Ni42LDYxLjUsMTY1LjYsNjQuMywyNjQuNmwwLDEuMnYxLjJjMCwxNDEuMSwwLDU5Ni4xLDAsNzM3LjF2MS4ybDAsMS4yYy0yLjcsOTktMjQuMywxODgtNjQuMywyNjQuNiAgIGMtMzguNSw3My44LTkzLjgsMTM2LjItMTY0LjYsMTg1LjNjLTIyLjYsMTUuNy00Ni45LDMwLjEtNzIuNiw0My4xaDcyLjVjMzQ2LjIsMS45LDY3MS0xNzEuMiw2NzEtNTY3LjlWNzE2LjcgICBDMTkzMy41LDMxMi4yLDE2MDguNywxMzUuMiwxMjYyLjUsMTM1LjJ6Ii8+PC9nPjwvc3ZnPg==);\n  width: 20px;\n  height: 20px;\n  background-size: 100% 100%; }\n  .bd-icon.bd-animate {\n    -webkit-animation: bd-icon-animation 1.5s ease-in-out infinite; }\n\n@-webkit-keyframes bd-icon-animation {\n  0% {\n    opacity: 0.05; }\n  50% {\n    opacity: 0.6; }\n  100% {\n    opacity: 0.05; } }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * BetterDiscord Observer Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

Object.defineProperty(exports, "__esModule", { value: true });
const bdmodule_1 = __webpack_require__(7);
const _1 = __webpack_require__(1);
const observerDefaultOptions = {
    childList: true,
    subtree: true
};
class Observer extends bdmodule_1.BdModule {
    constructor() {
        super();
    }
    get name() { return "Observer"; }
    bindings() {
        this.observe = this.observe.bind(this);
        this.observerCallback = this.observerCallback.bind(this);
        this.mutationHandler = this.mutationHandler.bind(this);
    }
    cleanup() {
        this.observer.disconnect();
    }
    /**
     * Start observer
     * @param options MutationObserver options
     */
    observe(options = observerDefaultOptions) {
        if (this.observer)
            return;
        this.observer = new MutationObserver(this.observerCallback);
        this.observer.observe(document, options);
    }
    /**
     * MutationObserver callback
     * @param mutations Mutation objects
     */
    observerCallback(mutations) {
        mutations.forEach(this.mutationHandler);
    }
    /**
     * Mutation iterator
     * @param mutation Mutation object
     */
    mutationHandler(mutation) {
        const { type, addedNodes, target } = mutation;
        if (type === 'childList') {
            _1.Events.emit('mutation.childList', mutation);
            return;
        }
        _1.Events.emit('mutation', mutation);
        // if(type !== 'childList' || !addedNodes || addedNodes.length <= 0 || !target || !target.className.includes('layers')) return;
        //  console.log("Settings Panel?");
        //  console.log(mutation);
    }
}
exports.Observer = Observer;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Plugin Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const bdmodule_1 = __webpack_require__(7);
const _1 = __webpack_require__(1);
const path = __webpack_require__(16);
const components_1 = __webpack_require__(3);
const Vendor = {
    React
};
class PluginManager extends bdmodule_1.BdModule {
    constructor() {
        super(...arguments);
        // private pluginPath: string;
        this.plugins = [];
    }
    get Plugins() { return this.plugins; }
    get name() { return 'PluginManager'; }
    bindings() {
    }
    cleanup() { }
    init() {
        this.loadPlugins();
    }
    get pluginPath() {
        return path.join(_1.Config.get('dataPath'), 'plugins');
    }
    setPlugins(plugins) {
        return (this.plugins = plugins);
    }
    resolvePlugin(sp) {
        return (typeof (sp) === 'string') ? this.getPlugin(sp) : sp;
    }
    async loadPlugins() {
        const pluginDirs = await _1.Utils.readDirAsync(this.pluginPath);
        const loadedPlugins = [];
        const errors = [];
        for (let pluginDir of pluginDirs) {
            try {
                const plugin = await this.loadPlugin(pluginDir);
                loadedPlugins.push(plugin);
            }
            catch (err) {
                errors.push(err);
            }
        }
        if (errors.length > 0) {
            const errorModal = new components_1.CModal({
                'title': 'Failed to load one or more plugin(s)!',
                'message': 'The following plugin(s) failed to load:',
                errors
            });
            errorModal.render();
        }
        return this.setPlugins(loadedPlugins);
    }
    async loadPlugin(directory, reload = false, index = 0) {
        try {
            const pluginPath = reload ? directory : path.join(this.pluginPath, directory);
            const files = await _1.Utils.readDirAsync(pluginPath);
            const [configFilePath, pluginFilePath] = [
                await this.locateConfigFile(pluginPath, files),
                await this.locatePluginFile(pluginPath, files)
            ];
            const pluginConfig = await _1.Utils.readJsonAsync(configFilePath);
            if (!reload) {
                const loadedPlugin = this.getPlugin(pluginConfig.info.name);
                if (loadedPlugin)
                    return loadedPlugin;
            }
            const plugin = window.require(pluginFilePath)(_1.Plugin, {}, Vendor);
            const pluginInstance = new plugin();
            pluginInstance.setConfig(pluginConfig, { pluginFilePath, configFilePath, pluginPath });
            if (reload) {
                this.plugins[index] = pluginInstance;
                return pluginInstance;
            }
            this.plugins.push(pluginInstance);
            return pluginInstance;
        }
        catch (err) {
            const error = {
                native: err,
                severity: 1,
                reason: err.message || err,
                shortReason: '',
                title: directory
            };
            _1.Logger.log(this.name, error);
            return Promise.reject(error);
        }
    }
    async reloadPlugin(name) {
        const plugin = this.resolvePlugin(name);
        if (!plugin)
            Promise.reject('Attempted to reload a plugin that is not loaded');
        if (plugin.enabled) {
            if (!plugin.onStop())
                Promise.reject('Failed to stop plugin!');
        }
        delete window.require.cache[window.require.resolve(plugin.getFilePath)];
        console.log(plugin.getBasePath);
        const reloaded = await this.loadPlugin(plugin.getBasePath, true, this.plugins.indexOf(plugin));
        if (plugin.enabled)
            return this.startPlugin(reloaded);
        return reloaded;
    }
    async stopPlugin(sp) {
        const plugin = this.resolvePlugin(sp);
        if (!plugin)
            Promise.reject('Attempted to stop a plugin that doesn\'t exist');
        if (!plugin.enabled)
            Promise.reject('Attempted to stop a plugin that is already stopped.');
        if (!plugin.onStop())
            Promise.reject('Failed to stop plugin!');
        plugin.enabled = false;
        return plugin;
    }
    async startPlugin(sp) {
        const plugin = this.resolvePlugin(sp);
        if (!plugin)
            Promise.reject('Attempted to start a plugin that doesn\'t exist');
        if (plugin.enabled)
            Promise.reject('Attempted to start a plugin that is already started.');
        if (!plugin.onStart())
            Promise.reject('Failed to start plugin!');
        plugin.enabled = true;
        return plugin;
    }
    async locateConfigFile(basePath, files) {
        const configFile = files.find(file => file === 'config.json');
        if (!configFile)
            return Promise.reject('Config file not found!');
        return path.join(basePath, configFile);
    }
    async locatePluginFile(basePath, files) {
        let pluginFile = files.find(file => file.endsWith('plugin.js'));
        if (!pluginFile)
            pluginFile = files.find(file => file.endsWith('.js'));
        if (!pluginFile)
            return Promise.reject('Plugin file not found!');
        return path.join(basePath, pluginFile);
    }
    getPlugin(name) {
        if (this.plugins.length <= 0)
            return null;
        return this.plugins.find(plugin => plugin.getConfig.info.name === name);
    }
}
exports.default = new PluginManager();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Component Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOM = __webpack_require__(19);
const dom_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(6);
class BdComponent {
    constructor() {
        this.unmount = this.unmount.bind(this);
        this.bindings();
    }
    get state() { return this._state || {}; }
    setState(state) {
        const oldState = Object.assign({}, this.state);
        this._state = Object.assign(this.state, state);
        this.update(oldState, this.state);
    }
    inject() {
        const { componentDef } = this;
        if (!componentDef.root || !componentDef.container)
            return;
        componentDef.injected = dom_1.DOM.appendChild(componentDef.root, componentDef.container);
    }
    insertBefore(target, child) {
        const parent = target.parentNode;
        return parent.insertBefore(child, target);
    }
    insertAfter(target, child) {
        const parent = target.parentNode;
        if (parent.lastChild === target) {
            return parent.appendChild(child);
        }
        return parent.insertBefore(child, target.nextSibling);
    }
    render() {
        this.inject();
        const { componentDef } = this;
        if (!componentDef.injected || !componentDef.reactComponent)
            return;
        componentDef.instance = ReactDOM.render(componentDef.reactComponent, componentDef.container);
    }
    setComponentState(state, componentDef = this.componentDef) {
        if (!state || !componentDef || !componentDef.instance)
            return;
        componentDef.instance.setState(state);
    }
    addContainerClass(className, componentDef = this.componentDef) {
        if (!className || !componentDef)
            return;
        const container = componentDef.container;
        container.classList.add(className);
    }
    removeContainerClass(className, componentDef = this.componentDef) {
        if (!className || !componentDef)
            return;
        const container = componentDef.container;
        container.classList.remove(className);
    }
    unmount(componentDef = this.componentDef) {
        ReactDOM.unmountComponentAtNode(componentDef.container);
        setTimeout(() => componentDef.container.remove(), 500);
    }
}
exports.BdComponent = BdComponent;
class BdMultiComponent extends BdComponent {
    inject() {
        const { componentDefs } = this;
        componentDefs.forEach(componentDef => {
            if (!componentDef.root || !componentDef.container)
                return;
            switch (componentDef.method) {
                case enums_1.EInjectMethod.append:
                    componentDef.injected = dom_1.DOM.appendChild(componentDef.root, componentDef.container);
                    break;
                case enums_1.EInjectMethod.insertAfter:
                    componentDef.injected = dom_1.DOM.insertAfter(componentDef.root, componentDef.container);
                    break;
                case enums_1.EInjectMethod.insertBefore:
                    componentDef.injected = dom_1.DOM.insertBefore(componentDef.root, componentDef.container);
                    break;
            }
        });
    }
    render() {
        this.inject();
        const { componentDefs } = this;
        componentDefs.forEach(componentDef => {
            if (!componentDef.injected || !componentDef.reactComponent)
                return;
            componentDef.instance = ReactDOM.render(componentDef.reactComponent, componentDef.container);
        });
    }
}
exports.BdMultiComponent = BdMultiComponent;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = window.require('react-dom');

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EInjectMethod;
(function (EInjectMethod) {
    EInjectMethod[EInjectMethod["append"] = 0] = "append";
    EInjectMethod[EInjectMethod["insertBefore"] = 1] = "insertBefore";
    EInjectMethod[EInjectMethod["insertAfter"] = 2] = "insertAfter";
})(EInjectMethod = exports.EInjectMethod || (exports.EInjectMethod = {}));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Helpers Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
* A collection of helpers to keep maintaining in a single place
*/
/*Discord Helper
* Mostly for Discord dom selectors
*/
class DH {
    static get sideBarRoot() {
        const sidebarItems = document.querySelectorAll('[class*=side] > [class*=item]:not([class*=Danger])');
        return sidebarItems[sidebarItems.length - 1];
    }
    static get settingsPanelRoot() {
        return document.querySelector('[class^=content-region]');
    }
    static get selectedItem() {
        return document.querySelector('[class*=itemDefaultSelected-]');
    }
    static get selectedItemClassName() {
        return this.selectedItem.className;
    }
    static get notSelectedItemClassName() {
        return document.querySelector('[class*=itemDefault-]').className;
    }
}
exports.DH = DH;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Button Component Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(9);
const _1 = __webpack_require__(5);
var EButtonType;
(function (EButtonType) {
    EButtonType[EButtonType["default"] = 0] = "default";
    EButtonType[EButtonType["red"] = 1] = "red";
    EButtonType[EButtonType["green"] = 2] = "green";
    EButtonType[EButtonType["none"] = 3] = "none";
})(EButtonType = exports.EButtonType || (exports.EButtonType = {}));
class Button extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        const { text, onClick, type, icon, zeroPadding } = this.props;
        const className = ['bd-button'];
        switch (type) {
            case EButtonType.default:
                className.push('bd-button-db');
                break;
            case EButtonType.red:
                className.push('bd-button-red');
                break;
            case EButtonType.green:
                className.push('bd-button-green');
                break;
        }
        if (zeroPadding)
            className.push('bd-button-zeropad');
        return (React.createElement("button", { className: className.join(' '), onClick: onClick },
            React.createElement("div", { className: "bd-button-text" }, icon ? React.createElement(_1.MaterialIcon, { icon: icon }) : text || '')));
    }
}
exports.Button = Button;
class InlineButton extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        const { text, icon, onClick, type, left, right, zeroPadding } = this.props;
        const className = ['bd-button', 'bd-button-inline', left ? 'bd-button-inline-left' : right ? 'bd-button-inline-right' : 'bd-button-inline-middle'];
        switch (type) {
            case EButtonType.default:
                className.push('bd-button-db');
                break;
            case EButtonType.red:
                className.push('bd-button-red');
                break;
            case EButtonType.green:
                className.push('bd-button-green');
                break;
        }
        if (zeroPadding)
            className.push('bd-button-zeropad');
        return (React.createElement("button", { className: className.join(' '), onClick: onClick },
            React.createElement("div", { className: "bd-button-text" }, icon ? React.createElement(_1.MaterialIcon, { icon: icon }) : text || '')));
    }
}
exports.InlineButton = InlineButton;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Material Icon Component Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class MaterialIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { icon } = this.props;
        return (React.createElement("i", { className: "material-icons" }, icon));
    }
}
exports.MaterialIcon = MaterialIcon;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Modal Component Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(9);
const _1 = __webpack_require__(5);
class Modal extends reactcomponent_1.ReactComponent {
    bindings() {
        this.backDropClick = this.backDropClick.bind(this);
        this.unmount = this.unmount.bind(this);
    }
    setInitialState(props) {
    }
    render() {
        const { modalProps, body } = this.props;
        return (React.createElement("div", { ref: (node) => this.container = node, className: 'bd-modal-backdrop', onClick: this.backDropClick },
            React.createElement("div", { className: 'bd-modal' },
                React.createElement("div", { className: 'bd-modal-inner' },
                    React.createElement("div", { className: 'bd-modal-title bd-white bd-weight-bold' },
                        React.createElement("div", { className: 'bd-flex-row' },
                            React.createElement("div", { className: 'bd-icon', style: { margin: '2px 5px 0 0' } }),
                            React.createElement("span", null, modalProps.title || 'Something went wrong'),
                            React.createElement(_1.Button, { zeroPadding: true, icon: 'close', onClick: this.unmount, type: _1.EButtonType.none }))),
                    React.createElement("div", { className: 'bd-modal-body bd-white bd-flex-col bd-flex-grow' },
                        modalProps.message,
                        body,
                        modalProps.errors && this.renderErrors)))));
    }
    get renderErrors() {
        const { modalProps } = this.props;
        return (React.createElement("div", { className: 'bd-modal-errors bd-flex-col bd-flex-grow' },
            modalProps.errors.map((error, index) => this.renderError(error, index)),
            React.createElement("div", { className: 'bd-flex-grow' }),
            React.createElement("div", { className: 'bd-modal-errorhint' }, "Check console for more details (Ctrl + Shift + I)")));
    }
    renderError(error, index) {
        return (React.createElement("div", { key: index, className: 'bd-modal-error' },
            React.createElement("div", { className: 'bd-modal-error-title' }, error.title),
            React.createElement("div", { className: 'bd-modal-error-reason' }, error.reason)));
    }
    unmount(e) {
        e.stopPropagation();
        this.props.backDropClick();
    }
    backDropClick(e) {
        if (e.target !== this.container)
            return;
        e.stopPropagation();
        this.props.backDropClick();
    }
}
exports.Modal = Modal;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Sidebar Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(2);
class Sidebar extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) {
        this.state = props;
    }
    render() {
        const { selectedId, items, title } = this.state;
        return (React.createElement("div", null,
            React.createElement("div", { className: "bd-sidebar-header" }, title),
            items.map(item => {
                const selected = item.id === selectedId;
                return React.createElement("div", { key: item.id, className: `bd-sidebar-item${selected ? ' bd-selected' : ''}`, onClick: () => this.props.onClick(item.id) }, item.text);
            }),
            React.createElement("div", { className: "bd-sidebar-separator" })));
    }
}
exports.Sidebar = Sidebar;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Content Region Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(2);
class ContentRegion extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) {
        this.state = props;
    }
    render() {
        const { hidden } = this.state;
        return (React.createElement("div", { className: 'bd-content-transition-wrap' },
            React.createElement("div", { className: 'bd-scroller-wrap' },
                React.createElement("div", { className: 'bd-scroller' },
                    React.createElement("div", { className: 'bd-content-column' }, this.panel)),
                React.createElement("div", { className: 'bd-tools' }))));
    }
    get panel() {
        const { selectedId, panels } = this.state;
        if (!selectedId || selectedId === 'none')
            return React.createElement("span", null);
        return panels.find((panel) => panel.id === selectedId).element;
    }
}
exports.ContentRegion = ContentRegion;
/*
interface IContentRegionProps {
    hidden: boolean;
    selectedId: string;
    localPlugins?: Plugin[];
}

interface IComponentState {
    selectedId: string;
}

export class ContentRegion extends ReactComponent<IContentRegionProps, IContentRegionProps> {

    protected bindings(): void {
        this.uninstallPlugin = this.uninstallPlugin.bind(this);
        this.reloadLocal = this.reloadLocal.bind(this);
    }
    protected setInitialState(props: IContentRegionProps): void {
        this.state = props;
    }

    public render() {
        const { hidden } = this.state;

        return (
            <div className='bd-content-transition-wrap'>
                <div className='bd-scroller-wrap'>
                    <div className='bd-scroller'>
                        <div className='bd-content-column'>
                            {this.panel}
                        </div>
                    </div>
                    <div className='bd-tools'></div>
                </div>
            </div>
        );
    }

    private get panel(): JSX.Element {
        const { selectedId } = this.state;
        switch (selectedId) {
            case 'core':
                return this.corePanel;
            case 'emotes':
                return this.emotesPanel;
            case 'plugins':
                return this.pluginsPanel;
            case 'themes':
                return this.themesPanel;
            case 'css':
                return <span />;

        }
    }

    private get corePanel(): JSX.Element {
        return <div>Core</div>;
    }

    private get emotesPanel(): JSX.Element {
        return <div>Emotes</div>;
    }

    private get pluginsPanel(): JSX.Element {
        return (
            <div className='bd-panel bd-panel-plugins'>
                <h2 className="bd-panel-title bd-margin-bottom-20 bd-line-height-20 bd-weight-semibold bd-size-16">Plugins</h2>
                <div className='bd-plugins-container'>
                    <div className='bd-plugins-tabs bd-flex-row'>
                        <div className='bd-plugins-tab bd-weight-semibold bd-selected'>Local
                            <div className="bd-plugins-refresh" onClick={this.reloadLocal}>
                                <CMaterialIcon icon="refresh" />
                            </div>
                        </div>
                        <div className='bd-plugins-tab bd-weight-semibold'>Online
                            <div className="bd-plugins-refresh">
                                <CMaterialIcon icon="refresh" />
                            </div>
                        </div>
                    </div>
                    <div className='bd-plugins-local bd-plugins-list'>
                        {this.localPlugins}
                    </div>
                    <div className='bd-plugins-online bd-plugins-list'>

                    </div>
                </div>
            </div>
        );
    }

    private get themesPanel(): JSX.Element {
        return <div>Themes</div>;
    }

    private get localPlugins(): JSX.Element[] {
        const { localPlugins } = this.state;
        return localPlugins.map(plugin => {
            return (
                <CPluginCard key={plugin.getConfig.info.name} plugin={plugin} uninstall={this.uninstallPlugin} />
            );
        });
    }

    private reloadLocal(): void {
        PluginManager.loadPlugins().then(localPlugins => {
            this.setState({
                localPlugins
            });
        });
    }

    public uninstallPlugin(name: string, delconfig: boolean): void {
        /* PluginManager.uninstallPlugin(name, delconfig).then(localPlugins => {
             this.setState({
                 localPlugins
             });
         });
    }
}*/ 


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Content Panel Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(2);
class ContentPanel extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) { }
    render() {
        const { name, children } = this.props;
        const lower = name.toLowerCase();
        return (React.createElement("div", { className: `bd-panel bd-panel-${lower}` },
            React.createElement("h2", { className: "bd-panel-title bd-margin-bottom-20 bd-line-height-20 bd-weight-semibold bd-size-16" }, name),
            React.createElement("div", { className: `bd-${lower}-container` }, children)));
    }
}
exports.ContentPanel = ContentPanel;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Plugin Card Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const modules_1 = __webpack_require__(1);
const button_1 = __webpack_require__(10);
const _1 = __webpack_require__(3);
const reactcomponent_1 = __webpack_require__(2);
class CPluginCard extends reactcomponent_1.ReactComponent {
    bindings() {
        this.uninstall = this.uninstall.bind(this);
        this.uninstallDialog = this.uninstallDialog.bind(this);
        this.enableDisable = this.enableDisable.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.reload = this.reload.bind(this);
    }
    setInitialState(props) {
        this.state = props;
    }
    render() {
        const { settingsOpen, uninstallDialog, plugin } = this.state;
        const { enabled, info } = plugin;
        if (uninstallDialog)
            return this.renderUninstallDialog;
        return (React.createElement("div", { className: `bd-plugincard bd-margin-top-20${settingsOpen ? ' bd-plugincard-settings' : ''}` },
            React.createElement("div", { className: 'bd-plugincard-inner bd-plugincard-info bd-flex-column' },
                React.createElement("div", { className: 'bd-flex-row bd-margin-bottom-8' },
                    React.createElement("div", { className: 'bd-plugincard-name bd-weight-semibold bd-line-height-24' },
                        info.name,
                        " - ",
                        React.createElement("span", { className: 'bd-transform-normal' },
                            "v",
                            info.version,
                            " by ",
                            info.authors.join(', '))),
                    React.createElement(_1.CSwitch, { checked: enabled, onClick: this.enableDisable })),
                React.createElement("div", { className: 'bd-flex-row' },
                    React.createElement("div", { className: 'bd-plugincard-description bd-scroller bd-weight-semibold bd-size-12' }, info.description)),
                React.createElement("div", { className: 'bd-flex-row bd-margin-top-8' },
                    React.createElement("div", { className: 'bd-flex-spacer' }),
                    React.createElement("div", { className: 'bd-plugin-controls' },
                        React.createElement(button_1.CInlineButton, { icon: 'settings', left: true, onClick: () => this.toggleSettings(true), type: button_1.EButtonType.default }),
                        React.createElement(button_1.CInlineButton, { icon: 'refresh', right: true, onClick: this.reload, type: button_1.EButtonType.default }))),
                React.createElement("div", { className: 'bd-plugincard-uninstall', onClick: this.uninstallDialog })),
            React.createElement("div", { className: 'bd-plugincard-inner bd-plugincard-settings bd-flex-column' },
                React.createElement("div", { className: 'bd-flex-row bd-plugincard-back' },
                    React.createElement(button_1.CButton, { icon: 'keyboard_backspace', type: button_1.EButtonType.green, onClick: () => this.toggleSettings(false) }),
                    React.createElement("div", { className: 'bd-plugincard-name bd-weight-semibold bd-line-height-30 bd-margin-left-8' },
                        info.name,
                        " - Settings")),
                React.createElement("div", { className: 'bd-flex-row bd-margin-top-8' },
                    React.createElement("div", { className: 'bd-scroller bd-plugincard-settings-scroller' }, this.state.plugin.settingsPanel)))));
    }
    get renderUninstallDialog() {
        const { info } = this.state.plugin;
        return (React.createElement("div", { className: 'bd-plugincard bd-margin-top-20' },
            React.createElement("div", { className: 'bd-plugincard-inner bd-plugincard-info bd-flex-column bd-plugincard-uninstall-dialog' },
                React.createElement("div", { className: 'bd-flex-row bd-margin-top-8' },
                    React.createElement("span", { className: 'bd-weight-bold bd-white bd-margin-auto' },
                        "Uninstall ",
                        info.name,
                        "?")),
                React.createElement("div", { className: 'bd-flex-row bd-margin-top-8' },
                    React.createElement("div", { className: 'bd-margin-auto bd-plugincard-uninstall-delconfig bd-flex-row' },
                        React.createElement("span", { className: 'bd-dark-gray bd-semibold' }, "Delete configuration?"),
                        React.createElement(_1.CSwitch, { checked: false, onClick: () => { } }))),
                React.createElement("div", { className: 'bd-flex-row bd-margin-auto' },
                    React.createElement(button_1.CButton, { icon: 'keyboard_backspace', type: button_1.EButtonType.green, onClick: this.uninstallDialog }),
                    React.createElement(button_1.CButton, { icon: 'delete_forever', type: button_1.EButtonType.red, onClick: () => { this.state.uninstall(info.name, false); } })))));
    }
    uninstallDialog() {
        this.setState({
            uninstallDialog: !this.state.uninstallDialog
        });
    }
    enableDisable() {
        const { info, enabled } = this.state.plugin;
        if (enabled) {
            modules_1.PluginManager.stopPlugin(info.name).then(plugin => {
                this.setState({ plugin });
            });
            return;
        }
        modules_1.PluginManager.startPlugin(info.name).then(plugin => {
            this.setState({ plugin });
        });
    }
    toggleSettings(settingsOpen) {
        this.setState({
            settingsOpen
        });
    }
    reload() {
        const { info } = this.state.plugin;
        modules_1.PluginManager.reloadPlugin(info.name).then(plugin => {
            console.log(plugin);
            this.setState({ plugin });
        });
    }
    uninstall() {
        const { info } = this.state.plugin;
    }
}
exports.CPluginCard = CPluginCard;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Material Icon Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class CMaterialIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { icon } = this.props;
        return (React.createElement("i", { className: "material-icons" }, icon));
    }
}
exports.CMaterialIcon = CMaterialIcon;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Switch Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const reactcomponent_1 = __webpack_require__(2);
class CSwitch extends reactcomponent_1.ReactComponent {
    bindings() { }
    setInitialState(props) {
        this.state = props;
    }
    render() {
        const { checked, onClick } = this.props;
        return (React.createElement("div", { className: `bd-switch${checked ? ' bd-switch-checked' : ''}`, onClick: onClick },
            React.createElement("input", { type: "checkbox", className: "bd-switch-checkbox" })));
    }
}
exports.CSwitch = CSwitch;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Modal Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const dom_1 = __webpack_require__(4);
const _1 = __webpack_require__(3);
const enums_1 = __webpack_require__(6);
const templates_1 = __webpack_require__(5);
class CModal extends _1.BdComponent {
    constructor(props) {
        super();
        this.modalProps = props;
    }
    update(oldState, newState) {
    }
    bindings() {
    }
    get componentDef() {
        if (this.modal)
            return this.modal;
        return (this.modal = {
            root: dom_1.DOM.modalContainer,
            container: dom_1.DOM.createElement('div', 'bd-modal-container'),
            reactComponent: React.createElement(templates_1.Modal, { backDropClick: this.unmount, modalProps: this.modalProps }),
            method: enums_1.EInjectMethod.append
        });
    }
}
exports.CModal = CModal;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Utils Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(33);
class Utils {
    /**
     * Read directory async
     * @param path Directory path
     */
    static readDir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }
    static async readDirAsync(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }
    static async delFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, err => {
                if (err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    }
    /**
     * Check if file exists
     * @param path File path
     */
    static fileExistsSync(path) {
        try {
            return fs.statSync(path).isFile();
        }
        catch (err) {
            return false;
        }
    }
    /**
     * Read and parse json file
     * @param path File path
     * @param encoding File encoding
     */
    static readJsonSync(path, encoding = 'utf8') {
        if (!this.fileExistsSync(path))
            return null;
        const json = fs.readFileSync(path, encoding);
        return this.tryParse(json);
    }
    static async fileExistsAsync(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (err) {
                    resolve(false);
                    return;
                }
                ;
                resolve(true);
            });
        });
    }
    static async readFileAsync(path, encoding = 'utf8') {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding }, (err, data) => {
                if (err) {
                    resolve(null);
                    return;
                }
                resolve(data);
            });
        });
    }
    static async readJsonAsync(path, encoding = 'utf8') {
        if (!await this.fileExistsAsync(path))
            return null;
        const read = await this.readFileAsync(path, encoding);
        if (!read)
            return null;
        return await this.tryParseAsync(read);
    }
    static async tryParseAsync(json) {
        return new Promise((resolve, reject) => {
            try {
                const parsed = JSON.parse(json);
                resolve(parsed);
            }
            catch (err) {
                resolve(null);
            }
        });
    }
    /**
     * Try to parse json
     * @param json json string
     */
    static tryParse(json) {
        try {
            return JSON.parse(json);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.Utils = Utils;
class Logger {
    static log(module, error) {
        const severity = this.severity(error);
        console[severity]('[%cBetter%cDiscord%c|%s] %s', 'color: #3E82E5;', 'color: #FFF; text-shadow: 0 0 2px #000;', '', `${module}${severity === 'debug' ? '|DBG' : ''}`, error.reason);
        console.log(error.native);
    }
    static logAll(module, errors) {
        errors.forEach(error => this.log(module, error));
    }
    static severity(error) {
        return [
            'log',
            'warn',
            'error',
            'debug'
        ][error.severity];
    }
}
exports.Logger = Logger;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = window.require('fs');

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Plugin Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Plugin {
    constructor() {
        this.enabled = false;
    }
    /**
     * Set plugin config
     * @param config Plugin config
     * @param pluginFilePath Code file path
     * @param pluginConfigPath Config file path
     * @param pluginBasePath Base directory path
     */
    setConfig(config, paths) {
        this.config = config;
        this.pluginFilePath = paths.pluginFilePath;
        this.pluginConfigPath = paths.pluginConfigPath;
        this.pluginBasePath = paths.pluginPath;
    }
    /*public setConfig(config: IPluginConfig, pluginFilePath: string, pluginConfigPath: string, pluginBasePath: string): void {
        this.config = config;
        this.pluginFilePath = pluginFilePath;
        this.pluginConfigPath = pluginConfigPath;
        this.pluginBasePath = pluginBasePath;
    }*/
    /**
     * @return Plugin Config
     */
    get getConfig() {
        return this.config;
    }
    /**
     * @return Plugin Info
     */
    get info() {
        return this.config.info;
    }
    /**
     * @return Plugin code file path
     */
    get getFilePath() {
        return this.pluginFilePath;
    }
    /**
     * @return Plugin config file path
     */
    get getConfigPath() {
        return this.pluginConfigPath;
    }
    /**
     * @return Plugin base path
     */
    get getBasePath() {
        return this.pluginBasePath;
    }
}
exports.Plugin = Plugin;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Config Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    /**
     * Set global config
     * @param config Config object
     */
    static setConfig(config) {
        this.cfg = config;
    }
    /**
     * @return Global config
     */
    static get getConfig() {
        return this.cfg;
    }
    static get(name) {
        return this.cfg[name] || null;
    }
}
exports.Config = Config;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = __webpack_require__(37);
class Events {
    static on(eventName, callBack) {
        this.events.set(eventName, callBack);
        this.emitter.on(eventName, callBack);
    }
    static off(eventName) {
        this.emitter.removeListener(eventName, this.events.get(eventName));
    }
    static emit(name, ...args) {
        this.emitter.emit(name, ...args);
    }
}
Events.emitter = new EventEmitter();
Events.events = new Map();
exports.Events = Events;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord Module Manager
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class ModuleManager {
    static getModule(name) {
        return this._modules.find(module => module.name === name);
    }
    static addModule(module) {
        this._modules.push(module);
    }
}
ModuleManager._modules = [];
exports.ModuleManager = ModuleManager;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { Config } = __webpack_require__(1);
const dom_1 = __webpack_require__(4);
let win = null;
const { remote, ipcRenderer } = window.require('electron');
const defaultWindowOptions = {
    x: screen.width / 2 - 400,
    y: screen.height / 2 - 300,
    width: 800,
    height: 600,
    frame: false
};
const windowOptions = defaultWindowOptions;
class CssEditor {
    static init() {
        ipcRenderer.on('bd-async', (event, arg) => {
            const { module, command } = arg;
            if (!module || !command || module !== 'css-editor')
                return;
            switch (command) {
                case 'close-editor':
                    if (arg.data && arg.data.bounds) {
                        const { bounds } = arg.data;
                        windowOptions.width = bounds.width;
                        windowOptions.height = bounds.height;
                        windowOptions.x = bounds.x;
                        windowOptions.y = bounds.y;
                    }
                    win = null;
                    break;
                case 'update-css':
                    if (arg.data && arg.data.css) {
                        dom_1.DOM.customCssContainer.textContent = arg.data.css;
                    }
                    break;
            }
        });
    }
    static open() {
        console.log(win);
        if (win)
            return;
        win = new remote.BrowserWindow(windowOptions);
        win.loadURL(`${Config.getConfig.basePath}/csseditor/index.html`);
    }
}
exports.CssEditor = CssEditor;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * BetterDiscord UI Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = __webpack_require__(1);
const settingspanel_1 = __webpack_require__(8);
const settingsPanelClassSelector = 'layers';
class UI {
    constructor() {
        this._settingsPanel = new settingspanel_1.CSettingsPanel();
        this.eventListeners();
    }
    eventListeners() {
        modules_1.Events.on('mutation.childList', mutation => {
            const { addedNodes, target } = mutation;
            if (!addedNodes || addedNodes.length <= 0 || !target)
                return;
            if (target.className.includes(settingsPanelClassSelector)) {
                this.injectSettingsPanel();
                return;
            }
        });
        modules_1.Events.on('bd.errorDialog', error => {
            const { title, message } = error;
        });
    }
    injectSettingsPanel() {
        this._settingsPanel.render();
    }
}
exports.UI = UI;


/***/ })
/******/ ]);
//# sourceMappingURL=bdclient.js.map