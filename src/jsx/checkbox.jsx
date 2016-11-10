class Checkbox extends React.Component {
    constructor(props) {super(props);}
    
    render() {
        return(
            <span>
                <div className="checkbox" onClick={this.props.onClick}>
                    <div className="checkbox-inner">
                        <input type="checkbox" checked={this.props.data.checked}></input>
                        <span/>
                    </div>
                    <span>{this.props.data.title}</span>
                </div>
                <div className="help-text">{this.props.data.helptext}</div>
            </span>
        )
    } 
}

var element = Checkbox;