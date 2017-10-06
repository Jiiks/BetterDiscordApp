/**
 * BetterDiscord DOM Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

declare var document: any;

export class DOM {
    private static _containers: any;

    public static injectContainers(): any {
        if(this._containers) return this._containers;

        const head = this.appendChild(document.head, document.createElement('bd-head'));
        const body = this.appendChild(document.body, document.createElement('bd-body'));
        const style = this.appendChild(head, document.createElement('bd-styles'));
        const script = this.appendChild(body, document.createElement('bd-scripts'));
        const theme = this.appendChild(head, document.createElement('bd-themes'));
        const modal = this.appendChild(body, document.createElement('bd-modals'));
        const customcss = this.appendChild(style, document.createElement('style'));

        return (this._containers = {
            head,
            body,
            style,
            script,
            theme,
            modal,
            customcss
        });
    }

    public static get containers(): any {
        return this._containers || this.injectContainers();
    }

    public static get headContainer() { return this.containers.head; }
    public static get bodyContainer() { return this.containers.body; }
    public static get styleContainer() { return this.containers.style; }
    public static get scriptContainer() { return this.containers.script; }
    public static get themeContainer() {return this.containers.theme; }
    public static get modalContainer() { return this.containers.modal; }
    public static get customCssContainer() { return this.containers.customcss;  }

    public static createElement(type: string = 'div', className: string = null, id: string = null) {
        const element = document.createElement(type);
        if(className) element.className = className;
        if(id) element.id = id;
        return element;
    }

    public static injectStyle(style: string, id: string): void {
        const styleContainer = document.createElement("style");
        styleContainer.id = id;
        styleContainer.textContent = style;
        this.appendChild(this.styleContainer, styleContainer);
    }

    public static injectStyleLink(link: string): void {
        const linkContainer = document.createElement("link");
        linkContainer.href = link;
        linkContainer.rel = "stylesheet";
        this.headContainer.appendChild(linkContainer);
    }

    public static appendChild(parent: Node, child: Node): Node {
        return parent.appendChild(child);
    }

    public static insertBefore(target: Node, child: Node): Node {
        console.log("INSERT BEFORE!");
        const parent: Node = target.parentNode;
        return parent.insertBefore(child, target);
    }

    public static insertAfter(target: Node, child: Node): Node {
        console.log("INSERT AFTER!");
        const parent: Node = target.parentNode;
        if(parent.lastChild == target) {
            return this.appendChild(parent, child);
        }

        return parent.insertBefore(child, target.nextSibling);
    }

}