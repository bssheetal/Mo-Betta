import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import Card from '../../components/Card';
import List from '../../components/List'
import Emotionsnavbar from '../../components/Emotionsnavbar';
import Video from '../../components/Video';
import { NewsList, NewsListItem } from '../../components/NewsList';
import { Container, Row, Col } from '../../components/Grid';
import './style.css'
import PodCast from '../../components/PodCast/PodCast';
import ChartLineGraph from '../../components/ChartLineGraph';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';
import Music from '../../components/Music';
import Jumbotron from '../../components/Jumbotron';

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
        stockDisplay: "block",
        newsDisplay: "block",
        podcastDisplay: "block",
        musicDisplay: "block",
        videoDisplay: "block",
        chatDisplay: "block",
        menuRight: "50px",
        menuTop: "120px",
        menuBtnWidth: "36px",
        menuBtnHeight: "30px",
        itemIconFontSize: "2.3rem",
        itemTextFontSize: "12pt",
        emotionIconFontSize: "3rem",
        emotionTextFontSize: "12pt",
        pageTitleFontSize: "28pt"
    };

    componentDidMount() {
        // this.setState({
        //     StockSearch: 'BA'
        // });

        this.handleFormSubmit("BA");
        this.loaddefaultchartforstock("BA");
        this.chartdisplay();

        // May have async issue with Chatkit below
        setTimeout(() => {
            API.getUser(this.props.user.id).then(res => {
                this.setState({
                    username: res.data.username,
                    email: res.data.email
                })
            });
        }, 1500);

        setTimeout(() => {
            API.scrapeNews(this.props.allResult).then(res => {
                this.setState({
                    news: res.data
                })
                console.log("=========data======")
                console.log(res.data);
                // console.log("========state========")
                // console.log(this.state.news);
            });
        }, 1800);

        setTimeout(() => {
            this.setState({
                stockDisplay: "block",
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none"
            });
        }, 2300);

        var mq = window.matchMedia("(max-width: 768px)");
        setTimeout(() => {
            if (mq.matches) {
                // window width is at less than 768px
                this.setState({
                    menuRight: "25px",
                    menuTop: "110px",
                    menuBtnWidth: "18px",
                    menuBtnHeight: "15px",
                    itemIconFontSize: "1.5rem",
                    itemTextFontSize: "9pt",
                    emotionIconFontSize: "2rem",
                    emotionTextFontSize: "9pt",
                    pageTitleFontSize: "18pt"
                });
            }
            else {
                // window width is greater than 768px
                this.setState({
                    menuRight: "50px",
                    menuTop: "120px",
                    menuBtnWidth: "36px",
                    menuBtnHeight: "30px",
                    itemIconFontSize: "3rem",
                    itemTextFontSize: "12pt",
                    emotionIconFontSize: "2.5rem",
                    emotionTextFontSize: "12pt",
                    pageTitleFontSize: "28pt"
                });
            };
        }, 3000);
    }


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
    handleOnClickIconStock = e => {
        // e.preventDefault();

        this.setState({
            stockDisplay: "block",
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none"
        });
    };

    handleOnClickIconNews = e => {
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

    renderCardStock = (isLoaded, cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <Card id="card-stock" classname="stocksheader" title="Stocks" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}>

                <div className="row" id="btn-load">
                    <div className="col-sm-6">
                        <div className="row stocksrow">
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
                                <h5 className="companynameandsymbol">{this.state.stockinfo.symbol} -{this.state.stockinfo.companyName}</h5>
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

    renderCardNews = (cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <div id="card-news">
                <Card title="Business News" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}>
                    <Container>
                        <Col size="xs-6">

                            <NewsList>
                                {this.state.news.slice(0, 5).map(item => {
                                    return (
                                        <NewsListItem
                                            key={item.title}
                                            title={item.title}
                                            href={'//' + item.link}
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

    renderCardPodcast = (cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <Card id="card-podcast" title="PodCast" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}>
                <Container>
                    <PodCast />
                </Container>
            </Card>
        );
    };

    renderCardChat = (cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <Card id="card-chat" title="Chat" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}>
                <Container>
                    <Chat userid={this.state.username} />
                </Container>
            </Card>
        );
    };

    renderCardMusic = (cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <div>
                <Music mood="happy" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}></Music>
            </div>
        );
    };

    renderCardVideo = (cardStyles) => {
        const cardheaderstyle = {
            cardheader: {
                // backgroundColor: '#648880'
            }
        };

        return (
            <Card id="card-video" title="Video" style={cardStyles} cardheaderstyle={cardheaderstyle.cardheader}>
                <Video
                    searchTerm="CNBC Television"
                    numberOfResults="5"
                />
            </Card>
        );
    };


    // Rendder the small screen layout (default layout)
    renderSmallScreen = (isLoaded, smallScreenStyles) => {
        var MenuStyles = {
            bmBurgerButton: {
                position: 'fixed',
                width: this.state.menuBtnWidth,
                height: this.state.menuBtnHeight,
                right: this.state.menuRight,
                top: this.state.menuTop,

            },
            bmBurgerBars: {
                background: '#373a47'
            },
            bmBurgerBarsHover: {
                background: '#a90000'
            },
            bmCrossButton: {
                height: '18px',
                width: '18px',
                fill: '#fff',
                color: "#fff",
                background: 'transparent'
            },
            bmCross: {
                background: '#bdc3c7',
                color: "#fff",
            },
            bmMenuWrap: {
                position: 'fixed',
                height: '100%'
            },
            bmMenu: {
                // background: '#fafafa',
                background: 'white',
                padding: '0.5em 1.5em 0',
                fontSize: '1.15em',
                height: '100%'

            },
            bmMorphShape: {
                fill: '#fff'
            },
            bmItemList: {
                color: '#fff',
                padding: '-0.5em',
                top: '0.3%',

            },
            bmItem: {
                display: 'block'
            },
            bmOverlay: {
                // background: 'rgba(0, 0, 0, 0.3)'
                background: 'rgba(255, 255, 255, 0.3)'
            }
        }

        var EmotionMenuStyles = {
            iconStyle: {
                fontSize: this.state.emotionIconFontSize
            },
            textStyle: {
                fontSize: this.state.emotionTextFontSize
            }
        };

        var pageStyles = {
            itemIcon: {
                fontSize: this.state.itemIconFontSize
            },
            itemText: {
                fontSize: this.state.itemTextFontSize
            },
            pageTitle: {
                fontSize: this.state.pageTitleFontSize
            }
        };

        return (
            <div>
                <Emotionsnavbar MenuStyles={MenuStyles} EmotionIconStyle={EmotionMenuStyles.iconStyle} EmotionIconTextStyle={EmotionMenuStyles.textStyle} />

                <div className="row">
                    {/* LEFT section */}
                    <div className="col-sm-1">
                        <div className="sidebar">
                            <div className="container text-center small-right-section activity-icons">
                                <br></br>
                                <div className="productive-icons icon-stock" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-chart-line" title="stock" onClick={this.handleOnClickIconStock}></i>
                                        <p id="item-text" style={pageStyles.itemText}>Stocks</p>
                                    </Rotate>
                                </div>

                                <div className="productive-icons icon-newspaper" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-newspaper" onClick={this.handleOnClickIconNews}></i>
                                        <p id="item-text" style={pageStyles.itemText}>News</p>
                                    </Rotate>
                                </div>

                                <div className="productive-icons icon-podcast" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-podcast" onClick={this.handleOnClickIconPodcast}></i>
                                        <p id="item-text" style={pageStyles.itemText}>Podcast</p>
                                    </Rotate>
                                </div>

                                <div className="productive-icons icon-music" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-music" onClick={this.handleOnClickIconMusic}></i>
                                        <p id="item-text" style={pageStyles.itemText}>Music</p>
                                    </Rotate>
                                </div>

                                <div className="productive-icons icon-video" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-video" onClick={this.handleOnClickIconVideo}></i>
                                        <p id="item-text" style={pageStyles.itemText}>Videos</p>
                                    </Rotate>
                                </div>

                                <div className="productive-icons icon-chat" style={pageStyles.itemIcon}>
                                    <Rotate>
                                        <i className="fas fa-comments" onClick={this.handleOnClickIconChat}></i>
                                        <p id="item-text" style={pageStyles.itemText}>Chat</p>
                                    </Rotate>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT section */}
                    <div className="col-sm-11">
                        <div className="container-fluid text-center">
                            <p className="mt-3" id="page-title" style={pageStyles.pageTitle}>happy is productive</p>
                        </div>

                        <div className="container text-center small-left-section">
                            {this.state.stockDisplay === 'block'
                                ?
                                this.renderCardStock(isLoaded, smallScreenStyles.cardStock, smallScreenStyles.cardStockHeader)
                                :
                                this.state.newsDisplay === 'block'
                                    ?
                                    this.renderCardNews(smallScreenStyles.cardNews)
                                    :
                                    this.state.podcastDisplay === 'block'
                                        ?
                                        this.renderCardPodcast(smallScreenStyles.cardPodcast)
                                        :
                                        this.state.chatDisplay === 'block'
                                            ?
                                            this.renderCardChat(smallScreenStyles.cardChat)
                                            :
                                            this.state.musicDisplay === 'block'
                                                ?
                                                this.renderCardMusic(smallScreenStyles.cardMusic)
                                                :
                                                this.renderCardVideo(smallScreenStyles.cardVideo)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    //whth
    render() {
        const { isLoaded } = this.state;

        const smallScreenStyles = {
            cardStock: {
                display: this.state.stockDisplay,
                overflow: "hidden",
            },
            cardStockHeader: {
                background: '#111;'
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

                {this.renderSmallScreen(isLoaded, smallScreenStyles)}

            </div>
        );
    }
}

export default withAuth(Productive);