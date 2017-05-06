/**
 * BetterDiscord Plugin Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */


'use strict';

const { React } = require('../../vendor');
import { Component } from 'React';
import CFontAwesome from './fontAwesome';
import CScroller from './scroller';
import CSwitch from './switch';
import CToolTip from './tooltip';
import CContentColumn from './contentcolumn';
import CTextbox from './textbox';
import CUiDivider from './uidivider';
import CUiButton from './uibutton';

class CPluginCard extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.onChange = this.onChange.bind(this);
        this.reload = this.reload.bind(this);
    }

    setInitialState() {
        this.state = {
            'tooltip': null,
            'plugin': this.props.plugin,
            'reload': false,
            'settings': false
        }
    }

    render() {
        let self = this;
        let { plugin, reload } = self.state;
        let { settings, verified } = self.props;

        return (
            <div className="bd-plugin-card" style={verified ? {} : { border: "1px solid #f04747", boxShadow: "0 0 6px rgba(240,71,71,0.3)"}}>
                <div className="bd-plugin-info">
                    <CSwitch text={`${plugin.name} v${plugin.version} by ${plugin.authors.join(", ")}`} info="" checked={plugin.enabled} disabled={reload} onChange={self.onChange} />
                    <CScroller dark={true} fade={true} children={plugin.description} />
                </div>
                {self.renderControls}
                <ICPluginSettings key="ps" plugin={plugin} visible={settings} settingStore={JSON.parse(JSON.stringify(plugin.settings))} />
            </div>
        )
    }

    onChange(id, checked) {
        let { plugin } = this.state;
        let { PluginManager } = this.props;
        if (checked) {
            PluginManager.startPlugin(plugin.name);
            this.setState({});
            return;
        }
        PluginManager.stopPlugin(plugin.name);
        this.setState({});
    }

    reload() {
        let self = this;
        let { plugin } = self.state;
        let { PluginManager, settingsHandler } = self.props;
        settingsHandler(null);
        self.setState({
            'reload': true
        });

        PluginManager.reloadPlugin(plugin.name, plugin => {
            self.setState({
                'reload': false,
                'plugin': plugin
            });
        });
    }

    get renderDescription() {
        return (
            <span>
                {this.props.plugin.description}
            </span>    
        );
    }

    get renderControls() {
        let self = this;
        let { plugin, reload } = self.state;
        let { settingsHandler, verified } = self.props;
        let { showTooltip, hideTooltip } = self;

        return (
            <div className="bd-plugin-controls">
                {!verified &&
                    <div className="title" style={{ color: "rgb(240, 71, 71)", fontSize: "14px", lineHeight: "32px", fontWeight: "700" }}>Unverified plugin. Use at your own risk!</div>
                }
                <div style={{ flex: "1 1 auto" }}></div>
                <CUiButton type="brand" disabled={reload} onClick={() => { settingsHandler(plugin.name)}} content={<CFontAwesome name="cog" />} tooltip={{ 'text': 'Settings' }} />
                <CUiButton type="brand" disabled={reload} onClick={() => { self.reload() }} content={<CFontAwesome name={`refresh${reload ? ' fa-spin' : ''}`} />} tooltip={{ 'text': 'Reload' }} />
                <CUiButton type="red" disabled={reload} onClick={() => {}} content={<CFontAwesome name="trash" />} tooltip={{ 'text': 'Uninstall' }} />
            </div>
        );
    }

}

/*Internal plugin settings component*/
class ICPluginSettings extends Component {

    constructor(props) {
        super(props);
        this.bindings();
        this.setInitialState();
    }

    bindings() {
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    setInitialState() {
        this.state = {
            'settingStore': JSON.parse(JSON.stringify(this.props.plugin.settings))
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.visible && !this.props.visible) {

            this.setState({
                'settingStore': JSON.parse(JSON.stringify(this.props.plugin.settings))
            });
        }
    }

    render() {
        let self = this;
        let { settingStore } = self.state;
        let { plugin, visible } = self.props;
        let { settingsPanel } = plugin;

        let _panel = null;

        if (React.isValidElement(settingsPanel)) {
            _panel = settingsPanel;
        } else {
            _panel = (<div> {settingStore.map(setting => {
                return self.renderSetting(setting);
            })}</div>);
        }

        let column = <CContentColumn key="sco" style={{ padding: "0", minHeight: "0", marginTop: "10px" }} children={_panel} />;

        return (
            <div className="bd-plugin-settings" style={{ maxHeight: visible ? "200px" : "0" }}>
                <CScroller dark={true} fade={true} children={column} />
                {self.controls}
            </div>
        );
    }

    get controls() {
        let self = this;
        return (
            <div className="bd-plugin-settings-controls" key="sc" style={{ display: "flex" }}>
                <div style={{ flex: "1 1 auto" }}></div>
                <CUiButton type="brand" disabled={false} onClick={() => { this.setState({ 'settingStore': JSON.parse(JSON.stringify(this.props.plugin.storage.defaultConfig)) }) }} content={<CFontAwesome name="cog" />} tooltip={{ 'text': 'Default' }} />
                <CUiButton type="brand" disabled={false} onClick={() => { this.save()}} content={<CFontAwesome name="check" />} tooltip={{ 'text': 'Save' }} />
            </div>
        );
    }

    onChange(id, value) {
        let self = this;
        let { settingStore } = self.state;
        self.setState({
            'settingStore': settingStore.map(setting => { if (setting && setting.id === id) { setting.value = value; } return setting; })
        });
    }

    save() {
        let { plugin } = this.props;
        plugin.storage.setSettings(this.state.settingStore);
        plugin.saveSettings();
    }

    renderSetting(setting) {
        let { id, type, text, description, value, multiline } = setting;

        switch (type) {
            case 'bool':
                return (
                    <span key={id}>
                        <CSwitch key={id} id={id} text={text} info={description} checked={value} onChange={this.onChange} />
                        <CUiDivider />
                    </span>
                );
            case 'text':
                if (!multiline) {
                    return (
                        <span key={id}>
                            <CTextbox key={id} initialValue={value} title={text} onChange={e => { this.onChange(id, e.target.value); }} />
                            <CUiDivider />
                        </span>
                    );
                } else {
                    return null;
                }
        }

        return null;
    }
}

export default CPluginCard;



