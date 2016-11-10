class CheckboxGroup extends React.Component {
    
    constructor(props) { super(props); }
    
    onClick(index) {
        this.props.settings[index].checked = !this.props.settings[index].checked;
        this.setState();
    }
    
    get items() {
        return this.props.settings.map((c, i) => {
            return (
                <li>
                    <Checkbox data={c} onClick={this.onClick.bind(this, i)}/>
                </li>
            )
        }, this);
    }
    
    render() {
        return(
            <div className="control-groups">
                <div className="control-group">
                    <ul className="checkbox-group">{this.items}</ul>
                </div>
            </div>
        )
    }
}

var element = CheckboxGroup;