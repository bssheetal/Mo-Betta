import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
// import PodcastPlayer from 'react-rss-podcast-player';

class PodCast extends Component {
    state = {
        username: "",
        email: "",
        parentComponent: "",
        podCasts: []
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });

        // API.getPodCast(this.props.allResult).then(res => {
        //     this.setState({
        //         podCasts: res.data
        //         // parentComponent: ??????
        //     })
        //     console.log("=========data======")
        //     console.log(res.data);
        // console.log("========state========")
        // console.log(this.state.podCasts);
        // });
    }

    render() {
        // console.log("========state========")
        // console.log(this.state.podCasts);


        // let targetUrl = 'https://rss.acast.com/eggchasers'
        let targetUrl = 'https://rss.acast.com/businessdaily'


        return (
            <div className="Pods">
                <h3>PodCast Dump</h3>
                {/* Please note: the search and library functions are just provided for demo purposes and not included in this source code. */}
                {/* <PodcastPlayer url={targetUrl}
                    feedMaxHeight="100px" */}
                />
            </div>
        );
    }
}

export default withAuth(PodCast);


// Prop                    Description                                                                     Default
// url                     The RSS feed of a podcast. Pass it any valid .rss feed to start playing.	
// maxWidth	            Set the max-width of the player.	                                            600px
// feedMaxHeight	        Set the max-height of the items list.	                                        600px
// playerColor 	        Sets the player section background-color	                                    #f6f6f6
// feedColor	            Sets the feed list backgroundcolor	                                            #f6f6f6
// playerControlsColor	    Sets the player controls background-color	                                    #e6e6e6
// playerTextColor	        Sets the text color of the player & controls.	                                #404040
// feedTextColor	        Sets the text color of the feed items.	                                        #404040