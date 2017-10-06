/**
 * BetterDiscord Sidebar Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ReactComponent } from '../components/reactcomponent';

interface ISidebarProps {
    selectedId: string;
    onClick: any;
    title: string;
    items: ISidebarItem[];
}

interface ISidebarItem {
    id: string;
    text: string;
}

export class Sidebar extends ReactComponent<ISidebarProps, ISidebarProps> {

    protected bindings(): void { }
    protected setInitialState(props: ISidebarProps): void {
        this.state = props;
    }

    public render() {
        const { selectedId, items, title } = this.state;
        return (
            <div>
                <div className="bd-sidebar-header">{title}</div>
                {items.map(item => {
                    const selected = item.id === selectedId;
                    return <div key={item.id} className={`bd-sidebar-item${selected ? ' bd-selected' : ''}`} onClick={() => this.props.onClick(item.id)}>{item.text}</div>
                })}
                <div className="bd-sidebar-separator" />
            </div>
        );
    }

}