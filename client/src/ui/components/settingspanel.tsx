/**
 * BetterDiscord Settings Panel Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

declare var window: any;

import * as React from 'react';
const { ipcRenderer } = window.require('electron');

import { BdMultiComponent, CPluginCard } from './';
import { IComponentDefs } from '../../interfaces';
import { EInjectMethod } from '../../enums';
import { DH } from '../../modules/helpers';
import { DOM } from './../dom';
import { Events, PluginManager, CssEditor, Plugin } from '../../modules';
import { ReactComponent } from './reactcomponent';

import { Sidebar, ContentRegion, ContentPanel, MaterialIcon } from '../templates';

interface IComponentState {
    selectedId: string;
}

interface ISidebarItem {
    id: string;
    text: string;
}

interface IPluginsPanel {
    localPlugins: Plugin[];
    loading?: boolean;
}

class PluginsPanel extends ReactComponent<IPluginsPanel, IPluginsPanel> {

    public bindings(): void {
        this.reloadLocal = this.reloadLocal.bind(this);
    }

    public setInitialState(props: IPluginsPanel): void {
        this.state = props;
    }

    public render() {

        if (this.state.loading) return <div>Loading</div>;

        return (
            <ContentPanel name='Plugins'>
                <div className='bd-plugins-tabs bd-flex-row'>
                    <div className='bd-plugins-tab bd-weight-semibold bd-selected'>Local
                        <div className='bd-plugins-opendir' onClick={this.openDir}>
                            <MaterialIcon icon='folder'/>
                        </div>
                        <div className='bd-plugins-refresh' onClick={this.reloadLocal}>
                            <MaterialIcon icon='refresh' />
                        </div>
                    </div>
                    <div className='bd-plugins-tab bd-weight-semibold'>Online
                        <div className="bd-plugins-refresh">
                            <MaterialIcon icon="refresh" />
                        </div>
                    </div>
                </div>
                <div className='bd-plugins-local bd-plugins-list'>
                    {this.localPlugins}
                </div>
                <div className='bd-plugins-online bd-plugins-list'>

                </div>
            </ContentPanel>
        );
    }

    private get localPlugins(): JSX.Element[] {
        return this.state.localPlugins.map((plugin: Plugin, index: number) => {
            return <CPluginCard key={index} plugin={plugin} uninstall={this.uninstallPlugin}/>;
        });
    }

    private uninstallPlugin(): void {}

    private reloadLocal(): void {
        this.setState({ loading: true });
        PluginManager.loadPlugins().then(localPlugins => {
            this.setState({ localPlugins, loading: false });
        });
    }

    private openDir() {
        ipcRenderer.send('bd-async', { 'module': 'settingspanel', 'command': 'opendir', 'dir': 'plugindir' });
    }
}

class CorePanel extends ReactComponent<any, any> {

    public bindings(): void { }
    public setInitialState(props: any): void { }

    public render() {
        return (<ContentPanel name='Core'/>);
    }
}

class EmotesPanel extends ReactComponent<any, any> {

    public bindings(): void { }
    public setInitialState(props: any): void { }

    public render() {
        return (<ContentPanel name='Emotes' />);
    }
}

class ThemesPanel extends ReactComponent<any, any> {

    public bindings(): void { }
    public setInitialState(props: any): void { }

    public render() {
        return (<ContentPanel name='Themes' />);
    }
}

export class CSettingsPanel extends BdMultiComponent {

    private _sideBar: IComponentDefs;
    private _contentPanel: IComponentDefs;
    private _lastSelected: any;
    private _selectedClassName: string;
    private _notSelectedClassName: string;

    constructor() {
        super();
        Events.on('global.click', e => {
            const target: any = e.target as any;
            if(
                !target 
                || !target.className 
                || !target.className.includes 
                || !target.parentElement 
                || !target.parentElement.className 
                || !target.parentElement.className.includes
            ) return;

            if(target.className.includes('itemDefault') && target.parentElement.className.includes('side')) {
                if(target === this._lastSelected) target.className = this._selectedClassName;
                this._lastSelected = target;
                this.switch(null);
            }
        });
    }

    public render(): void {
        super.render();
        this._selectedClassName = DH.selectedItemClassName;
        this._notSelectedClassName = DH.notSelectedItemClassName;
        this._lastSelected = DH.selectedItem;
    }

    protected bindings(): void {
        this.switch = this.switch.bind(this);
    }

    protected get componentDefs(): IComponentDefs[] {
        return [
            this.sideBar,
            this.contentPanel
        ];
    }

    /*Sidebar*/
    private get sideBar(): IComponentDefs {
        if(this._sideBar) {
            this._sideBar.root = DH.sideBarRoot;
            return this._sideBar;
        }

        return (this._sideBar = {
            root: DH.sideBarRoot,
            container: DOM.createElement('div', 'bd-sidebar'),
            reactComponent: <Sidebar selectedId='none' items={this.sidebarItems} onClick={this.switch} title='BetterDiscord v2: DP3'/>,
            method: EInjectMethod.insertBefore
        });
    }

    private get sidebarItems(): ISidebarItem[] {
        return [
            { 'id': 'core', 'text': 'Core' },
            { 'id': 'emotes', 'text': 'Emotes' },
            { 'id': 'plugins', 'text': 'Plugins' },
            { 'id': 'themes', 'text': 'Themes' },
            { 'id': 'css', 'text': 'Custom CSS' }
        ];
    }

    /*Panel*/
    private get contentPanel(): IComponentDefs {
        if(this._contentPanel) {
            this._contentPanel.root = DH.settingsPanelRoot;
            return this._contentPanel;
        }

        return (this._contentPanel = {
            root: DH.settingsPanelRoot,
            container: DOM.createElement('div', 'bd-content-region bd-hidden'),
            reactComponent: <ContentRegion hidden={false} selectedId='none' panels={this.panels}/>,
            method: EInjectMethod.insertAfter
        });
    }

    private get panels(): any[] {
        return [
            { 'id': 'core', 'element': <CorePanel/> },
            { 'id': 'emotes', 'element': <EmotesPanel/>},
            { 'id': 'plugins', 'element': <PluginsPanel localPlugins={PluginManager.Plugins}/> },
            { 'id': 'themes', 'element': <ThemesPanel/> },
            { 'id': 'css', 'element': <span/> }
        ];
    }

    protected update(oldState: IComponentState, newState: IComponentState): void {
        this.setComponentState(newState, this.sideBar);
        this.setComponentState(newState, this.contentPanel);
    }

    private switch(selectedId: string): void {
        if(!selectedId) {
            this.addContainerClass('bd-hidden', this.contentPanel);
            DH.settingsPanelRoot.classList.remove('bd-hidden');
        } else {
            this.removeContainerClass('bd-hidden', this.contentPanel);
            this._lastSelected.className = this._notSelectedClassName;
            DH.settingsPanelRoot.classList.add('bd-hidden');
        }

        if (selectedId === 'css') {
            CssEditor.open();
            return;
        }
        this.setState({
            selectedId
        });
    }

}