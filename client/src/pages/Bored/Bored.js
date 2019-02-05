import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import './style.css';

class Bored extends Component {
    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("party")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        const styles = {
            jumbotron: {
                backgroundColor: '#f0506e',
                background: '#f0506e'
            }
        };

        return (
            <div>
                <Jumbotron
                    style={styles.jumbotron}
                >
                    <h1>Bored</h1>
                </Jumbotron>

                <button onClick={this.handleOnClickButton}>get music list</button>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Bored);