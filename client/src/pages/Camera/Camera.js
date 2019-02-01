import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "./style.css";

class Camera extends Component {

    state = {
        username: "",
        email: "",

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
            video: true
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
        console.log(canvas.toDataURL());

        const data = { imageData: canvas.toDataURL() }
        API.facialRecognition(data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));

        // const a = document.createElement("a");
        // a.href = canvas.toDataURL();
        // a.download = "download";
        // a.click();

        // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        // window.location.href = image; // it will save locally

    }

    handleOnClickPlay = e => {
        e.preventDefault();
        const player = document.getElementById('player');

        player.play();
    };

    handleOnClickStop = e => {
        e.preventDefault();
        const player = document.getElementById('player');

        player.pause();
    };


    previewFile = e => {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
        
    }

    findemotion=e=>{
        var data = {imageData:document.getElementById('previewimage').getAttribute("src")}
        console.log(data);
        API.facialRecognition(data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="container Camera">
                <h1>On the Video page!</h1>

                <div>
                    {/* <video id="player" controls autoPlay width="320" height="240"></video> */}
                    <video id="player" autoPlay width="320" height="240"></video>
                    <canvas id="canvas" width="320" height="240"></canvas>

                    <div>
                        <button id="capture" onClick={this.handleOnClickCapture}>Capture</button>
                        <button id="play" onClick={this.handleOnClickPlay}>Play</button>
                        <button id="stop" onClick={this.handleOnClickStop}>Stop</button>
                    </div>

                </div>
                <div>
                    {/* here ref is added as by default input parameter comes with sometext which cannot be overridden so had to make display none and add a reference that on buttonclick the event in inputgets triggered*/}
                    <input type="file" id="fileInput" onChange={this.previewFile} ref={fileInput=>this.fileInput=fileInput} />  
                    <img src="" id="previewimage"  onLoad={this.findemotion} alt=""/>
                    <button onClick={()=>this.fileInput.click()}>Upload Image</button>
                </div>

            </div>

        )
    }
}

export default withAuth(Camera);