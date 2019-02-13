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
      errmsg: ""
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
        console.log(err);
      this.setState({
        errmsg: err.response.data.message
      });
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // cardSingup = () => {
  //   return (
  //     <div className="container">

  //       <h1>Signup</h1>
  //       <form onSubmit={this.handleFormSubmit}>
  //         <div className="form-group">
  //           <label htmlFor="username">Username:</label>
  //           <input className="form-control"
  //             placeholder="Username goes here..."
  //             name="username"
  //             type="text"
  //             id="username"
  //             onChange={this.handleChange} />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="email">Email address:</label>
  //           <input className="form-control"
  //             placeholder="Email goes here..."
  //             name="email"
  //             type="email"
  //             id="email"
  //             onChange={this.handleChange} />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="pwd">Password:</label>
  //           <input className="form-control"
  //             placeholder="Password goes here..."
  //             name="password"
  //             type="password"
  //             id="pwd"
  //             onChange={this.handleChange} />
  //         </div>
  //         <button type="submit" className="btn btn-primary">Submit</button>
  //       </form>
  //       <p><Link to="/login">Go to Login</Link></p>
  //     </div>
  //   );
  // }

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
                          <input className="form-control"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="User name"
                            onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
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
                          <input className="form-control"
                            type="password"
                            name="password"
                            id="pwd"
                            placeholder="Password"
                            onChange={this.handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        <span id="errmsg" className="text-danger ml-4">{this.state.errmsg}</span>
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