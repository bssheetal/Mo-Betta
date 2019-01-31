import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import News from './components/News';

const Auth = new AuthService();

class App extends Component {


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  goToCamera = () => {
    this.props.history.replace('/camera');
  };

  goToProductive = () => {
    this.props.history.replace('/productive');
  };

  goToBored = () => {
    this.props.history.replace('/bored');
  };

  goToHungry = () => {
    this.props.history.replace('/hungry');
  };

  goToOutdoorsy = () => {
    this.props.history.replace('/outdoorsy');
  };

  goToUplift = () => {
    this.props.history.replace('/uplift');
  };

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <p className="App-intro">
          <div>
            <button type="button" className="btn btn-success rounded-0 m-2" onClick={this.goToProductive} >Go to Productive</button>
          </div>
          <div>
            <button type="button" className="btn btn-warning rounded-0 m-2" onClick={this.goToCamera} >Go to Camera</button>
          </div>
          <div>
            <button type="button" className="btn btn-success rounded-0 m-2" onClick={this.goToBored} >Go to Bored</button>
          </div>
          <div>
            <button type="button" className="btn btn-warning rounded-0 m-2" onClick={this.goToHungry} >Go to Hungry</button>
          </div>
          <div>
            <button type="button" className="btn btn-success rounded-0 m-2" onClick={this.goToOutdoorsy} >Go to Outdoorsy</button>
          </div>
          <div>
            <button type="button" className="btn btn-warning rounded-0 m-2" onClick={this.goToUplift} >Go to Uplift</button>
          </div>
          <button type="button" className="btn btn-primary rounded-0 m-2" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger rounded-0 m-2" onClick={this.handleLogout}>Logout</button>

          <div>
            {/* <iframe title="video1" width="320" height="240" src="https://www.youtube.com/embed/RwrT4A_Oh6g?list=RDRwrT4A_Oh6g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          </div>
          <div>
            {/* <iframe title="video2" width="320" height="240" src="https://www.youtube.com/embed/amLf7PRa1QU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            <News />
          </div>

        </p>
      </div>
    );
  }
}

export default withAuth(App);
