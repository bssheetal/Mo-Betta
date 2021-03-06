import React from "react";
import "./style.css";
import { stack as Menu } from 'react-burger-menu';

function Emotionsnavbar(props) {

    return (
        <div>
            <Menu right  width={'120px'} styles={props.MenuStyles}>
                <p></p>
                <div className="icon-container text-center">
                    <a className="mood-icon" href="/hungry" style={props.EmotionIconStyle}><i className="fas fa-grin-tongue ihungry" title="Hungry"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Hungry</p>
                </div>

                <div className="icon-container text-center">
                    <a className="mood-icon" href="/outdoorsy" style={props.EmotionIconStyle}><i className="fas fa-laugh-beam ilaugh" title="Outdoorsy"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Outdoorsy</p>
                </div>

                <div className="icon-container text-center">
                    <a className="mood-icon" href="/productive" style={props.EmotionIconStyle}><i className="fas fa-smile-beam ismile" title="Productive"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Productive</p>
                </div>

                <div className="icon-container text-center">
                    <a className="mood-icon" href="/bored" style={props.EmotionIconStyle}><i className="fas fa-meh ineutral" title="Bored"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Bored</p>
                </div>

                <div className="icon-container text-center">
                    <a className="mood-icon" href="/uplift" style={props.EmotionIconStyle}><i className="fas fa-frown isad" title="Uplift"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Uplift</p>
                </div>

                <div className="icon-container text-center">
                    <a className="mood-icon" href="/relax" style={props.EmotionIconStyle}><i className="fas fa-angry iangry" title="Relax"></i></a>
                    <p className="icon-text" style={props.EmotionIconTextStyle}>Relax</p>
                </div>
            </Menu>
        </div>

        //     <nav className="nav navbar-light bg-light emotionsnavbar">
        //         <div className="container-fluid emotionscontainer">
        //             {/* <div className="d-md-flex justify-content-center"> */}
        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/relax"><i className="fas fa-angry iangry" title="Relax"></i></a>
        //                 <p className="icon-text">Relax</p>
        //             </div>

        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/uplift"><i className="fas fa-frown isad" title="Uplift"></i></a>
        //                 <p className="icon-text">Uplift</p>
        //             </div>

        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/bored"><i className="fas fa-meh ineutral" title="Bored"></i></a>
        //                 <p className="icon-text">Bored</p>
        //             </div>

        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/bored"><i className="fas fa-smile-beam ismile" title="Productive"></i></a>
        //                 <p className="icon-text">Productive</p>
        //             </div>

        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/outdoorsy"><i className="fas fa-laugh-beam ilaugh" title="Outdoorsy"></i></a>
        //                 <p className="icon-text">Outdoorsy</p>
        //             </div>

        //             <div className="icon-container text-center ml-5">
        //                 <a className="mood-icon" href="/hungry"><i className="fas fa-grin-tongue ihungry" title="Hungry"></i></a>
        //                 <p className="icon-text">Hungry</p>
        //             </div>
        //             {/* </div> */}
        //         </div>
        //     </nav >
    );
}

export default Emotionsnavbar;