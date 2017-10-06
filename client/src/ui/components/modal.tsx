/**
 * BetterDiscord Modal Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { DOM } from '../dom';
import { BdComponent } from './';

import { IComponentDefs, IError } from '../../interfaces';
import { EInjectMethod } from '../../enums';
import { Modal } from '../templates';

export class CModal extends BdComponent {

    private modal: IComponentDefs;
    private readonly modalProps: any;

    constructor(props: any) {
        super();
        this.modalProps = props;
    }

    public update(oldState: any, newState: any): void {
        
    }

    public bindings(): void {
        
    }

    public get componentDef(): IComponentDefs {
        if (this.modal) return this.modal;
        return (this.modal = {
            root: DOM.modalContainer,
            container: DOM.createElement('div', 'bd-modal-container'),
            reactComponent: <Modal backDropClick={this.unmount} modalProps={this.modalProps}/>,
            method: EInjectMethod.append
        });
    }
}