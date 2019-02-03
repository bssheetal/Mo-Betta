import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import './style.css';

class Relax extends Component {
    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("bored")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        const styles = {
            jumbotron: {
                backgroundColor: '#84ffff',
                background: '#84ffff'
            }
        };

        return (
            <div>
                <Jumbotron
                    style={styles.jumbotron}
                >
                    <h1>Relax</h1>
                </Jumbotron>

                <button onClick={this.handleOnClickButton}>get music list</button>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Relax);