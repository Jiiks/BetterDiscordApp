/**
 * BetterDiscord Plugin Card Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { Plugin, PluginManager } from '../../modules';
import { EButtonType, CButton, CInlineButton } from './button';
import { CMaterialIcon, CSwitch } from './';
import { ReactComponent } from './reactcomponent';

export interface IPluginCard {
    plugin: Plugin,
    uninstall: Function,
    settingsOpen?: boolean,
    uninstallDialog?: boolean
}

export class CPluginCard extends ReactComponent<IPluginCard, IPluginCard> {

    protected bindings(): void {
        this.uninstall = this.uninstall.bind(this);
        this.uninstallDialog = this.uninstallDialog.bind(this);
        this.enableDisable = this.enableDisable.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.reload = this.reload.bind(this);
    }

    protected setInitialState(props: IPluginCard): void {
        this.state = props;
    }

    public render() {
        const { settingsOpen, uninstallDialog, plugin } = this.state;
        const { enabled, info } = plugin;

        if (uninstallDialog) return this.renderUninstallDialog;

        return (
            <div className={`bd-plugincard bd-margin-top-20${settingsOpen ? ' bd-plugincard-settings' : ''}`}>
                <div className='bd-plugincard-inner bd-plugincard-info bd-flex-column'>
                    <div className='bd-flex-row bd-margin-bottom-8'>
                        <div className='bd-plugincard-name bd-weight-semibold bd-line-height-24'>
                            {info.name} - <span className='bd-transform-normal'>v{info.version} by {info.authors.join(', ')}</span>
                        </div>
                        <CSwitch checked={enabled} onClick={this.enableDisable}/>
                    </div>
                    <div className='bd-flex-row'>
                        <div className='bd-plugincard-description bd-scroller bd-weight-semibold bd-size-12'>{info.description}</div>
                    </div>
                    <div className='bd-flex-row bd-margin-top-8'>
                        <div className='bd-flex-spacer'/>
                        <div className='bd-plugin-controls'>
                            <CInlineButton icon='settings' left={true} onClick={() => this.toggleSettings(true)} type={EButtonType.default}/>
                            <CInlineButton icon='refresh' right={true} onClick={this.reload} type={EButtonType.default}/>
                        </div>
                    </div>
                    <div className='bd-plugincard-uninstall' onClick={this.uninstallDialog}/>
                </div>
                <div className='bd-plugincard-inner bd-plugincard-settings bd-flex-column'>
                    <div className='bd-flex-row bd-plugincard-back'>
                        <CButton icon='keyboard_backspace' type={EButtonType.green} onClick={() => this.toggleSettings(false)}/>
                        <div className='bd-plugincard-name bd-weight-semibold bd-line-height-30 bd-margin-left-8'>
                            {info.name} - Settings
                        </div>
                    </div>
                    <div className='bd-flex-row bd-margin-top-8'>
                        <div className='bd-scroller bd-plugincard-settings-scroller'>
                            {this.state.plugin.settingsPanel}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private get renderUninstallDialog(): JSX.Element {
        const { info } = this.state.plugin;
        return (
            <div className='bd-plugincard bd-margin-top-20'>
                <div className='bd-plugincard-inner bd-plugincard-info bd-flex-column bd-plugincard-uninstall-dialog'>
                    <div className='bd-flex-row bd-margin-top-8'>
                        <span className='bd-weight-bold bd-white bd-margin-auto'>Uninstall {info.name}?</span>
                    </div>
                    <div className='bd-flex-row bd-margin-top-8'>
                        <div className='bd-margin-auto bd-plugincard-uninstall-delconfig bd-flex-row'>
                            <span className='bd-dark-gray bd-semibold'>Delete configuration?</span>
                            <CSwitch checked={false} onClick={() => { }} />
                        </div>
                    </div>
                    <div className='bd-flex-row bd-margin-auto'>
                        <CButton icon='keyboard_backspace' type={EButtonType.green} onClick={this.uninstallDialog} />
                        <CButton icon='delete_forever' type={EButtonType.red} onClick={() => { this.state.uninstall(info.name, false) }}  />
                    </div>
                </div>
            </div>
        );
    }

    private uninstallDialog(): void {
        this.setState({
            uninstallDialog: !this.state.uninstallDialog
        });
    }

    private enableDisable(): void {
        const { info, enabled } = this.state.plugin;

        if(enabled) {
            PluginManager.stopPlugin(info.name).then(plugin => {
                this.setState({plugin});
            });
            return;
        }

        PluginManager.startPlugin(info.name).then(plugin => {
            this.setState({plugin});
        });
    }

    private toggleSettings(settingsOpen: boolean) : void {
        this.setState({
            settingsOpen
        });
    }

    private reload(): void {
        const { info } = this.state.plugin;
        PluginManager.reloadPlugin(info.name).then(plugin => {
            console.log(plugin);
            this.setState({plugin});
        });
    }

    private uninstall(): void {
        const { info } = this.state.plugin;

    }
}