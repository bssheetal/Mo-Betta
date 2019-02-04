import React from "react";
import "./style.css";

function Jumbotron(props) {
    return (
        <div className="jumbotron jumbotron-fluid text-center" style={props.style}>
            <div className="container-fluid">
              
                {props.children}
            </div>
        </div>
    );
}

export default Jumbotron;