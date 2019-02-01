import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';

class News extends Component {
    state = {
        username: "",
        email: "",
        parentComponent: "",
        news: []
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });

        API.scrapeNews(this.props.allResult).then(res => {
            this.setState({
                news: res.data
                // parentComponent: ??????
            })
            console.log("=========data======")
            console.log(res.data);
            // console.log("========state========")
            // console.log(this.state.news);
        });
    }

    render() {
        console.log("========state========")
        console.log(this.state.news);


        return (
            <div className="News">
                <h3>News Dump</h3>
                <ul>
                {this.state.news.map(item => (
                <li>
                {item.title},
                {item.link},
                {item.image},
                </li>   
                ))}
                </ul>
            </div>
        );
    }
}

export default withAuth(News);
