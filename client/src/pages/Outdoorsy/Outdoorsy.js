import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import './style.css';
import Chat from '../../components/Chat'

class Outdoorsy extends Component {
    state = {
        username: "",
        email: ""
    }
    componentDidMount() {
        // May have async issue with Chatkit below
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                username: res.data.username,
                email: res.data.email
            })
        });
    }



    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("outside")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Outdoorsy</h1>
                </Jumbotron>

                <button onClick={this.handleOnClickButton}>get music list</button>
                 <p>user{this.state.username}</p>
                <Link to="/">Go home</Link>
                <div className="blank">
                <Chat userid={this.state.username}/>
               </div>
            </div>
        );
    }
}

export default withAuth(Outdoorsy);