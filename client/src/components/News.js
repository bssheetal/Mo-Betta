import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
var axios = require('axios');
var cheerio = require('cheerio');

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
                email: res.data.email,
                // parentComponent: ??????
            })
        });
        // Scrape call
        // Switch statement to direct scrape and define suffix to be money/food/sports/etc

        // let  newSuffix;


        this.scrapreNews();
    }


    scrapreNews = () => {

        // app.get("/scrape", function (req, res) {
        axios.get("http://www.usatoday.com/money/markets/").then(function (response) {

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

                console.log(result);
            });

            // // Send a message to the client
            // res.send("Scrape Complete");
        })
            .then(data => {
                this.setState({
                    news: data
                })
            });
        // });
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
