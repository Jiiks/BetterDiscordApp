/**
 * BetterDiscord Component definitions interface
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

import { EInjectMethod } from "../enums";

export interface IComponentDefs {
    root: Node | Element | any,
    container: Node | Element | any,
    reactComponent: any,
    injected?: Node | Element,
    instance?: Element | void | React.Component,
    method: EInjectMethod
}