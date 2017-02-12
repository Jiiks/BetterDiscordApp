"use strict";

const React = require("../vendor/react");
const ReactDOM = require("../vendor/reactdom");
import { Component } from 'React';

class CButton extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button>{this.props.text}</button>
        )
    }

}

export default CButton;