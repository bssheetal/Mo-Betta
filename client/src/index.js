import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Camera from './pages/Camera/Camera';
import Productive from './pages/Productive';
import Bored from './pages/Bored';
import Hungry from './pages/Hungry';
import Outdoorsy from './pages/Outdoorsy';
import Uplift from './pages/Uplift';
import Navbar from './components/Navbar';

// Here is if we have an id_token in localStorage
if(localStorage.getItem("id_token")) {
  // then we will attach it to the headers of each request from react application via axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/camera" component={Camera} />
            <Route exact path="/productive" component={Productive} />
            <Route exact path="/bored" component={Bored} />
            <Route exact path="/hungry" component={Hungry} />
            <Route exact path="/outdoorsy" component={Outdoorsy} />
            <Route exact path="/uplift" component={Uplift} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
