import React from 'react'
import Device from 'react-device'


function FindBrowser(props) {
    const onChange = (deviceInfo) => {
        console.log('Browser name', deviceInfo.browser.name);
        
    }

    return (

        <div>
            <Device onChange={onChange}/>
        </div>
    );

}
export default FindBrowser;