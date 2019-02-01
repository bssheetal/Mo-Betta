import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Hungry extends Component {
    handleOnClickButton = e =>  {
        e.preventDefault();

        API.spotify("hungry")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };
    render() {
        return (
            <div>
                <h1>Hungry</h1>
                <button onClick={this.handleOnClickButton}>get music list</button>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Hungry);