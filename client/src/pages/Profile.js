import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    smallScreen: true
  };

  componentDidMount() {
    if (localStorage.getItem("mobetta_layout") === "small") {
      this.setState({
        smallScreen: true
      });
    } else {
      this.setState({
        smallScreen: false
      });
    };

    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }


  handleOnClickSmallScreeen = e => {
    e.preventDefault();

    localStorage.setItem("mobetta_layout", "small");
    this.setState({
      smallScreen: true
    });
  };

  handleOnClickLargeScreeen = e => {
    e.preventDefault();

    localStorage.setItem("mobetta_layout", "large");
    this.setState({
      smallScreen: false
    });
  };

  render() {
    const styles = {
      userCard: {
        width: "400px"
      },
      smallScreen: {
        backgroundColor: "#4b86b4",
        color: "#fff"
      },
      largeScreen: {
        backgroundColor: "#f4f4f4",
        color: "#222"
      }
    };

    return (
      <div className="container-fluid Profile">
        <div className="row mt-4">
          <div className="col-sm-5"></div>
          <div className="col-sm-5">
            <Card
              title="User Information"
              style={styles.userCard}
            >
              <p>Username: {this.state.username}</p>
              <p>Email: {this.state.email}</p>
            </Card>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-5"></div>
          <div className="col-sm-5">
            <Card
              title="Settings"
              style={styles.userCard}
            >
              <span>Layout: </span>
              <span>
                {this.state.smallScreen ?
                  <button className="small-screen ml-3" style={styles.smallScreen} onClick={this.handleOnClickSmallScreeen}>small screen</button>
                  :
                  <button className="small-screen ml-3" style={styles.largeScreen} onClick={this.handleOnClickSmallScreeen}>small screen</button>
                }
                {this.state.smallScreen ?
                  <button className="large-scrren ml-3" style={styles.largeScreen} onClick={this.handleOnClickLargeScreeen}>large screen</button>
                  :
                  <button className="large-scrren ml-3" style={styles.smallScreen} onClick={this.handleOnClickLargeScreeen}>large screen</button>
                }
              </span>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);