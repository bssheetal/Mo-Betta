import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Productive extends Component {
    handleOnClickButton = e =>  {
        e.preventDefault();

        API.spotify("productive")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <h1>Productive</h1>
                <button onClick={this.handleOnClickButton}>get music list</button>
                <Link to="/">Go home</Link> 
            </div>
        );
    }
}

export default withAuth(Productive);