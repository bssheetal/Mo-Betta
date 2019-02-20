import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "./style.css"
import Jumbotron from '../../components/Jumbotron';
// import bgImage from '../../images/food.jpg';
import imgFood1 from "../../images/food1.jpg";
import imgFood2 from "../../images/food2.jpg";
import imgFood3 from "../../images/food3.jpg";
import imgFood4 from "../../images/food4.jpg";
import imgFood5 from "../../images/food5.jpg";
import { NewsList, NewsListItem } from '../../components/NewsList';
import { Container, Row, Col } from '../../components/Grid';
import PodCast from '../../components/PodCast/PodCast';
import Rotate from 'react-reveal/Rotate';
import Chat from '../../components/Chat';
import Card from '../../components/Card';
import Music from '../../components/Music';
import Video from '../../components/Video';
import Emotionsnavbar from '../../components/Emotionsnavbar';

class Hungry extends Component {
    state = {
        recipes: [],
        username: "",
        email: "",
        news: [],
        linechartelements: {},
        isLoading: false,
        parentComponent: "hungry",
        newsDisplay: "none",
        podcastDisplay: "none",
        musicDisplay: "block",
        videoDisplay: "block",
        chatDisplay: "block",
        recipeDisplay: "none",
        menuRight: "50px",
        menuTop: "120px",
        menuBtnWidth: "36px",
        menuBtnHeight: "30px",
        itemIconFontSize: "2.3rem",
        itemTextFontSize: "12pt",
        emotionIconFontSize: "3rem",
        emotionTextFontSize: "12pt",
        pageTitleFontSize: "28pt",
        recipeVideo1: "",
        recipeVideo2: "",
        recipeVideo3: "",
        recipeVideo4: "",
        recipeVideo5: ""
    };

    componentDidMount() {
        API.scrapeNews(this.props.allResult).then(res => {
            this.setState({
                news: res.data
            })
            console.log("=========data======")
            console.log(res.data);
            // console.log("========state========")
            // console.log(this.state.news);
        });

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "none"
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

    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("hungry")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    getRecipes(searchTerm) {
        API.food(searchTerm)
            .then(res => {

                console.log(res.data.slice(0, 5));

                this.setState({
                    recipes: res.data.slice(0, 5)
                });

                API.video(res.data[0].title, 1)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            recipeVideo1: response.data
                        });
                    })
                    .catch(err => console.log(err));

                API.video(res.data[1].title, 1)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            recipeVideo2: response.data
                        });
                    })
                    .catch(err => console.log(err));

                API.video(res.data[2].title, 1)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            recipeVideo3: response.data
                        });
                    })
                    .catch(err => console.log(err));

                API.video(res.data[3].title, 1)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            recipeVideo4: response.data
                        });
                    })
                    .catch(err => console.log(err));

                API.video(res.data[4].title, 1)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            recipeVideo5: response.data
                        });
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
    };

    handleOnClickImageButtonOne = e => {
        e.preventDefault();
        // var elem = document.getElementById("recipes");
        // if (elem) {
        //     console.log("haha");
        //     elem.remove();
        // } else {
        //     console.log("bammer");
        // };

        this.getRecipes("chili soup");

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "block"
            });
        }, 3000);
    };

    handleOnClickImageButtonTwo = e => {
        e.preventDefault();

        this.getRecipes("pasta");

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "block"
            });
        }, 3000);
    };

    handleOnClickImageButtonThree = e => {
        e.preventDefault();

        this.getRecipes("omelette");

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "block"
            });
        }, 3000);
    };

    handleOnClickImageButtonFour = e => {
        e.preventDefault();

        this.getRecipes("potato soup");

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "block"
            });
        }, 3000);
    };

    handleOnClickImageButtonFive = e => {
        e.preventDefault();

        this.getRecipes("croissant");

        setTimeout(() => {
            this.setState({
                newsDisplay: "none",
                podcastDisplay: "none",
                musicDisplay: "none",
                videoDisplay: "none",
                chatDisplay: "none",
                recipeDisplay: "block"
            });
        }, 3000);
    };


    // Handle the OnClick event for icon-buttons
    handleOnClickIconNews = e => {
        console.log("News card clicked");
        this.setState({
            newsDisplay: "block",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none",
            recipeDisplay: "none"
        });
    };

    handleOnClickIconPodcast = e => {
        e.preventDefault();

        this.setState({
            newsDisplay: "none",
            podcastDisplay: "block",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "none",
            recipeDisplay: "none"
        });
    };

    handleOnClickIconChat = e => {
        e.preventDefault();

        this.setState({
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "none",
            chatDisplay: "block",
            recipeDisplay: "none"
        });
    };

    handleOnClickIconMusic = e => {
        e.preventDefault();

        this.setState({
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "block",
            videoDisplay: "none",
            chatDisplay: "none",
            recipeDisplay: "none"
        });
    };

    handleOnClickIconVideo = e => {
        e.preventDefault();

        this.setState({
            newsDisplay: "none",
            podcastDisplay: "none",
            musicDisplay: "none",
            videoDisplay: "block",
            chatDisplay: "none",
            recipeDisplay: "none"
        });
    };



    renderCardNews = (styles) => {
        return (
            <div id="card-news">
                <Card title="Business News" style={styles}>
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
                    <PodCast referrer={this.state.parentComponent} />
                </Container>
            </Card>
        );
    };

    renderCardChat = (styles) => {
        return (
            <Card id="card-chat" title="Chat" style={styles}>
                <Container>
                    <Chat userid={this.state.username} />
                </Container>
            </Card>
        );
    };

    renderCardMusic = (styles) => {
        return (
            <div>
                <Music mood="ed sheeran" style={styles}></Music>
            </div>
        );
    };

    renderCardVideo = (styles) => {
        return (
            <Card id="card-video" title="Video" style={styles}>
                <Video
                    searchTerm="BBC planet earth"
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
                            <p className="mt-3 goodfood" id="page-title" style={pageStyles.pageTitle}>good food good mood</p>
                            <img className="food-image mt-3 mb-4" src={imgFood1} alt="food1" onClick={this.handleOnClickImageButtonOne}></img>
                            <img className="food-image mt-3 mb-4" src={imgFood2} alt="food2" onClick={this.handleOnClickImageButtonTwo}></img>
                            <img className="food-image mt-3 mb-4" src={imgFood3} alt="food3" onClick={this.handleOnClickImageButtonThree}></img>
                            <img className="food-image mt-3 mb-4" src={imgFood4} alt="food4" onClick={this.handleOnClickImageButtonFour}></img>
                            <img className="food-image mt-3 mb-4" src={imgFood5} alt="food5" onClick={this.handleOnClickImageButtonFive}></img>
                        </div>

                        <section className="container recipe-container" style={smallScreenStyles.recipeContainer}>

                            {this.state.recipeDisplay === "block"
                                ?
                                <div>
                                    <Card
                                        key={0}
                                        title={this.state.recipes[0].title}
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <img id="card-recipe-image" src={this.state.recipes[0].imageURL}></img>
                                            </div>
                                            <div className="col-sm-8 recipe-video" id="recipes" >
                                                <iframe
                                                    key={"video" + 0}
                                                    title={"video" + 0}
                                                    width="560"
                                                    height="315"
                                                    src={this.state.recipeVideo1}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card
                                        key={1}
                                        title={this.state.recipes[1].title}
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <img id="card-recipe-image" src={this.state.recipes[1].imageURL}></img>
                                            </div>
                                            <div className="col-sm-8 recipe-video" id="recipes" >
                                                <iframe
                                                    key={"video" + 1}
                                                    title={"video" + 1}
                                                    width="560"
                                                    height="315"
                                                    src={this.state.recipeVideo2}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card
                                        key={2}
                                        title={this.state.recipes[2].title}
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <img id="card-recipe-image" src={this.state.recipes[2].imageURL}></img>
                                            </div>
                                            <div className="col-sm-8 recipe-video" id="recipes" >
                                                <iframe
                                                    key={"video" + 2}
                                                    title={"video" + 2}
                                                    width="560"
                                                    height="315"
                                                    src={this.state.recipeVideo3}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card
                                        key={3}
                                        title={this.state.recipes[3].title}
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <img id="card-recipe-image" src={this.state.recipes[3].imageURL}></img>
                                            </div>
                                            <div className="col-sm-8 recipe-video" id="recipes" >
                                                <iframe
                                                    key={"video" + 3}
                                                    title={"video" + 3}
                                                    width="560"
                                                    height="315"
                                                    src={this.state.recipeVideo4}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card
                                        key={4}
                                        title={this.state.recipes[4].title}
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 text-center">
                                                <img id="card-recipe-image" src={this.state.recipes[4].imageURL}></img>
                                            </div>
                                            <div className="col-sm-8 recipe-video" id="recipes" >
                                                <iframe
                                                    key={"video" + 4}
                                                    title={"video" + 4}
                                                    width="560"
                                                    height="315"
                                                    src={this.state.recipeVideo5}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                :
                                false
                            }

                            {/* {this.state.recipes.map((recipe, index) => (
                                <Card
                                    key={index}
                                    title={recipe.title}
                                >
                                    <div className="row">
                                        <div className="col-sm-4 text-center">
                                            <img id="card-recipe-image" src={recipe.imageURL}></img>
                                        </div>
                                        <div className="col-sm-8 recipe-video" id="recipes" >
                                            <Video
                                                searchTerm={recipe.title}
                                                numberOfResults="1"
                                            >
                                            </Video>
                                        </div>
                                    </div>
                                </Card>
                            ))} */}
                        </section>


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
                                            this.state.videoDisplay === 'block'
                                                ?
                                                this.renderCardVideo(smallScreenStyles.cardVideo)
                                                :
                                                false
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
            },
            recipeContainer: {
                display: this.state.recipeDisplay,
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

export default withAuth(Hungry);