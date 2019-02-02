import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import List from '../components/List'
class Productive extends Component {
    state = {
        stockinfo: [],
        StockSearch: "" /*always give this parameter as name of the input field otherwise you cant type in input field */
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
        console.log(this.state.StockSearch);
        API.stocks(this.state.StockSearch)
            .then(res => {
                console.log(res.data);
                this.setState({ stockinfo: res.data });
                console.log(this.state.stockinfo.latestPrice);
            })
            .catch(err => console.log(err));
    };

    //whth
    render() {
        return (
            <div>
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
                <Card>
                    {this.state.stockinfo.symbol}
                    <List
                        latestSource={this.state.stockinfo.latestSource}
                        latestPrice={this.state.stockinfo.latestPrice}
                        week52High={this.state.stockinfo.week52High}
                        week52Low={this.state.stockinfo.week52Low}
                        primaryExchange={this.state.stockinfo.primaryExchange}
                    />
               </Card>
                <div>
                    <Button onClick={this.handleOnClickButton}>get music list</Button>
                </div>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Productive);