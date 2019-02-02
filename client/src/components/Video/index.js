import React, { Component } from "react";
import API from "../../utils/API"

class Video extends Component {
    state = {
        result: []
    };

    handleOnClickBtn = e => {
        e.preventDefault();

        API.video("CNBC", 1)
            .then(res => {
                console.log(res.data);
                this.setState({
                    result: res.data
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <button onClick={this.handleOnClickBtn} >get video</button>
                {this.state.result.map((item, index) => (
                    <iframe
                        key={"video"+index}
                        title={"video"+index}
                        width="320"
                        height="240"
                        src={item}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ))}
            </div>
        );
    }

}

export default Video;
