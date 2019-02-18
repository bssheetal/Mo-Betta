import React, { Component } from "react";
import API from "../../utils/API"
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import './style.css'

class Video extends Component {
    state = {
        result: []
    };

    componentDidMount() {
        API.video(this.props.searchTerm, this.props.numberOfResults)
            .then(res => {
                console.log(res.data);
                this.setState({
                    result: res.data
                });
            })
            .catch(err => console.log(err));
    };

    componentWillReceiveProps() {
        console.log(this.props.searchTerm);
        API.video(this.props.searchTerm, this.props.numberOfResults)
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
            <div className="container carousel-video text-center">
                {/* <Carousel useKeyboardArrows emulateTouch showThumbs={false}> */}
                    {this.state.result.map((item, index) => (
                        <div key={index}>
                            <iframe
                                key={"video" + index}
                                title={"video" + index}
                                width="560"
                                height="315"
                                src={item}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                {/* </Carousel> */}
            </div>
        );
    }

}

export default Video;
