import React from "react";

function Card(props) {
  return (
    <div className="card mt-4 ml-4" style={props.style}>
      <div className="card-header">
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
