module.exports = (Plugin, BD, Vendor) => {

    const { Api, Events, Storage, Renderer } = BD;
    const { $, React, moment } = Vendor;

    class ClockComponent extends React.Component {

        constructor(props) {
            super(props);
            this.setInitialState();
        }

        setInitialState() {
            this.state = {
                time: this.time
            };
        }

        componentDidMount() {
            this.interval = setInterval(() => {
                this.setState({
                    time: this.time
                });
            }, 1000);
        }

        componentWillUnmount() {
            clearInterval(this.interval);
        }

        render() {
            return React.createElement(
                "div",
                { id: "clockPluginClock" },
                this.state.time
            );
        }

        pad(x) {
            return x < 10 ? `0${x}` : x;
        }

        get time() {
            let ampm = Storage.getSetting('12hr');
            let d = new Date();
            let h = d.getHours();
            let m = this.pad(d.getMinutes());
            let s = this.pad(d.getSeconds());

            let suffix = "AM";
            if (ampm && h >= 12) {
                h -= 12;
                suffix = "PM";
            }
            if (ampm && h == 0) {
                h = 12;
            }

            h = this.pad(h);

            return ampm ? [h, m, s].join(':') + suffix : [h, m, s].join(':');
        }

    }

    class ClockPlugin extends Plugin {

        constructor(props) {
            super(props);
        }

        onStart() {
            Api.injectStyle(this.styleId, this.style);
            this.root = Renderer.append("#app-mount", $("<span/>"), React.createElement(ClockComponent, null));
            return true;
        }

        onStop() {
            Api.removeStyle(this.styleId);
            this.root.remove();
            return true;
        }

        onSave(settings) {}

        get style() {
            return `
                #clockPluginClock { 
                    position:absolute; 
                    color:#FFF; 
                    background:#333333; 
                    padding:0 9px 0 6px; 
                    min-width:55px; 
                    max-width:55px; 
                    z-index:1000;
                }
            `;
        }

        get styleId() { return "clockpluginstyle"; }

    }

    return ClockPlugin;
};