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

	static getReactInternalInstance(node) {
	    if(this.checkInstance(node, $)) node = node[0];
		let instance = node[Object.keys(node).filter(key => key.indexOf("__reactInternalInstance") !== -1)];
		if(!instance) return null;
		return instance;
	}

	static checkInstance(e, ...types) {
		return types.some(type => e instanceof type);
	}

	static checkType(e, ...types) {
		return types.some(type => typeof e === type);
	}
    
	static propertyIterator(arr, key) {
		if(!arr) return null;
		if(arr.hasOwnProperty(key)) return arr[key];

		for(var i = 0 ; i < arr.length ; i++) {
		    let item = arr[i];
		    if(!item || !item.hasOwnProperty("props")) continue;
		    let props = item.props;
		    if(props.hasOwnProperty(key)) { 
		        return props[key]; 
		    }

		    let cs = this.propertyScanner(props.children, key);
		    if(cs !== null && cs !== undefined) return cs;
		}
	}

	static propertyScanner(arr, key) {
		if(!arr) return null;
		if(arr.hasOwnProperty(key)) return arr[key];
		
		if(!this.checkInstance(arr, Array)) {
		    if(arr.hasOwnProperty("children")) return this.propertyScanner(arr.children, key);
		    if(arr.hasOwnProperty("props")) return this.propertyScanner(arr.props, key);
		}
		
		return this.propertyIterator(arr, key);
	}

	static currentElementScanner(internalInstance, key) {
	    if(!internalInstance.hasOwnProperty('_currentElement')) return null;
	    let _currentElement = internalInstance._currentElement;
	
	    if(!_currentElement.hasOwnProperty('props')) return null;
	    let props = _currentElement.props;
	
	    if(!props.hasOwnProperty('children')) return null;

	    return this.propertyScanner(props.children, key);
	}

	static stateIterator(arr, key) {
	    if(!arr) return null;
	    if(arr.hasOwnProperty(key)) return arr[key];

	    for(var i = 0 ; i < arr.length ; i++) {
	        let item = arr[i];
	        if(!item || !item.hasOwnProperty("_instance")) continue;
	        let instance = item._instance;
	        if(!instance.hasOwnProperty("state")) continue;
	        let state = instance.state;
			if(!state) continue;
	        if(state.hasOwnProperty(key)) return state[key];
	    }
	}

	static stateScanner(arr, key) {
	    if(!arr) return null;
	    if(arr.hasOwnProperty(key)) return arr[key];

	    let reduce = Object.keys(arr).reduce((_arr, key) => {
	        _arr.push(arr[key]);
	        return _arr;
	    }, []);
	
	    return this.stateIterator(reduce, key);
	}

	static renderedChildrenScanner(internalInstance, key) {
	    if(!internalInstance.hasOwnProperty('_renderedChildren')) return null;
	
	    return this.stateScanner(internalInstance._renderedChildren, key);
	}

	static scan(node, key) {
		if(this.checkType, "string") node = $(node);
		if(!node || !node.length) return null;
	    let internalInstance = this.getReactInternalInstance(node);
	    if(!internalInstance) return null;
	    
	    let ceScan = this.currentElementScanner(internalInstance, key);
	    if(ceScan !== null && ceScan !== undefined) return ceScan;
	    let rcScan = this.renderedChildrenScanner(internalInstance, key);
	    if(rcScan !== null && rcScan !== undefined) return rcScan;
	    return null;
	}

}

module.exports = Reflection;