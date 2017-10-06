/**
 * BetterDiscord Helpers Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

/*
* A collection of helpers to keep maintaining in a single place
*/



/*Discord Helper
* Mostly for Discord dom selectors
*/
export class DH {

    static get sideBarRoot(): Element {
        const sidebarItems = document.querySelectorAll('[class*=side] > [class*=item]:not([class*=Danger])');
        return sidebarItems[sidebarItems.length - 1];
    }

    static get settingsPanelRoot(): Element {
        return document.querySelector('[class^=content-region]');
    }

    static get selectedItem(): Element {
        return document.querySelector('[class*=itemDefaultSelected-]');
    }

    static get selectedItemClassName(): string {
        return this.selectedItem.className;
    }

    static get notSelectedItemClassName(): string {
        return document.querySelector('[class*=itemDefault-]').className;
    }

}