import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "./style.css"
import Jumbotron from '../../components/Jumbotron';
// import bgImage from '../../images/food.jpg'
import imgFood1 from "../../images/food1.jpg"
import imgFood2 from "../../images/food2.jpg"
import imgFood3 from "../../images/food3.jpg"
import imgFood4 from "../../images/food4.jpg"
import imgFood5 from "../../images/food5.jpg"
import Card from '../../components/Card'

class Hungry extends Component {
    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("hungry")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    goHome = e => {
        e.preventDefault();

        this.props.history.replace('/');
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
                    <img className="food-image mr-5 mt-5 mt-5" src={imgFood1} alt="food1" onClick={this.goHome}></img>
                    <img className="food-image mr-5 mt-5" src={imgFood2} alt="food2"></img>
                    <img className="food-image mr-5 mt-5" src={imgFood3} alt="food3"></img>
                    <img className="food-image mr-5 mt-5" src={imgFood4} alt="food4"></img>
                    <img className="food-image mt-5" src={imgFood5} alt="food5"></img>
                </Jumbotron>
                
                    <span>Hungry</span>
                    <button onClick={this.handleOnClickButton}>get music list</button>
                    <Link to="/">Go home</Link>
                 
                </div>
           
        );
    }
}

export default withAuth(Hungry);