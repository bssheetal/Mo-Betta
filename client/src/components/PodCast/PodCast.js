import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import PodcastPlayer from 'react-rss-podcast-player';

class PodCast extends Component {
    state = {
        username: "",
        email: "",
        referer: this.props.referer
    }

    componentDidMount() {
        console.log("==========referer============")
          console.log(this.props)
        //   console.log(this.state.referer)
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });
    }

    render() {

        // let targetUrl = 'https://rss.acast.com/eggchasers'
        let targetUrl = 'https://rss.acast.com/businessdaily'


        return (
            <div className="Pods">
                {/* Please note: the search and library functions are just provided for demo purposes and not included in this source code. */}
                <PodcastPlayer url={targetUrl}
                    feedMaxHeight="100px"
                />
            </div>
        );
    }
}

export default withAuth(PodCast);


// Prop                    Description                                                                     Default
// url                     The RSS feed of a podcast. Pass it any valid .rss feed to start playing.	
// maxWidth	               Set the max-width of the player.	                                                600px
// feedMaxHeight	       Set the max-height of the items list.	                                        600px
// playerColor 	           Sets the player section background-color 	                                    #f6f6f6
// feedColor	           Sets the feed list backgroundcolor	                                            #f6f6f6
// playerControlsColor	   Sets the player controls background-color	                                    #e6e6e6
// playerTextColor	       Sets the text color of the player & controls.	                                #404040
// feedTextColor	       Sets the text color of the feed items.	                                        #404040