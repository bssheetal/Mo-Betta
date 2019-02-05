import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
// import { removeDotSegments } from "uri-js";
import Bounce from 'react-reveal/Bounce';
import Swing from 'react-reveal/Swing';
import Zoom from 'react-reveal/Zoom';
import "./style.css"

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    showNavigation = () => {
        if (this.Auth.loggedIn()) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <div className="d-md-flex">
                        <Bounce><span className="navbar-brand mo">Mo</span></Bounce>
                        <Bounce><span className="navbar-brand betta">Betta</span></Bounce>
                        {/* <span className="navbar-brand aka">a.k.a.</span>
                        <Swing left><span className="navbar-brand mood">Mood</span></Swing>
                        <Swing right><span className="navbar-brand swings">Swings</span></Swing> */}
                    </div>

                    <div className="d-md-flex">
                    <Link className="mood-icon iangry ml-5" to="/relax"><i className="fas fa-angry"></i></Link>
                    <Link className="mood-icon isad ml-5" to="/uplift"><i className="fas fa-frown"></i></Link>
                    <Link className="mood-icon ineutral ml-5" to="/bored"><i className="fas fa-meh"></i></Link>
                    <Link className="mood-icon ismile ml-5" to="/productive"><i className="fas fa-smile-beam"></i></Link>
                    <Link className="mood-icon ilaugh ml-5" to="/outdoorsy"><i className="fas fa-laugh-beam"></i></Link>
                    <Link className="mood-icon ihungry ml-5" to="/hungry"><i className="fas fa-grin-tongue"></i></Link>
                    </div>

                    <div className="d-md-flex">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mr-auto">
                            </ul>
                            {this.showNavigation()}
                        </div>
                    </div>
                </div>
            </nav >
        )
    }
}

export default Navbar;