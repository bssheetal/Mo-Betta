import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="title">{props.children}</h2>
      </div>
      {/* <div className="card-body"></div>
      <h2 className="card-title p-2">{props}</h2> */}
      
    </div>
  );
}

export default Card;
