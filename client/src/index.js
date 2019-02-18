import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Productive from './pages/Productive/Productive';
import Bored from './pages/Bored/Bored';
import Hungry from './pages/Hungry/Hungry';
import Outdoorsy from './pages/Outdoorsy/Outdoorsy';
import Uplift from './pages/Uplift/Uplift';
import Relax from "./pages/Relax/Relax";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Here is if we have an id_token in localStorage
if (localStorage.getItem("id_token")) {
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
            <Route exact path="/productive" component={Productive} />
            <Route exact path="/bored" component={Bored} />
            <Route exact path="/hungry" component={Hungry} />
            <Route exact path="/outdoorsy" component={Outdoorsy} />
            <Route exact path="/uplift" component={Uplift} />
            <Route exact path="/relax" component={Relax} />
            {/* <Footer /> */}
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
