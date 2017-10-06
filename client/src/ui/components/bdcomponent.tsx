/**
 * BetterDiscord Component Base Class
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IComponentDefs } from '../../interfaces';
import { DOM } from './../dom';
import { EInjectMethod } from '../../enums';

export abstract class BdComponent {
    _state: any;

    protected abstract get componentDef(): IComponentDefs;
    protected abstract update(oldState: any, newState: any): void;
    protected abstract bindings(): void;

    protected constructor() {
        this.unmount = this.unmount.bind(this);
        this.bindings();
    }

    protected get state() { return this._state || {}; }
    protected setState(state: any): void {
        const oldState = Object.assign({}, this.state);
        this._state = Object.assign(this.state, state);
        this.update(oldState, this.state);
    }

    protected inject(): void {
        const { componentDef } = this;
        if(!componentDef.root || !componentDef.container) return;
        componentDef.injected = DOM.appendChild(componentDef.root, componentDef.container);
    }


    protected insertBefore(target: Node, child: Node): Node {
        const parent = target.parentNode;
        return parent.insertBefore(child, target);
    }

    protected insertAfter(target: Node, child: Node): Node {
        const parent = target.parentNode;

        if(parent.lastChild === target) {
            return parent.appendChild(child);
        }

        return parent.insertBefore(child, target.nextSibling);
    }

    public render(): void {
        this.inject();
        const { componentDef } = this;
        if(!componentDef.injected || !componentDef.reactComponent) return;
        componentDef.instance = ReactDOM.render(componentDef.reactComponent, componentDef.container as Element);
    }

    protected setComponentState(state: any, componentDef: IComponentDefs = this.componentDef): void {
        if(!state || !componentDef || !componentDef.instance) return;
        (componentDef.instance as React.Component).setState(state);
    }

    protected addContainerClass(className: string, componentDef: IComponentDefs = this.componentDef): void {
        if(!className || !componentDef) return;
        const container = componentDef.container as Element;
        container.classList.add(className);
    }

    protected removeContainerClass(className: string, componentDef: IComponentDefs = this.componentDef): void {
        if(!className || !componentDef) return;
        const container = componentDef.container as Element;
        container.classList.remove(className);
    }

    protected unmount(componentDef: IComponentDefs = this.componentDef): void {
        ReactDOM.unmountComponentAtNode(componentDef.container);
        setTimeout(() => componentDef.container.remove(), 500);
    }
}

export abstract class BdMultiComponent extends BdComponent {

    protected componentDef: IComponentDefs;
    protected abstract get componentDefs(): IComponentDefs[];
    protected abstract update(oldState: any, newState: any): void;
    protected abstract bindings(): void;

    protected inject(): void {
        const { componentDefs } = this;
        componentDefs.forEach(componentDef => {
            if(!componentDef.root || !componentDef.container) return;
            switch(componentDef.method) {
                case EInjectMethod.append:
                    componentDef.injected = DOM.appendChild(componentDef.root, componentDef.container);
                    break;
                case EInjectMethod.insertAfter:
                    componentDef.injected = DOM.insertAfter(componentDef.root, componentDef.container);
                    break;
                case EInjectMethod.insertBefore:
                    componentDef.injected = DOM.insertBefore(componentDef.root, componentDef.container);
                    break;
            }
        });
    }

    public render(): void {
        this.inject();
        const { componentDefs } = this;
        componentDefs.forEach(componentDef => {
            if(!componentDef.injected || !componentDef.reactComponent) return;
            componentDef.instance = ReactDOM.render(componentDef.reactComponent, componentDef.container as Element);
        });
    }

}