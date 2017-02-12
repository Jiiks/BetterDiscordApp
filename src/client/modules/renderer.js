"use strict";

const React = require("../vendor/react");
const ReactDOM = require("../vendor/reactdom");
const $ = require('../vendor/jquery');

class Renderer  {
    
    constructor() { }

    //Get react instance
    static get react() {
        return React;
    }

    //Get react-dom instance
    static get reactDom() {
        return ReactDOM;
    }

    //Render a raw component
    static rawRender(...args) {
        ReactDOM.render(...args);
    }

    //Main render method, returns the root element, component and removal function
    static render(root, component) {
        let re = ReactDOM.render(component, root[0]);
        return {
            "root": root,
            "element": re,
            "remove": () => root.remove()
        }
    }

    //Insert root element before supplied selector
    static insertBefore(selector, root, component) {
        root.insertBefore($(selector));
        return this.render(root, component);
    }

    //Insert root element after supplied selector
    static insertAfter(selector, root, component) {
        root.insertAfter($(selector));
        return this.render(root, component);
    }

    //Append root element to supplied selector
    static append(selector, root, component) {
        root.append($(selector));
        return this.render(root, component);
    }

    //Append root element to supplied selector
    static appendTo(selector, root, component) {
        root.appendTo($(selector));
        return this.render(root, component);
    }

    //Prepend root element to supplied selector
    static prepend(selector, root, component) {
        $(selector).prepend(root);
        return this.render(root, component);
    }

    //Prepend root element to supplied selector
    static prependTo(selector, root, component) {
        $(selector).prepend(root);
        return this.render(root, component);
    }

    //Replace supplied selector with root
    static replaceWith(selector, root, component) {
        $(selector).replaceWith(root);
        return this.render(root, component);
    }


}

module.exports = Renderer;