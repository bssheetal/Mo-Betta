import React, { Component } from 'react';
// import React from "react";
// import { Container, Row, Col } from "../Grid";
import API from '../../utils/API';
import Button from '../../components/Button';
import Card from '../Card';
import Video from '../Video';

class Music extends Component {
    state = {
        mood: "",
        songs: []
    }

    componentDidMount() {
        console.log("!!!MUSIC!!!");
        console.log(this.props.mood);
        API.spotify(this.props.mood).then(res => {
            this.setState({
                songs: res.data
            });
        })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="Songs">
                {this.state.songs.map((item, index) => (
                        <Card
                            key={index}
                            title={item.songName}
                            style={this.props.style}
                        >
                            <p>Artist: {item.artists}</p>
                            <p>Album: {item.album}</p>

                            <Video
                                searchTerm={item.songName}
                                numberOfResults="1"
                            >
                            </Video>
                        </Card>
                ))}
            </div>
        );
    }
}

export default Music;

