class TabBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return { selectedIndex: 0 };
    }
    
    get tabs() {
        return this.props.tabs.map((c, i) => {
            return (<TabBarItem text={c.title} selected={this.props.activeTabIndex === i} switchTab={this.props.switchTab.bind(null, i)}/>) 
        }, this);
        
    }
    
    render() {
        return (<div className="tab-bar TOP">{this.tabs}</div>);
    }
}

var element = TabBar;