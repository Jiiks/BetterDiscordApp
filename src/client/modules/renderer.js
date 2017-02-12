"use strict";

const React = require("../vendor/react");
const ReactDOM = require("../vendor/reactdom");
const $ = require('../vendor/jquery');

class Renderer  {
    
    constructor() {

    }

    static get react() {
        return React;
    }

    static get reactDom() {
        return ReactDOM;
    }

    static rawRender(...args) {
        ReactDOM.render(...args);
    }

    static render(root, component) {
        let re = ReactDOM.render(component, root[0]);
        return {
            "root": root,
            "element": re,
            "remove": () => root.remove()
        }
    }

    static insertBefore(selector, root, component) {
        root.insertBefore($(selector));
        return this.render(root, component);
    }

    static insertAfter(selector, root, component) {
        root.insertAfter($(selector));
        return this.render(root, component);
    }


    static append(selector, root, component) {
        root.append($(selector));
        return this.render(root, component);
    }

    static appendTo(selector, root, component) {
        root.appendTo($(selector));
        return this.render(root, component);
    }

    static prepend(selector, root, component) {
        $(selector).prepend(root);
        return this.render(root, component);
    }

    static prependTo(selector, root, component) {
        $(selector).prepend(root);
        return this.render(root, component);
    }

    static replaceWith(selector, root, component) {
        $(selector).replaceWith(root);
        return this.render(root, component);
    }


}

module.exports = Renderer;