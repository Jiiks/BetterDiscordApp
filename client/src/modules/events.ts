/**
 * BetterDiscord Events Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

declare var window : any;

import * as EventEmitter from 'events';

interface IEvent {
    name: string
}

export class Events {
    static emitter: EventEmitter = new EventEmitter();
    static events: Map<string, any> = new Map<string, any>();

    static on(eventName: string, callBack: (args: any) => void): void {
        this.events.set(eventName, callBack);
        this.emitter.on(eventName, callBack);
    }

    static off(eventName: string): void {
        this.emitter.removeListener(eventName, this.events.get(eventName));
    }

    static emit(name: string, ...args: any[]) {
        this.emitter.emit(name, ...args);
    }

}