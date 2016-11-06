define([], () => {

var element = React.createClass({displayName: "element",
  render: function() {
        return React.createElement("li", null, 
            React.createElement("div", {className: "checkbox"}, 
                React.createElement("div", {className: "checkbox-inner"}, 
                    React.createElement("input", {type: "checkbox", id: this.props.id}), 
                    React.createElement("span", null)
                ), 
                React.createElement("span", null)
            )
        )
  }
});

 return element;
});