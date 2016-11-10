class TabBarItem extends React.Component {
    constructor(props) { super(props); }
    
    get selected() {
        return `tab-bar-item ${this.props.selected ? "selected" : ""}`;
    }
    
    render() {
        return(
            <div className={this.selected} onClick={this.props.switchTab}>{this.props.text}</div>
        )
    }
}

var element = TabBarItem;