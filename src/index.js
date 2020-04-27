import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from './components/Module'
import { StickyContainer } from 'react-sticky'


const App  = ()=> {
    
    const divStyle = {
        height: '500px',
        width: '100%',
        outline: '1px solid black',
    }

    const props ={
        options: {
            fixed: {
                mobile: {
                    startFixedY: 0,
                    clickOffset: 0,
                },
                desktop: {
                    startFixedY: 0,
                    clickOffset: 0,
                },
            },
        },
        data:{
            data:[
                {
                    title: '季節玩法',
                    anchorTo: 'season',
                },
                {
                    title: '團體旅遊',
                    anchorTo: 'grouptravel',
                },
                {
                    title: '機票資訊',
                    anchorTo: 'airplantickets',
                },
                {
                    title: '訂房資訊',
                    anchorTo: 'booking',
                },
                {
                    title: '自由行程',
                    anchorTo: 'selftour',
                },
                {
                    title: '票卷優惠',
                    anchorTo: 'tickets',
                },
                {
                    title: '特惠限時搶購',
                    anchorTo: 'specialoffer',
                },
            ],
        },
    }
    return(
    <div>
        <div style={divStyle}>Header</div>
            <StickyContainer>
                <div className='anchor-module'>
                    <div className='main_content'>
                        <div id="season" anchors="season" style={divStyle}>
                        anchors:season
                        </div>
                        <div id="grouptravel" anchors="grouptravel" style={divStyle}>
                        anchors:grouptravel
                        </div>
                        <div id="airplantickets" anchors="airplantickets" style={divStyle}>
                        anchors:airplantickets
                        </div>
                        <div id="booking" anchors="booking" style={divStyle}>
                        anchors:booking
                        </div>
                        <div id="selftour" anchors="selftour" style={divStyle}>
                        anchors:selftour
                        </div>
                        <div id="tickets" anchors="tickets" style={divStyle}>
                        anchors:tickets
                        </div>
                        <div id="specialoffer" anchors="specialoffer" style={divStyle}>
                        anchors:specialoffer
                        </div>
                    </div>
                    <Anchor {...props} />
                </div>
            </StickyContainer>
        <div style={divStyle}>Footer</div>
    </div>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));