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
import PodCast from '../../components/PodCast/PodCast';
import ChartLineGraph from '../../components/ChartLineGraph';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';
import Music from '../../components/Music';

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
        smallScreen: true,
        stockDisplay: "block",
        newsDisplay: "block",
        podcastDisplay: "block",
        musicDisplay: "block",
        videoDisplay: "block",
        chatDisplay: "block",
        displayStockCard: true,
        displayNewsCard: false,
        displayPodcastCard: false,
        displayChatCard: false,
        displayMusicCard: false,
        displayVideoCard: false
    };

    componentDidMount() {
        // this.setState({
        //     StockSearch: 'BA'
        // });

        setTimeout(() => {
            if (localStorage.getItem("mobetta_layout") === "large") {
                this.setState({
                    smallScreen: false
                });
            } else {
                this.setState({
                    smallScreen: true,
                    stockDisplay: "block",
                    newsDisplay: "none",
                    podcastDisplay: "none",
                    musicDisplay: "none",
                    videoDisplay: "none",
                    chatDisplay: "none"
                });
            };
        }, 100);

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
    handleOnClickCardStock = e => {
        e.preventDefault();

        this.setState({
            displayStockCard: true,
            displayNewsCard: false,
            displayPodcastCard: false,
            displayChatCard: false,
            displayMusicCard: false,
            displayVideoCard: false
        });
    };

    handleOnClickIconStock = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "block",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none"
        });
    };

    handleOnClickCardNews = e => {
        e.preventDefault();

        console.log("News card clicked");
        this.setState({
            displayStockCard: false,
            displayNewsCard: true,
            displayPodcastCard: false,
            displayChatCard: false,
            displayMusicCard: false,
            displayVideoCard: false
        });
    };

    handleOnClickIconNews = e => {
        e.preventDefault();

        console.log("News card clicked");
        this.setState({
            stockDisplay: "none",
            newsDisplay: "block",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none"
        });
    };

    handleOnClickCardPodcast = e => {
        e.preventDefault();

        this.setState({
            displayStockCard: false,
            displayNewsCard: false,
            displayPodcastCard: true,
            displayChatCard: false,
            displayMusicCard: false,
            displayVideoCard: false
        });
    };

    handleOnClickIconPodcast = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "block",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none"
        });
    };

    handleOnClickCardChat = e => {
        e.preventDefault();

        this.setState({
            displayStockCard: false,
            displayNewsCard: false,
            displayPodcastCard: false,
            displayChatCard: true,
            displayMusicCard: false,
            displayVideoCard: false
        });
    };

    handleOnClickIconChat = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "block"
        });
    };

    handleOnClickCardMusic = e => {
        e.preventDefault();

        this.setState({
            displayStockCard: false,
            displayNewsCard: false,
            displayPodcastCard: false,
            displayChatCard: false,
            displayMusicCard: true,
            displayVideoCard: false
        });
    };

    handleOnClickIconMusic = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "block",
            videoDisplay: "none",
            chatDisplay: "none"
        });
    };

    handleOnClickCardVideo = e => {
        e.preventDefault();

        this.setState({
            displayStockCard: false,
            displayNewsCard: false,
            displayPodcastCard: false,
            displayChatCard: false,
            displayMusicCard: false,
            displayVideoCard: true
        });
    };

    handleOnClickIconVideo = e => {
        e.preventDefault();

        this.setState({
            stockDisplay: "none",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "block",
            chatDisplay: "none"
        });
    };

    // handleAddToPortfolio=id=>{
    //  const stock=this.state.stockinfo.find(stock=>stock.id===id);
    //  API.savestocks({
    //     symbol:this.state.stockinfo.symbol,
    //     companyname:this.state.stockinfo.companyName
    //  })
    // };

    renderCardStock = (isLoaded, styles) => {
        return (
            <Card id="card-stock" classname="stocksheader" title="Stocks" style={styles} onClick={this.handleOnClickCardStock}>

                <div className="row" id="btn-load">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-md-8 input-group">
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


                        <div className="row" >
                            <div className="col-md-12" id="companydetails">
                                <br></br>
                                <h5 classname="companynameandsymbol">{this.state.stockinfo.symbol} -{this.state.stockinfo.companyName}</h5>
                                <List id="stockdetails"
                                    key={this.state.stockinfo.id}
                                    latestSource={this.state.stockinfo.latestSource}
                                    latestPrice={this.state.stockinfo.latestPrice}
                                    week52High={this.state.stockinfo.week52High}
                                    week52Low={this.state.stockinfo.week52Low}
                                    primaryExchange={this.state.stockinfo.primaryExchange}
                                />
                                {/* <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={this.handleAddToPortfolio}
                                >
                                Add to Portfolio</button> */}
                            </div>

                        </div>
                    </div>


                    <div className="col-sm-6">
                        {this.state.linechartelements && (
                            <div className="charts">
                                <br></br>


                                <h4 className="text-center">
                                    {this.state.stockinfo.companyName + ' (Past 6 months)'}
                                </h4>
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
        );
    };

    renderCardNews = (styles) => {
        return (
            <div id="card-news">
                <Card title="Business News" style={styles} onClick={this.handleOnClickCardNews}>
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
            </div>
        );
    };

    renderCardPodcast = (styles) => {
        return (
            <Card id="card-podcast" title="PodCast" style={styles} onClick={this.handleOnClickCardPodcast}>
                <Container>
                    <PodCast />
                </Container>
            </Card>
        );
    };

    renderCardChat = (styles) => {
        return (
            <Card id="card-chat" title="Chat" style={styles} onClick={this.handleOnClickCardChat}>
                <Container>
                    <Chat />
                </Container>
            </Card>
        );
    };

    renderCardMusic = (styles) => {
        return (
            <div>
                  <Music style={styles}></Music>
            </div>
        );
    };

    renderCardVideo = (styles) => {
        return (
            <Card id="card-video" title="Video" style={styles} onClick={this.handleOnClickCardVideo}>
                <Video
                    searchTerm="CNBC Television"
                    numberOfResults="5"
                />
            </Card>
        );
    };

    renderLargeScreen = (isLoaded, activeStyles, inactiveStyles) => {
        return (
            <div className="row">
                {/* LEFT section */}
                <div className="col-sm-3">
                    <div className="container text-center large-left-section">
                        {this.renderCardMusic(inactiveStyles.cardMusic)}
                        {this.renderCardNews(inactiveStyles.cardNews)}
                        {this.renderCardPodcast(inactiveStyles.cardPodcast)}
                    </div>

                </div>

                {/* CENTER section */}
                <div className="col-sm-6">
                    <div className="container text-center large-middle-section">
                        {this.state.displayStockCard ? this.renderCardStock(isLoaded, activeStyles.cardStock) : null}
                        {this.state.displayNewsCard ? this.renderCardNews(activeStyles.cardNews) : null}
                        {this.state.displayPodcastCard ? this.renderCardPodcast(activeStyles.cardPodcast) : null}
                        {this.state.displayChatCard ? this.renderCardChat(activeStyles.cardChat) : null}
                        {this.state.displayMusicCard ? this.renderCardMusic(activeStyles.cardMusic) : null}
                        {this.state.displayVideoCard ? this.renderCardVideo(activeStyles.cardVideo) : null}
                    </div>
                </div>

                {/* RIGHT section */}
                <div className="col-sm-3">
                    <div className="container text-center large-right-section">
                        {this.renderCardStock(isLoaded, inactiveStyles.cardStock)}
                        {this.renderCardVideo(inactiveStyles.cardVideo)}
                        {this.renderCardChat(inactiveStyles.cardChat)}
                    </div>
                </div>

            </div>
        );
    };

    renderSmallScreen = (isLoaded, smallScreenStyles) => {
        return (
            <div className="row">
                {/* LEFT section */}
                <div className="col-sm-1">
                    <div className="sidebar">
                        <div className="container text-center small-right-section activity-icons">
                            <br></br>
                            <div className="productive-icons icon-stock">
                                <Rotate><i className="fas fa-chart-line" onClick={this.handleOnClickIconStock}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-newspaper">
                                <Rotate><i className="fas fa-newspaper" onClick={this.handleOnClickIconNews}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-podcast">
                                <Rotate><i className="fas fa-podcast" onClick={this.handleOnClickIconPodcast}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-music">
                                <Rotate><i className="fas fa-music" onClick={this.handleOnClickIconMusic}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-video">
                                <Rotate><i className="fas fa-video" onClick={this.handleOnClickIconVideo}></i></Rotate>
                            </div>

                            <div className="productive-icons icon-chat">
                                <Rotate><i className="fas fa-comments" onClick={this.handleOnClickIconChat}></i></Rotate>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT section */}
                <div className="col-sm-11">
                    <div className="container text-center small-left-section">
                        {this.renderCardStock(isLoaded, smallScreenStyles.cardStock)}
                        {this.renderCardNews(smallScreenStyles.cardNews)}
                        {this.renderCardPodcast(smallScreenStyles.cardPodcast)}
                        {this.renderCardChat(smallScreenStyles.cardChat)}
                        {this.renderCardMusic(smallScreenStyles.cardMusic)}
                        {this.renderCardVideo(smallScreenStyles.cardVideo)}
                    </div>
                </div>

            </div>
        );
    };

    //whth
    render() {
        const { isLoaded } = this.state;
        const inactiveStyles = {
            cardStock: {
                display: this.state.stockDisplay,
                height: "150px"
            },
            cardNews: {
                display: this.state.newsDisplay,
                height: "150px"
            },
            cardPodcast: {
                display: this.state.podcastDisplay,
                height: "150px"
            },
            cardMusic: {
                display: this.state.musicDisplay,
                height: "150px"
            },
            cardVideo: {
                display: this.state.videoDisplay,
                height: "150px"
            },
            cardChat: {
                display: this.state.chatDisplay,
                height: "150px"
            }
        };

        const activeStyles = {
            cardStock: {
                display: this.state.stockDisplay,
                height: "auto",
                overflow: "hidden"
            },
            cardNews: {
                display: this.state.newsDisplay,
                height: "auto",
                overflow: "hidden"
            },
            cardPodcast: {
                display: this.state.podcastDisplay,
                height: "auto",
                overflow: "hidden"
            },
            cardMusic: {
                display: this.state.musicDisplay,
                height: "auto",
                overflow: "hidden"
            },
            cardVideo: {
                display: this.state.videoDisplay,
                height: "auto",
                overflow: "hidden"
            },
            cardChat: {
                display: this.state.chatDisplay,
                height: "auto",
                overflow: "hidden"
            }
        };

        const smallScreenStyles = {
            cardStock: {
                display: this.state.stockDisplay,
                overflow: "hidden"
            },
            cardNews: {
                display: this.state.newsDisplay,
                overflow: "hidden"
            },
            cardPodcast: {
                display: this.state.podcastDisplay,
                overflow: "hidden"
            },
            cardMusic: {
                display: this.state.musicDisplay,
                overflow: "hidden"
            },
            cardVideo: {
                display: this.state.videoDisplay,
                overflow: "hidden"
            },
            cardChat: {
                display: this.state.chatDisplay,
                overflow: "hidden"
            }
        };


        return (
            <div className="container-fluid">
                {/* <Jumbotron>
                </Jumbotron> */}

                {this.state.smallScreen ?
                    this.renderSmallScreen(isLoaded, smallScreenStyles)
                    :
                    this.renderLargeScreen(isLoaded, activeStyles, inactiveStyles)
                }

            </div>
        );
    }
}

export default withAuth(Productive);