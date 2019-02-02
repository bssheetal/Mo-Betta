import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Video from "../components/Video";

class Productive extends Component {
    state = {
        stockinfo: [],
        StockSearch: " " /*always give this parameter as name of the input field otherwise you cant type in input field */
    };


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

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get recipes update the recipes state
        event.preventDefault();
        API.stocks(this.state.StockSearch)
            .then(res => this.setState({ stockinfo: res.data }))
            .catch(err => console.log(err));
    };


    render() {
        return (
            <div className="container">
                <h1>Productive</h1>
                <Input
                    type="text"
                    name="StockSearch"
                    value={this.state.stockSearch}
                    onChange={this.handleInputChange}
                    placeholder="Search for a Stock"
                />
                <Button
                    onClick={this.handleFormSubmit}
                    type="success"
                    className="input-lg">
                    Search
                </Button>
                <Button onClick={this.handleOnClickButton}>get music list</Button>

                <div>
                    <Video />
                </div>

                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Productive);