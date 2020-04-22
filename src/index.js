import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from './components/Module'

const App  = ()=> {
    
    let divStyle = {
        padding: '5px',
        height: '500px',
        width: '100%',
        outline: '1px solid black',
    }

    return(
        <div>
            <div className='bn_cogl'>
                <div id="season" style={divStyle}>
                anchors:season
                </div>
                <div id="grouptravel" style={divStyle}>
                anchors:grouptravel
                </div>
                <div id="airplantickets" style={divStyle}>
                anchors:airplantickets
                </div>
                <div id="booking" style={divStyle}>
                anchors:booking
                </div>
                <div id="selftour" style={divStyle}>
                anchors:selftour
                </div>
                <div id="tickets" style={divStyle}>
                anchors:tickets
                </div>
                <div id="specialoffer" style={divStyle}>
                anchors:specialoffer
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));