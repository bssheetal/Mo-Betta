import React, { Component } from 'react';
import AuthService from '../../components/AuthService';
import { Link } from 'react-router-dom';
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();

    this.state = {
      emailErrMsg: "",
      passwordErrMsg: ""
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        // this.props.history.replace(`/profile`);
        localStorage.setItem("mobetta_layout", "small");
        this.props.history.replace(`/`);
      })
      .catch(err => {
        // alert(err.response.data.message)
        console.log(err.response.status);

        if (err.response.status === 404) {
          this.setState({
            emailErrMsg: err.response.data.message
          });
        } else if (err.response.status === 401) {
          this.setState({
            passwordErrMsg: err.response.data.message
          });
        };

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
      passwordErrMsg: ""
    });
  };

  render() {
    return (
      <div className="container signin-container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex">
              </div>
              <div className="card-body">
                <h1 className="card-title text-center"><b>Mo Betta</b></h1>
                <div className="row">
                  <div className="col-md-12">
                    <h4>Login Page</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={this.handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <span id="errmsg" className="text-danger ml-3">{this.state.emailErrMsg}</span>
                        <input
                          className="form-control"
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
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          id="pwd"
                          placeholder="Password"
                          onChange={this.handleChange} />
                      </div>

                      <button type="submit" className="btn btn-primary" onClick={this.handleOnClickSubmit}>Submit</button>
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

export default Login;