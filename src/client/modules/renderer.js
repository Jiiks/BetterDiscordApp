"use strict";

const ISingleton = require('../interfaces/isingleton');
const React = require("../vendor/react");
const ReactDOM = require("../vendor/reactdom");
const $ = require('../vendor/jquery');

class Renderer extends ISingleton {
    
    constructor() {
        super("renderer");
    }

    get react() {
        return React;
    }

    get reactDom() {
        return ReactDOM;
    }

    rawRender(...args) {
        ReactDOM.render(...args);
    }

    render(root, component) {
        let re = ReactDOM.render(component, root[0]);
        return {
            "root": root,
            "element": re,
            "remove": () => root.remove()
        }
    }

    insertBefore(selector, root, component) {
        root.insertBefore($(selector));
        return this.render(root, component);
    }

    insertAfter(selector, root, component) {
        root.insertAfter($(selector));
        return this.render(root, component);
    }

    append(selector, root, component) {
        root.append($(selector));
        return this.render(root, component);
    }


}

module.exports = new Renderer();