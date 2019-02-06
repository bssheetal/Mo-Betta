import React, { Component } from 'react';
import AuthService from '../../components/AuthService';
import { Link } from 'react-router-dom';
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
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
        alert(err.response.data.message)
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // cardSingin = () => {
  //   return (
  //     <div className="container">
  //       <h1>Login</h1>
  //       <form onSubmit={this.handleFormSubmit}>
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
  //       <p><Link to="/signup">Go to Signup</Link></p>
  //     </div>
  //   );
  // };


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
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="pwd"
                            placeholder="Password"
                            onChange={this.handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
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