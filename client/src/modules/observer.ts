/**
 * BetterDiscord Observer Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

import { BdModule } from './bdmodule';
import { Events } from "./";

const observerDefaultOptions = {
    childList: true as boolean,
    subtree: true as boolean
};

export class Observer extends BdModule {
    observer: MutationObserver;

    constructor() {
        super();
    }

    public get name(): string { return "Observer" }

    protected bindings(): void {
        this.observe = this.observe.bind(this);
        this.observerCallback = this.observerCallback.bind(this);
        this.mutationHandler = this.mutationHandler.bind(this);
    }

    public cleanup(): void {
        this.observer.disconnect();
    }
    /**
     * Start observer
     * @param options MutationObserver options
     */
    public observe(options: object = observerDefaultOptions): void {
        if (this.observer) return;

        this.observer = new MutationObserver(this.observerCallback);
        this.observer.observe(document, options);
    }

    /**
     * MutationObserver callback
     * @param mutations Mutation objects
     */
    private observerCallback(mutations: Array<object>): void {
        mutations.forEach(this.mutationHandler);
    }

    /**
     * Mutation iterator
     * @param mutation Mutation object
     */
    private mutationHandler(mutation: any): void {
        const { type, addedNodes, target } = mutation;
        if(type === 'childList') {
            Events.emit('mutation.childList', mutation);
            return;
        }
        Events.emit('mutation', mutation);
       // if(type !== 'childList' || !addedNodes || addedNodes.length <= 0 || !target || !target.className.includes('layers')) return;

      //  console.log("Settings Panel?");
      //  console.log(mutation);
    }

}