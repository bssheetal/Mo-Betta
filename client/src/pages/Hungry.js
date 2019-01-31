import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Hungry extends Component {
    render() {
        return (
            <div>
                <h1>Hungry</h1>

                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Hungry);