class Button extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button className="btn btn-primary" onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}

var element = Button;