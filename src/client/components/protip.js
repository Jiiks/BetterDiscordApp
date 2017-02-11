"use strict";

const React = require("React");
import { Component } from 'React';
import CLink from './link';

class CProTip extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-bd="protip" className="protip">
                <div className="tip">
                    {this.props.title}
                    {(this.props.link !== undefined) &&
                    <CLink id={this.props.link.key} text={this.props.link.text} onClick={this.props.link.onClick} />
                    } 
                    {(this.props.links !== undefined) &&
                    this.props.links.map((value, index, array) => {
                        return (
                            <span key={value.key}>
                                <CLink style={{float: "right"}} id={value.key} text={value.text} onClick={value.onClick}/>
                                {(index !== array.length -1) &&
                                <span style={{float: "right"}}>-</span>
                                }
                            </span>
                            )
                    })
                    }
                </div>
            </div>
            )
    }

}

export default CProTip;