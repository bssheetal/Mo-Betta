import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import './style.css';

class Outdoorsy extends Component {
    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("outside")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Outdoorsy</h1>
                </Jumbotron>

                <button onClick={this.handleOnClickButton}>get music list</button>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Outdoorsy);