import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import './style.css';
import Video from '../../components/Video'
import Card from '../../components/Card';
import { NewsList, NewsListItem } from '../../components/NewsList';
import { Container, Row, Col } from '../../components/Grid';
import PodCast from '../../components/PodCast/PodCast';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';
import Music from '../../components/Music';
import Emotionsnavbar from '../../components/Emotionsnavbar';

class Relax extends Component {
    state = {
        username: "",
        email: "",
        news: [],
        linechartelements: {},
        isLoading: false,
        parentComponent: "relax",
        newsDisplay: "none",
        podcastDisplay: "none",
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
        // May have async issue with Chatkit below
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });

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
        }, 500);

        setTimeout(() => {
            this.setState({
                smallScreen: true,
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "block",
                videoDisplay: "none",
                chatDisplay: "none"
            });
        }, 1000);

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
                    itemIconFontSize: "2.3rem",
                    itemTextFontSize: "12pt",
                    emotionIconFontSize: "3rem",
                    emotionTextFontSize: "12pt",
                    pageTitleFontSize: "28pt"
                });
            };
        }, 2000);
    }

    // Handle the OnClick event for icon-buttons
    handleOnClickIconNews = e => {
        console.log("News card clicked");
        this.setState({
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
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "block",
            chatDisplay: "none"
        });
    };


    renderCardNews = (styles) => {
        return (
            <div id="card-news">
                <Card title="Life" style={styles}>
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

    renderCardPodcast = (styles) => {
        return (
            <Card id="card-podcast" title="PodCast" style={styles}>
                <Container>
                    <PodCast />
                </Container>
            </Card>
        );
    };

    renderCardChat = (styles) => {
        return (
            <Card id="card-chat" title="Chat" style={styles}>
                <Container>
                    <Chat />
                </Container>
            </Card>
        );
    };

    renderCardMusic = (styles) => {
        return (
            <div>
                <Music mood="the very best of enya" style={styles}></Music>
            </div>
        );
    };

    renderCardVideo = (styles) => {
        return (
            <Card id="card-video" title="Video" style={styles}>
                <Video
                    searchTerm="tom and jerry"
                    numberOfResults="5"
                />
            </Card>
        );
    };

    renderSmallScreen = (smallScreenStyles) => {
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

                                {/* <div className="productive-icons icon-newspaper" style={pageStyles.itemIcon}>
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
                                </div> */}

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
                            <p className="mt-3" id="page-title" style={pageStyles.pageTitle}>for every minute you are angry you lose sixty seconds of happiness</p>
                        </div>

                        <div className="container text-center small-left-section">
                            {this.state.newsDisplay === 'block'
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

    render() {
        const smallScreenStyles = {
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

                {this.renderSmallScreen(smallScreenStyles)}

            </div>
        );
    }
}

export default withAuth(Relax);