"use strict";

const React = require("React");
import { Component } from 'React';

class CCheckBox extends Component {
    
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            checked: this.props.checked
        };
    }

    render() {
        return (
            <span>
                <li>
                    <div onClick={this.onClick} className="checkbox">
                        <div className="checkbox-inner">
                            <input onChange={this.onChange} checked={this.state.checked} type="checkbox"/>
                            <span/>
                        </div>
                        <span>{this.props.text}</span>
                    </div>
                </li>
                {this.props.helptext !== undefined &&
                <li>
                    <div className="help-text">{this.props.helptext}</div>
                </li>
                }
            </span>
        )
    }

    onClick() {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onChange(!this.state.checked);
    }

    onChange() {

    }
}

export default CCheckBox;