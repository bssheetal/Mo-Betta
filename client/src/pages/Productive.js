import React, { Component } from 'react';
import withAuth from '../components/withAuth';
// import API from '../utils/API';
import { Link } from 'react-router-dom';
import Video from '../components/Video'

class Productive extends Component {
    render() {
        return (
            <div>
                <h1>Productive</h1>

                <Video />

                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Productive);