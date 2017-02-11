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
            {this.props.items.map(value => {
                return <CCheckbox checked={value.checked} onChange={value.onChange} key={value.key} id={value.key} text={value.text} helptext={value.helptext} />
            })}
            </ul>
            )
    }

}

export default CCheckboxGroup;