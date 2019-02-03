import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';

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


        return (
            <div className="Pods">
                <h3>PodCast Dump</h3>
               
            </div>
        );
    }
}

export default withAuth(PodCast);
