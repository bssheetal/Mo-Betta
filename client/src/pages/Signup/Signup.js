import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../components/AuthService';
import API from '../../utils/API';
import './style.css';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();

    this.state = {
      emailErrMsg: "",
      passwordErrMsg: "",
      usernameErrMsg: "",
      mongoErrMsg: ""
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace('/login');
      })
      .catch(err => {
        // alert(err);
        // console.log(err.response.status);
        const errdata = err.response.data;
        const errors = errdata.errors;
        console.log(errdata);

        if (errdata.name === "MongoError") {
          if (errdata.code === 11000) {
            this.setState({
              mongoErrMsg: "User signup request failed. Duplicate email address.",
            });
          }
        } else if (errdata.name === "ValidationError") {
          if (errors.email && errors.password && errors.username) {
            // console.log(errors.email.message);
            // console.log(errors.password.message);
            // console.log(errors.username.message);
            this.setState({
              emailErrMsg: errors.email.message.replace("Path", "").replace("email", "Email"),
              passwordErrMsg: errors.password.message.replace("Path", "").replace("password", "Password"),
              usernameErrMsg: errors.username.message.replace("Path", "").replace("username", "Username")
            });
          } else if (errors.email && errors.password) {
            this.setState({
              emailErrMsg: errors.email.message.replace("Path", "").replace("email", "Email"),
              passwordErrMsg: errors.password.message.replace("Path", "").replace("password", "Password"),
            });
          } else if (errors.password && errors.username) {
            this.setState({
              passwordErrMsg: errors.password.message.replace("Path", "").replace("password", "Password"),
              usernameErrMsg: errors.username.message.replace("Path", "").replace("username", "Username")
            });
          } else if (errors.email && errors.username) {
            this.setState({
              emailErrMsg: errors.email.message.replace("Path", "").replace("email", "Email"),
              usernameErrMsg: errors.username.message.replace("Path", "").replace("username", "Username")
            });
          } else if (errors.email) {
            this.setState({
              emailErrMsg: errors.email.message.replace("Path", "").replace("email", "Email"),
            });
          } else if (errors.password) {
            this.setState({
              passwordErrMsg: errors.password.message.replace("Path", "").replace("password", "Password"),
            });
          } else if (errors.username) {
            this.setState({
              usernameErrMsg: errors.username.message.replace("Path", "").replace("username", "Username")
            });
          } else {
            this.setState({
              mongoErrMsg: errdata.errmsg
            });
          };
        }

      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOnClickSubmit = event => {
    this.setState({
      emailErrMsg: "",
      passwordErrMsg: "",
      usernameErrMsg: "",
      mongoErrMsg: ""
    });
  };

  render() {
    return (
      <div className="container signup-container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex">
              </div>
              <div className="card-body">
                <h1 className="card-title text-center"><b>Mo Betta</b></h1>

                <div className="row">
                  <div className="col-md-12">
                    <h4>Sign Up Page</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={this.handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <span id="errmsg" className="text-danger ml-3">{this.state.usernameErrMsg}</span>
                        <input className="form-control"
                          type="text"
                          name="username"
                          id="username"
                          placeholder="User name"
                          onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <span id="errmsg" className="text-danger ml-3">{this.state.emailErrMsg}</span>
                        <input className="form-control"
                          type="email"
                          name="email"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <span id="errmsg" className="text-danger ml-3">{this.state.passwordErrMsg}</span>
                        <input className="form-control"
                          type="password"
                          name="password"
                          id="pwd"
                          placeholder="Password"
                          onChange={this.handleChange} />
                      </div>

                      <div className="row">

                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-primary" onClick={this.handleOnClickSubmit}>Submit</button>
                        </div>

                        <div className="col-sm-9">
                          <span id="errmsg" className="text-danger">{this.state.mongoErrMsg}</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Signup;