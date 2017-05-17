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

        const { plugin, reload } = this.state;
        const { settings, verified } = this.props;


        return (
            <div className="bd-card" style={verified ? {} : { border: "1px solid #f04747", boxShadow: "0 0 6px rgba(240,71,71,0.3)"}}>
                <div className="bd-card-info">
                    <CSwitch text={`${plugin.name} v${plugin.version} by ${plugin.authors.join(", ")}`} info="" checked={plugin.enabled} disabled={reload} onChange={this.onChange} />
                    <CScroller dark={true} fade={true}>{plugin.description}</CScroller>
                </div>
                {this.renderControls}
                <ICPluginSettings key="ps" plugin={plugin} visible={settings} settingStore={JSON.parse(JSON.stringify(plugin.settings))} />
            </div>
        )
    }

    onChange(id, checked) {
        const { plugin } = this.state;
        const { PluginManager } = this.props;
        if (checked) {
            PluginManager.startPlugin(plugin.name);
            this.setState({});
            return;
        }
        PluginManager.stopPlugin(plugin.name);
        this.setState({});
    }

    reload() {
        const { plugin } = this.state;
        const { PluginManager, settingsHandler } = this.props;
        settingsHandler(null);
        this.setState({
            'reload': true
        });

        PluginManager.reloadPlugin(plugin.name, plugin => {
            this.setState({
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

        const { plugin, reload } = this.state;
        const { settingsHandler, verified } = this.props;

        return (
            <div className="bd-card-controls">
                {!verified &&
                    <div className="title" style={{ color: "rgb(240, 71, 71)", fontSize: "14px", lineHeight: "32px", fontWeight: "700" }}>Unverified plugin. Use at your own risk!</div>
                }
                <div style={{ flex: "1 1 auto" }}></div>

                <CUiButton disabled={reload} onClick={() => { settingsHandler(plugin.name); }} tooltip={{ 'text': 'Settings' }}>
                    <CFontAwesome name="cog"/>
                </CUiButton>
                <CUiButton disabled={reload} onClick={this.reload} tooltip={{ 'text': 'Reload' }}>
                    <CFontAwesome name={`refresh${reload ? ' fa-spin' : ''}`}/>
                </CUiButton>
                <CUiButton disabled={reload} type="red" onClick={() => { console.log("uninstall"); }} tooltip={{ 'text': 'Uninstall' }}>
                    <CFontAwesome name="trash"/>
                </CUiButton>
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
        const { settingStore } = this.state;
        const { plugin, visible } = this.props;
        const { settingsPanel } = plugin;

        let _panel = null;

        if (React.isValidElement(settingsPanel)) {
            _panel = settingsPanel;
        } else {
            _panel = (<div> {settingStore.map(setting => {
                return this.renderSetting(setting);
            })}</div>);
        }

        let column = <CContentColumn key="sco" style={{ padding: "0", minHeight: "0", marginTop: "10px" }} children={_panel} />;

        return (
            <div className="bd-card-settings" style={{ maxHeight: visible ? "200px" : "0" }}>
                <CScroller dark={true} fade={true} children={column} />
                {this.controls}
            </div>
        );
    }

    get controls() {
        return (
            <div className="bd-card-settings-controls" key="sc" style={{ display: "flex" }}>
                <div style={{ flex: "1 1 auto" }}></div>
                <CUiButton disabled={false} onClick={() => { this.setState({ 'settingStore': this.defaultSettings }) }} tooltip={{ 'text': 'Default' }}>
                    <CFontAwesome name="cog"/>
                </CUiButton>

                <CUiButton disabled={false} onClick={this.save} tooltip={{ 'text': 'Save' }}>
                    <CFontAwesome name="check"/>
                </CUiButton>
            </div>
        );
    }

    get defaultSettings() {
        const { plugin } = this.props;
        const defaults = JSON.parse(JSON.stringify(plugin.storage.defaultConfig));

        const red = defaults.reduce((arr, item) => {
            if (item.id === 'enabled') return arr;
            arr.push(item);
            return arr;
        }, []);

        red.push({ 'id': 'enabled', 'value': plugin.enabled });

        return red;
    }

    onChange(id, value) {
        const { settingStore } = this.state;
        this.setState({
            'settingStore': settingStore.map(setting => { if (setting && setting.id === id) { setting.value = value; } return setting; })
        });
    }

    save() {
        const { plugin } = this.props;
        const { settingStore } = this.state;

        const red = settingStore.reduce((arr, item) => {
            if (item.id === 'enabled') return arr;
            arr.push(item);
            return arr;
        }, []);

        red.push({ 'id': 'enabled', 'value': plugin.enabled });

        plugin.storage.setSettings(red);
        plugin.saveSettings();
    }

    renderSetting(setting) {
        const { id, type, text, description, value, multiline } = setting;

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