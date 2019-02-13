import React from "react";
// import "./style.css";
import { Link } from 'react-router-dom';

function Emotionsnavbar() {
    return (
        <nav className="nav navbar-light bg-light emotionsnavbar">
            <div className="container-fluid emotionscontainer">
                <div className="d-md-flex justify-content-center">                   
                    <Link className="mood-icon iangry ml-5" to="/relax"><i className="fas fa-angry" title="Relax"></i></Link>
                    <Link className="mood-icon isad ml-5" to="/uplift"><i className="fas fa-frown" title="Uplift"></i></Link>
                    <Link className="mood-icon ineutral ml-5" to="/bored"><i className="fas fa-meh" title="Bored"></i></Link>
                    <Link className="mood-icon ismile ml-5" to="/productive"><i className="fas fa-smile-beam" title="Productive"></i></Link>
                    <Link className="mood-icon ilaugh ml-5" to="/outdoorsy"><i className="fas fa-laugh-beam" title="Outdoorsy"></i></Link>
                    <Link className="mood-icon ihungry ml-5" to="/hungry"><i className="fas fa-grin-tongue" title="Hungry"></i></Link>
                </div>
                <div className="d-md-flex justify-content-center">
                <p class="text-center">Relax</p>
                </div>
            </div>
        </nav>
    );
}

export default Emotionsnavbar;