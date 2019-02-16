import React from "react";
import './style.css';

function Card(props) {
  return (
    <div className="card mt-2" style={props.style} onClick={props.onClick}>
      <div className="card-header" style={props.cardheaderstyle}>
        <span className="title">{props.title}</span>
      </div>
      <div className="card-body">
        {props.children}
      </div>
      {/* <h2 className="card-title p-2">{props}</h2> */}

    </div>
  );
}

export default Card;
