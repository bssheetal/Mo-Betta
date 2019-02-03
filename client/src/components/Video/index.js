import React, { Component } from "react";
import API from "../../utils/API"

class Video extends Component {
    state = {
        result: []
    };

    componentDidMount() {
        this.handleOnClickBtn("");
    };

    handleOnClickBtn = e => {
        if (e) e.preventDefault();

        API.video("CNBC news", 5)
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
            <div className="container-fluid text-center">
                <button onClick={this.handleOnClickBtn} >get video</button>
                <div>
                    {this.state.result.map((item, index) => (
                        <iframe
                            key={"video" + index}
                            title={"video" + index}
                            width="320"
                            height="240"
                            src={item}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ))}
                </div>

            </div>
        );
    }

}

export default Video;
