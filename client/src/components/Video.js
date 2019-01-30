import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Video extends Component {

    state = {
        username: "",
        email: ""
    };

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });

        this.videoDisplay();

    }

    videoDisplay = () => {
        const player = document.getElementById('player');
        const constraints = {
            video: true,
        };

        // Attach the video stream to the video element and autoplay.
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                player.srcObject = stream;
            });
    };

    handleOnClickCapture = e => {
        e.preventDefault();

        console.log('video capture');
        const player = document.getElementById('player');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, canvas.width, canvas.height);

        player.pause();

        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "download";
        a.click();

        // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.

        // window.location.href = image; // it will save locally

    }

    handleOnClickPlay = e => {
        e.preventDefault();
        const player = document.getElementById('player');
       
        player.play();
        
    };

    render() {
        return (
            <div className="container Profile">
                <h1>On the Video page!</h1>

                <video id="player" autoPlay width="320" height="240"></video>
                <button id="capture" onClick={this.handleOnClickCapture}>Capture</button>
                <button id="play" onClick={this.handleOnClickPlay}>Play</button>
                <canvas id="canvas" width="320" height="240"></canvas>

                <Link to="/">Go home</Link>
            </div>
        )
    }
}

export default withAuth(Video);