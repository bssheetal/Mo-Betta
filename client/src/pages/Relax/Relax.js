import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import Jumbotron from '../../components/Jumbotron';
import './style.css';
import Video from '../../components/Video'
import Card from '../../components/Card';
import { NewsList, NewsListItem } from '../../components/NewsList';
import { Container, Row, Col } from '../../components/Grid';
import './style.css'
import PodCast from '../../components/PodCast/PodCast';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';
import Music from '../../components/Music';

class Relax extends Component {
    state = {
        username: "",
        email: "",
        news: [],
        linechartelements: {},
        isLoading: false,
        parentComponent: "productive",
        news: [],
        smallScreen: true,
        newsDisplay: "block",
        podcastDisplay: "block",
        musicDisplay: "block",
        videoDisplay: "block",
        chatDisplay: "block",
        displayNewsCard: false,
        displayPodcastCard: false,
        displayChatCard: false,
        displayMusicCard: false,
        displayVideoCard: false
    };

    componentDidMount() {
        setTimeout(() => {
            if (localStorage.getItem("mobetta_layout") === "large") {
                this.setState({
                    smallScreen: false
                });
            } else {
                this.setState({
                    smallScreen: true,
                    newsDisplay: "none",
                    podcastDisplay: "none",
                    musicDisplay: "block",
                    videoDisplay: "none",
                    chatDisplay: "none"
                });
            };
        }, 100);

        // May have async issue with Chatkit below
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });
        
        API.scrapeNews(this.props.allResult).then(res => {
            this.setState({
                news: res.data
            })
            console.log("=========data======")
            console.log(res.data);
            // console.log("========state========")
            // console.log(this.state.news);
        });

    }

    // Handle the OnClick event for icon-buttons

    handleOnClickCardNews = e => {
        e.preventDefault();

        console.log("News card clicked");
        this.setState({
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
                {this.state.smallScreen ?
                    <Music mood="the very best of enya" style={styles}></Music>
                :
                <Card id="card-music" title="Music" style={styles} onClick={this.handleOnClickCardMusic}>
                    <Music mood="bored" style={styles}></Music>
                </Card>
                }
            </div>
        );
    };

    renderCardVideo = (styles) => {
        return (
            <Card id="card-video" title="Video" style={styles} onClick={this.handleOnClickCardVideo}>
                <Video
                    searchTerm="tom and jerry"
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

    render() {
        const { isLoaded } = this.state;
        const inactiveStyles = {
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

                {this.state.smallScreen ?
                    this.renderSmallScreen(isLoaded, smallScreenStyles)
                    :
                    this.renderLargeScreen(isLoaded, activeStyles, inactiveStyles)
                }

            </div>
        );
    }
}

export default withAuth(Relax);