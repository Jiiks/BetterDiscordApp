/**
 * BetterDiscord React "Reflection" Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

 'use strict';

 class Reflection {

    constructor() {}

    getReactInternalInstance(node) {
        if(!node) return null;
        let instance = node[Object.keys(node).filter(key => key.indexOf("__reactInternalInstance") !== -1)];
        if(!instance) return null;
        return instance;
    }

    getProps(node) {
        if(node.props) return node.props;
        if(!node[0]) return null;
        if(node[0].props) return node[0].props;
        return null;
    }

    getChildren(node) {
        if(node.children) return node.children;
        if(!node[0]) return null;
        if(node[0].children) return node[0].children;
        return null;
    }

    getMessageProps(node, cb) {
        let self = this;
        let instance = this.getReactInternalInstance(node);
        if(instance === null) {
            cb(null);
            return;
        }
    
        try {
            let props = self.getProps(instance._currentElement);
            let children = self.getChildren(props);

            //Check the last child first
            if(children[0].length > 1) {
                let lastChild = children[0][children[0].length - 1];
                if(self.typecheck(lastChild, "object")) {
                    let props = self.getProps(lastChild);
                    if(props !== null) {
                        cb(props);
                        return;
                    }
                }
            }

            //If last child is not valid go on and check all of them
            children.some((child, index, array) => {
                if(!child) {
                    if(index === array.length - 1) {
                        cb(null);
                        return true;
                    }
                    return false;
                }
                if(!self.typecheck(child, "object")) {
                    if(index === array.length - 1) {
                        cb(null);
                        return true;
                    }
                    return false;
                }
                
                let props = self.getProps(child);
                if(props !== null) {
                    cb(props);
                    return true;
                }
            });

        }catch(err) {
            cb(null);
            return;
        }
    }

    typecheck(e, ...types) {
        return types.some(type => typeof e === type);
    }

 }

module.exports = new Reflection();
