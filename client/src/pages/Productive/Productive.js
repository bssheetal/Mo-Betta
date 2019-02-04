import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import List from '../../components/List'
import Jumbotron from '../../components/Jumbotron';
import { NewsList, NewsListItem } from '../../components/NewsList';
import News from '../../components/News';
import { Container, Row, Col } from '../../components/Grid';
import Thumbnail from '../../components/Thumbnail';
import './style.css'
class Productive extends Component {
    state = {

        stockinfo: [],
        StockSearch: '',/*always give this parameter as name of the input field otherwise you cant type in input field */
        chart: [],
        chartDates: [],
        chartCloses: [],
        showAllChart: false,
        username: "",
        email: "",
        parentComponent: "",
        news: []

    };

    componentDidMount() {
        this.setState({
            StockSearch: 'NLFX'
        });
        this.handleFormSubmit.bind(this);

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

    handleOnClickButton = e => {
        e.preventDefault();
        API.spotify("productive")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get recipes update the recipes state
        event.preventDefault();
        console.log(this.state.StockSearch);
        API.stocks(this.state.StockSearch)
            .then(res => {
                console.log(res.data);
                this.setState({ stockinfo: res.data });
                console.log(this.state.stockinfo.latestPrice);
            })
            .catch(err => console.log(err));
    };

    //whth
    render() {
        return (
            <div className="container-fluid">
                <Jumbotron>

                </Jumbotron>
                <div>
                    <Card>
                        <div className="row">
                            <div className="col input-group">
                                <input
                                    value={this.state.stockSearch}
                                    name="StockSearch"
                                    type="text"
                                    className="form-control"
                                    placeholder="Symbol e.g. NFLX"
                                    aria-label="Symbol"
                                    onChange={this.handleInputChange}
                                />
                                <span className="input-group-btn">
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={this.handleFormSubmit}
                                    >
                                        Load Quote
                               </button>
                                </span>   
                            </div>
                        </div>
                    </Card>
                    <Card>
                    {this.state.stockinfo.symbol} -{this.state.stockinfo.companyName}
                        <List
                            latestSource={this.state.stockinfo.latestSource}
                            latestPrice={this.state.stockinfo.latestPrice}
                            week52High={this.state.stockinfo.week52High}
                            week52Low={this.state.stockinfo.week52Low}
                            primaryExchange={this.state.stockinfo.primaryExchange}
                        />
                    </Card>
                    <Card>
                        Business News
                    <Container>
                            <Col size="xs-6">

                                <NewsList>
                                    {this.state.news.slice(0, 5).map(item => {
                                        return (
                                            <NewsListItem
                                                title={item.title}
                                                href={item.link}
                                                thumbnail={item.image}
                                            />
                                        );
                                    })}
                                </NewsList>
                            </Col>
                        </Container>
                    </Card>

                    <div>
                        <Button onClick={this.handleOnClickButton}>get music list</Button>
                    </div>
                    <Link to="/">Go home</Link>
                </div>

                <Jumbotron>
                    <Button onClick={this.handleOnClickButton}>get music list</Button>
                </Jumbotron>


                {/* <Jumbotron>
                    <Video />
                </Jumbotron> */}

                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Productive);