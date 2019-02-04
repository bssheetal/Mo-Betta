import React from "react";
import "./style.css";
// Destructuring the type, className, children and onClick props, applying them to the button element
function Input(props) {
    return (
      <div className="input-group mb-2">
        <input className="form-control" type="text" {...props} />
      </div>
    );
  }
          
export default Input;