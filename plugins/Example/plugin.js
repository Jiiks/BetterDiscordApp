module.exports = (Plugin, Api, Vendor) => {

    const { React } = Vendor;
    
    return class ExamplePlugin extends Plugin {

        constructor() {
            super();
        }

        onStart() {
            console.log("onStart");
            return true;
        }

        onStop() {
            console.log("onStop");
            return true;
        }

        get settingsPanel() {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "h3",
                null,
                "React Settings"
              )
            );
        }

    }
}