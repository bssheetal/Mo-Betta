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
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/login" onClick={() => this.Auth.logout()}>Logout</a>
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
            <nav className="navbar navbar-expand-sm sticky-top gennavbar">
                <div className="container-fluid maincontainer">
                    <div className="d-sm-flex">
                        <Swing left><span className="navbar-brand mo">Mo</span></Swing>
                        <Swing right><span className="navbar-brand betta">Betta</span></Swing>
                        {/* <span className="navbar-brand aka">a.k.a.</span>
                        <Swing left><span className="navbar-brand mood">Mood</span></Swing>
                        <Swing right><span className="navbar-brand swings">Swings</span></Swing> */}
                    </div>

                    {/* <div className="d-md-flex">
                        <Link className="mood-icon iangry ml-5" to="/relax"><i className="fas fa-angry" title="Relax"></i></Link>
                        <Link className="mood-icon isad ml-5" to="/uplift"><i className="fas fa-frown"  title="Uplift"></i></Link>
                        <Link className="mood-icon ineutral ml-5" to="/bored"><i className="fas fa-meh"  title="Bored"></i></Link>
                        <Link className="mood-icon ismile ml-5" to="/productive"><i className="fas fa-smile-beam"  title="Productive"></i></Link>
                        <Link className="mood-icon ilaugh ml-5" to="/outdoorsy"><i className="fas fa-laugh-beam"  title="Outdoorsy"></i></Link>
                        <Link className="mood-icon ihungry ml-5" to="/hungry"><i className="fas fa-grin-tongue"  title="Hungry"></i></Link>
                    </div> */}

                    <div className="d-sm-flex">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                                <i className="fas fa-bars" id="navbar-menu-btn"></i>
                            </span>
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