import React, { Component } from "react";
import { isIE, isIOS, isMobileSafari, isChrome } from 'react-device-detect';


class Detectdevice extends Component {
    render() {

        if (isIE)
            return <div> IE is not supported. Download Chrome/Opera/Firefox </div>
        if (isMobileSafari)
            return <div>Mobile Safari is not supported.Use Android </div>
        if (isIOS)
            return <div>Ios is not supported.Use Android </div>
        if (isChrome)
            return <br/>
    }
}


export default Detectdevice;