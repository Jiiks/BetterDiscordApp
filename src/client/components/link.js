"use strict";

const React = require("React");
import { Component } from 'React';

class CLink extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <a onClick={() => this.props.onClick(this.props.id)}>{this.props.text}</a>
    }

}

export default CLink;