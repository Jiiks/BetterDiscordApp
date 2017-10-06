/**
 * BetterDiscord Content Region Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ReactComponent } from '../components/reactcomponent';

import { BdComponent, BdMultiComponent, CPluginCard, CButton, CMaterialIcon } from '../components';

interface IContentRegionProps {
    hidden: boolean;
    selectedId: string;
    panels: any;
}

export class ContentRegion extends ReactComponent<IContentRegionProps, IContentRegionProps> {

    public bindings(): void {}

    public setInitialState(props: IContentRegionProps): void {
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
        const { selectedId, panels } = this.state;
        if (!selectedId || selectedId === 'none') return <span/>;
        return panels.find((panel: any) => panel.id === selectedId).element;
    }
}

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