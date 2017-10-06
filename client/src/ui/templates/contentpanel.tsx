/**
 * BetterDiscord Content Panel Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ReactComponent } from '../components/reactcomponent';

interface IContentPanelProps {
    name: string;
}

export class ContentPanel extends ReactComponent<IContentPanelProps, IContentPanelProps> {

    public bindings(): void {  }

    public setInitialState(props: IContentPanelProps): void { }

    public render() {
        const { name, children } = this.props;
        const lower = name.toLowerCase();

        return (
            <div className={`bd-panel bd-panel-${lower}`}>
                <h2 className="bd-panel-title bd-margin-bottom-20 bd-line-height-20 bd-weight-semibold bd-size-16">{name}</h2>
                <div className={`bd-${lower}-container`}>
                    {children}
                 </div>
            </div>
        );
    }
}