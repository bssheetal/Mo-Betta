import React, { Component } from 'react';
// import React from "react";
// import { Container, Row, Col } from "../Grid";
import API from '../../utils/API';

class Music extends Component {
    state = {
        mood: ""
    }

    componentDidMount() {
        API.spotify(this.props.mood).then(res => {
            this.setState({
                mood: res.data.mood
            });
        })
        .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="Songs">
            <p>My Music Component</p>
            </div>
        );
    }
}

export default Music;

