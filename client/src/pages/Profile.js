import React, { Component } from 'react';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

class Profile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    const styles = {
      userCard: {
        width: "400px"
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
              <span>Layout:</span>
              <span>Small Screen</span>
    
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);