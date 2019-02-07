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
import Card from '../../components/Card';
import Music from '../../components/Music';
import Video from '../../components/Video';

class Hungry extends Component {
    state = {
        recipes: []
    };

    componentDidMount () {
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
                console.log(res.data);
                this.setState({
                    recipes: res.data
                });
            })
            .catch(err => console.log(err));
    };

    handleOnClickImageButtonOne = e => {
        e.preventDefault();
        // var elem = document.getElementById("recipes");
        // if (elem) elem.remove();

        this.getRecipes("chili soup");
    };

    handleOnClickImageButtonTwo = e => {
        e.preventDefault();

        this.getRecipes("pasta");
    };

    handleOnClickImageButtonThree = e => {
        e.preventDefault();

        this.getRecipes("omelette");
    };

    handleOnClickImageButtonFour = e => {
        e.preventDefault();
        
        this.getRecipes("potato soup");
    };

    handleOnClickImageButtonFive = e => {
        e.preventDefault();

        this.getRecipes("croissant");
    };

    render() {
        const styles = {
            jumbotron: {
                // backgroundImage: `url(${bgImage})`
                background: 'linear-gradient(-45deg,#fff59d,#a5d6a7,#ffee58,#66bb6a)',
                backgroundColor: '#fff59d'
            }
        };

        return (
            <div className="container-fluid hungry">
                <Jumbotron
                    style={styles.jumbotron}
                >
                    <div className="display-4 mb-5 goodfood">good food good mood</div>
                    <img className="food-image mr-5 mt-5 mt-5" src={imgFood1} alt="food1" onClick={this.handleOnClickImageButtonOne}></img>
                    <img className="food-image mr-5 mt-5" src={imgFood2} alt="food2" onClick={this.handleOnClickImageButtonTwo}></img>
                    <img className="food-image mr-5 mt-5" src={imgFood3} alt="food3" onClick={this.handleOnClickImageButtonThree}></img>
                    <img className="food-image mr-5 mt-5" src={imgFood4} alt="food4" onClick={this.handleOnClickImageButtonFour}></img>
                    <img className="food-image mt-5" src={imgFood5} alt="food5" onClick={this.handleOnClickImageButtonFive}></img>
                </Jumbotron>

                <section className="container" id="recipes">
                    {this.state.recipes.map((recipe, index) => (
                        <Card
                            key={index}
                            title={recipe.title}
                        >
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={recipe.imageURL}></img>
                                </div>
                                <div className="col-sm-8 recipe-video">
                                    <Video
                                        searchTerm={recipe.title}
                                        numberOfResults="1"
                                    >
                                    </Video>
                                </div>
                            </div>
                        </Card>
                    ))}
                </section>
            </div>
        );
    }
}

export default withAuth(Hungry);