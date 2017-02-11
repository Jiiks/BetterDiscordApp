"use strict";

const React = require("React");
import { Component } from 'React';
import Checkbox from './checkbox';

class SettingsPanel extends Component {
    
    constructor(props) {
        super(props);
        this.coreSettings.bind(this);
        this.setInitialState();
        //Just for testing
        this.items = [
            {"id": 0, "text": "Option 1", "helptext": "Option 1 helptext"},
            {"id": 1, "text": "Option 2", "helptext": "Option 2 helptext"},
            {"id": 2, "text": "Option 3", "helptext": "Option 3 helptext"}
        ];
    }

    setInitialState() {
        this.state = {
            activePanel: "core"
        };
    }

    render() {
        return (
            <div className="settings-inner">
                <div className="scroller-wrap">
                    <div className="scroller settings-wrapper settings-panel user-settings-text-chat">
                        <div className="tab-bar TOP">
                            <div className="tab-bar-item selected">Core</div>
                            <div className="tab-bar-item">UI</div>
                            <div className="tab-bar-item">Emotes</div>
                            <div className="tab-bar-item">Custom CSS</div>
                            <div className="tab-bar-item">Plugins</div>
                            <div className="tab-bar-item">Themes</div>
                        </div>
                        <div>
                            {this.coreSettings()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    coreSettings() {
        return (
            <div className="control-group">
                <ul className="checkbox-group">
                    {this.items.map(value => {
                        return <Checkbox key={value.id} text={value.text} helptext={value.helptext} />
                    })
                    }
                </ul>
            </div>
        );
    }

}



export default SettingsPanel;