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

const { $ } = require('../vendor');

class Reflection {

    constructor() {}

    getReactInternalInstance(o) {
        if(!o) return null;
        if(o instanceof $) o = o.last()[0];
        let instance = o[Object.keys(o).filter(key => key.indexOf("__reactInternalInstance") !== -1)];
        if(!instance) return null;
        return instance;
    }

    getProps(o) {
        if(o.props) return o.props;
        if(!o[0]) return null;
        if(o[0].props) return o[0].props;
        return null;
    }

    getChildren(o) {
        if(o.children) return o.children;
        if(!o[0]) return null;
        if(o[0].children) return o[0].children;
        return null;
    }

    next(o) {
        return o.props ? { t: 'p', p: o.props } : o.children ? { t: 'c', c: o.children} : null;
    }

    scan(t, o, p) {
        let self = this;
        if(!o) return null;
        if(self.ic(o, $)) o = self.getReactInternalInstance(o);

        if(o.hasOwnProperty(p)) return o[p];

        switch(t) {
            case 'p':
                return self.sp(o, p);
            case 's':
                return self.ss(o, p);
        }
    }

    sp(o, p) {
        if(!o) return null;
        let self = this;

        if(o.hasOwnProperty(p)) return o[p];
        if(o.hasOwnProperty('_currentElement')) o = o._currentElement;

        let n = self.next(o);
        if(!n) return null;


        return {
            'p': self.sp(n.p, p),
            'c': (() => {
                if(!self.ic(n.c, Array)) return self.sp(n.c, p);
                for(var i = 0 ; i < n.c.length ; i++) {
                    let c = n.c[i];
                    if(self.ic(c, Array)) {
                        let r = self.sp(c[0], p);
                        if(r) {
                            return r;
                        }
                    } else {
                        let r = self.sp(c, p);
                        if(r) {
                            return r;
                        }
                    } 
                }
                return null;
            })()
        }[n.t];

    }

    ss(o, p) {
        if(!o) return null;
        let self = this;
        if(o.hasOwnProperty(p)) return o[p];
        if(o.hasOwnProperty('_renderedChildren')) o = o._renderedChildren;
        if(o.hasOwnProperty('_instance')) return self.ss(o._instance, p);
        if(o.hasOwnProperty('state')) return self.ss(o.state, p);

        if(!self.ic(o, Object)) return null;

        let os = o[Object.keys(o).filter(k => {
            if(!o[k].hasOwnProperty('_instance')) return false;
            let instance = o[k]._instance;
            if(!instance.hasOwnProperty('state')) return false;
            return instance.state;
        })];

        if(os) {
            return self.ss(os, p);
        }
        
        return null;

    }

    ic(o, t) {
        return o instanceof t;
    }

    getFirstInstance(o) {
        let self = this;

        o = self.getReactInternalInstance(o);
        if (!o) return null;

        if (!o.hasOwnProperty("_renderedChildren")) return null;
        let rc = o._renderedChildren;
        let f = rc[Object.keys(rc)[0]];

        if (!f.hasOwnProperty("_instance")) return null;
        return f._instance;
    }

    overrideFunction(s, o, n) {
        s = s || this;
        return function(...args) {
            n.apply(s, args);
            o.apply(s, args);
        }
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



