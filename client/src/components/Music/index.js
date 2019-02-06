import React, { Component } from 'react';
// import React from "react";
// import { Container, Row, Col } from "../Grid";
import API from '../../utils/API';
import Button from '../../components/Button';
import Card from '../Card';

class Music extends Component {
    state = {
        mood: "",
        songs: []
    }


    handleOnClickButton = () => {
        API.spotify(this.props.mood).then(res => {
            this.setState({
                songs: res.data
            });
        })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="Songs">
                {/* <h1>My Music Component</h1> */}
                <Button onClick={this.handleOnClickButton}>get music list</Button>
                {this.state.songs.map(item => (
                    <div>
                        <Card>
                            
                            <p>Song Name: {item.songName}</p>

                            <p>Artist: {item.artists}</p>

                            <p>Album: {item.album}</p>
                        </Card>

                    </div>
                ))}
            </div>
        );
    }
}

export default Music;

