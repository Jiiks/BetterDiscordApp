"use strict";

const React = require("React");
import { Component } from 'React';

class CLink extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <a style={this.props.style} onClick={() => this.props.onClick(this.props.id)}>{this.props.text}</a>
    }

}

export default CLink;