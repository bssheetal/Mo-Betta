import React, { Component } from "react";
import './style.css';

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3">
                <div className="container-fluid text-center">
                    <span className="footer-text"> © 2019 Mo Betta Inc. All rights reserved. </span>
                </div>
            </footer>
        );
    }
}

export default Footer;