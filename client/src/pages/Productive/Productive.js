import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import List from '../../components/List'
import Jumbotron from '../../components/Jumbotron';
import Video from '../../components/Video';
import { NewsList, NewsListItem } from '../../components/NewsList';
// import News from '../../components/News';
import { Container, Row, Col } from '../../components/Grid';
import Thumbnail from '../../components/Thumbnail';
import './style.css'
import PodCast from '../../components/PodCast';
import ChartLineGraph from '../../components/ChartLineGraph';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';

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
        news: [],
        linechartelements: {},
        isLoading: false,
        parentComponent: "productive",
        news: [],
        stockDisplay: "block",
        newsDisplay: "none",
        podcastDisplay: "none",
        musicDisplay: "none",
        videoDisplay: "none"
    };

    componentDidMount() {
        // this.setState({
        //     StockSearch: 'BA'
        // });

        this.handleFormSubmit("BA");
        this.loaddefaultchartforstock("BA");
        this.chartdisplay();
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

    loaddefaultchartforstock = (query) => {

        API.stockscharts(query).then(res => {
            this.setState({ chart: res.data });

        })
            .catch(err => console.log(err));
    }

    loadchartforstock = () => {

        API.stockscharts(this.state.StockSearch).then(res => {
            this.setState({ chart: res.data });

        })
            .catch(err => console.log(err));
    }

    chartdisplay = () => {
        // event.preventDefault();
        this.state.chart.map(chartItem => {
            // this.state.chartDates.push(JSON.stringify(chartItem.label));
            // this.state.chartCloses.push(chartItem.close)
            this.state.linechartelements[JSON.stringify(chartItem.date)] = chartItem.close
        });
        this.setState({
            isLoaded: true
        });
        // console.log(this.state.chartDates);
        // console.log(this.state.chartCloses);
        console.log(this.state.linechartelements);
    }

    handleFormSubmit = (query) => {
        // When the form is submitted, prevent its default behavior, get recipes update the recipes state
        // event.preventDefault();
        console.log(this.state.StockSearch);
        API.stocks(query)
            .then(res => {
                console.log(res.data);
                this.setState({ stockinfo: res.data });
                console.log(this.state.stockinfo.latestPrice);
            })
            .catch(err => console.log(err));

    };

    handlesearchclick = () => {

        API.stocks(this.state.StockSearch)
            .then(res => {
                console.log(res.data);
                this.setState({ stockinfo: res.data });
                console.log(this.state.stockinfo.latestPrice);
            })
            .catch(err => console.log(err));

        this.loadchartforstock();
    };

    handleLoadQuote = () => {
        console.log(this.state.StockSearch);
        this.handlesearchclick();
        this.chartdisplay();
    }

    // Handle the OnClick event for icon-buttons
    handleOnClickStock = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "block",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none"
        });
    };

    handleOnClickNews = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "block",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none"
        });
    };

    handleOnClickPodcast = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "block",
            musicDisplay: "none",
            videoDisplay: "none"
        });
    };

    handleOnClickMusic = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "block",
            videoDisplay: "none"
        });
    };

    handleOnClickVideo = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "block"
        });
    };


    //whth
    render() {
        const { isLoaded } = this.state;
        const styles = {
            cardStock: {
                display: this.state.stockDisplay
            },
            cardNews: {
                display: this.state.newsDisplay
            },
            cardPodcast: {
                display: this.state.podcastDisplay
            },
            cardMusic: {
                display: this.state.musicDisplay
            },
            cardVideo: {
                display: this.state.videoDisplay
            }
        };

        return (
            <div className="container-fluid">
                {/* <Jumbotron>
                </Jumbotron> */}

                <div className="row">
                    <div className="col-sm-11">
                        <Card id="card-stock" title="Stocks" style={styles.cardStock}>
                            <div className="row" id="btn-load">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-md-12 input-group">
                                            <input
                                                value={this.state.stockSearch}
                                                name="StockSearch"
                                                type="text"
                                                className="form-control"
                                                placeholder="Symbol e.g. BA"
                                                aria-label="Symbol"
                                                onChange={this.handleInputChange}
                                            />
                                            <span className="input-group-btn">
                                                <button
                                                    className="btn btn-secondary"
                                                    type="button"
                                                    onClick={this.handleLoadQuote}
                                                >
                                                    Load Quote
                                        </button>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.state.stockinfo.symbol} -{this.state.stockinfo.companyName}
                                            <List
                                                latestSource={this.state.stockinfo.latestSource}
                                                latestPrice={this.state.stockinfo.latestPrice}
                                                week52High={this.state.stockinfo.week52High}
                                                week52Low={this.state.stockinfo.week52Low}
                                                primaryExchange={this.state.stockinfo.primaryExchange}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    {this.state.linechartelements && (
                                        <div className="charts">

                                            <h2 className="text-center">
                                                {this.state.stockinfo.companyName + ' (Past 6 months)'}
                                            </h2>
                                            {
                                                isLoaded ?
                                                    <ChartLineGraph
                                                        title={this.state.StockSearch}
                                                        chartLabels={this.state.chartDates}
                                                        chartData={this.state.chartCloses}
                                                        lineChartElements={this.state.linechartelements}
                                                    />
                                                    : null
                                            }
                                        </div>
                                    )}
                                </div>

                            </div>
                        </Card>

                        <Card id="card-news" title="Business News" style={styles.cardNews}>
                            <Container>
                                <Col size="xs-6">

                                    <NewsList>
                                        {this.state.news.slice(0, 5).map(item => {
                                            return (
                                                <NewsListItem
                                                    key={item.title}
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

                        <Card id="card-podcast" title="PodCast" style={styles.cardPodcast}>
                            <Container>
                                <PodCast />
                            </Container>
                        </Card>
                        {/* <Card>
                            Chat
                                <Container>
                                    <Chat />
                                </Container>
                            </Card> */}

                        <Card id="card-music" title="Music" style={styles.cardMusic}>
                            <Button onClick={this.handleOnClickButton}>get music list</Button>
                        </Card>

                        <Card id="card-video" title="Video" style={styles.cardVideo}>
                            <Video
                                searchTerm="CNBC Television"
                                numberOfResults="5"
                            />
                        </Card>
                    </div>

                    <div className="col-sm-1">
                        <div className="container text-center">
                            <div className="productive-icons icon-stock">
                                <Rotate><i className="fas fa-chart-line" onClick={this.handleOnClickStock}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-newspaper">
                                <Rotate><i className="fas fa-newspaper" onClick={this.handleOnClickNews}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-podcast">
                                <Rotate><i className="fas fa-podcast" onClick={this.handleOnClickPodcast}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-music">
                                <Rotate><i className="fas fa-music" onClick={this.handleOnClickMusic}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-video">
                                <Rotate><i className="fas fa-video" onClick={this.handleOnClickVideo}></i></Rotate>
                            </div>

                            <Link to="/">Go home</Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withAuth(Productive);