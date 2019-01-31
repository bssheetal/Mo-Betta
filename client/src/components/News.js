import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
var axios = require('axios');
var cheerio = require('cheerio');
//url for proxy server to make requests from apis



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
                // parentComponent: ??????
            })
        });
        // Scrape call
        // Switch statement to direct scrape and define suffix to be money/food/sports/etc

        // let  newSuffix;


        this.scrapreNews();
    }


    scrapreNews = () => {

        console.log("test");

        // CORS error fix
        var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
        let geocodeAPIUrl = "http://www.usatoday.com/money/markets/";
        let url = corsAnywhereUrl + geocodeAPIUrl

        axios.get(url).then(function (response) {

                var $ = cheerio.load(response.data);

                $('a[itemprop="url"]').each(function (i, element) {

                    var result = {};

                    result.link = ("www.usatoday.com" + $(this).attr("href"));

                    result.title = $(this)
                        .find('p[itemprop="headline"]')
                        .text();

                    result.image = $(this)
                        .find('img[itemprop="image"]')
                        .attr("src");

                
                    this.setState({
                        news: result
                    })
                        console.log(this.state.news);
                });
            })
            .then(result => {
                this.setState({
                    news: result
                })
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.headers);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                console.log(error.config);
            });
            console.log(this.state.news);
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
