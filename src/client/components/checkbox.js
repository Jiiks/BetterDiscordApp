"use strict";

const React = require("React");
import { Component } from 'React';

class CheckBox extends Component {
    
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <span>
                <li>
                    <div className="checkbox">
                        <div className="checkbox-inner">
                            <input type="checkbox"/>
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

}

export default CheckBox;