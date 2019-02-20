import React from 'react'
import Device from 'react-device'
import {isIE} from 'react-device-detect';

function FindBrowser(props) {
    
    const onChange = (deviceInfo) => {
        console.log('Browser name', deviceInfo.browser.name);

   
    } 
    return (

        <div>
            <Device onChange={onChange} />
            <h2>You are on {onChange.deviceInfo.browser.name}</h2>
        </div>

       
    );

}
export default FindBrowser;