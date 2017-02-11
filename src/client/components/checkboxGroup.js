"use strict";

const React = require("React");
import { Component } from 'React';
import CCheckbox from './checkbox';

class CCheckboxGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="checkbox-group">
            {this.props.item.map(value => {
                return <CCheckbox checked={value.checked} onChange={() => {}} key={value.key} text={value.text} helptext={value.helptext} />
            })}
            </ul>
            )
    }

}

export default CCheckboxGroup;