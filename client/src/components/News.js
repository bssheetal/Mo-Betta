import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';

class News extends Component {
    state = {
        username: "",
        email: "",
        parentComponent: "",
        news: {}
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });

        API.scrapeNews(this.props.result).then(res => {
            this.setState({
                news: res
                // parentComponent: ??????
            })
        });
    }

    render() {

        return (
            <div className="News">
                <h3>News Dump</h3>
                {this.state.news.title}
                {this.state.news.link}
                {this.state.news.image}
            </div>
        );
    }
}

export default withAuth(News);
