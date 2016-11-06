var element = React.createClass({
  render: function() {
        return <li>
            <div className="checkbox">
                <div className="checkbox-inner">
                    <input type="checkbox" id={this.props.id}/>
                    <span></span>
                </div>
                <span></span>
            </div>
        </li>
  }
});