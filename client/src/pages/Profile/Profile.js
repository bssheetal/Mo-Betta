import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import Card from '../../components/Card';
import './style.css';

class Profile extends Component {

  state = {
    username: "",
    email: "",
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  goToPreviousPage = () => {
    this.props.history.goBack();
  };

  render() {
    const styles = {
      userCard: {
        width: "400px"
      },
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

            <div id="icon-goback" onClick={this.goToPreviousPage}>
              <i className="fas fa-arrow-circle-left mt-3 mr-1"></i>
              Go Back
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default withAuth(Profile);