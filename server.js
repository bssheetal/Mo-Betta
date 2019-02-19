require("dotenv").config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
var bodyParser = require('body-parser');
//Scraping
var axios = require("axios");
var cheerio = require("cheerio");
var parser = require('ua-parser-js');
// Chat
const Chatkit = require('@pusher/chatkit-server')
// init chatkit
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:5213cf99-a1cc-4e12-969e-b88b8d7dc708",
  key: "0be1c701-85ec-480c-9ef7-0514806a7380:8lQMT5wJ98ArOVm+BYWeDk5z6nPNWCC8kpBav18QSQ0=",
})

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }, { limit: '50mb' }));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET
});

// Add routes, both API and view


// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  db.User.findOne({
    email: req.body.email
  }).then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        let token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.SERVER_SECRET, { expiresIn: 129600 }); // Sigining the token
        res.json({ success: true, message: "Token Issued!", token: token, user: user });
      } else {
        res.status(401).json({ success: false, message: "Authentication failed. Wrong password." });
      }
    });
  }).catch(err => res.status(404).json({ success: false, message: "User not found. Wrong email address.", error: err }));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    // .catch(err => res.status(400).json({ success: false, message: "User signup request failed.", error: err}));
    .catch(err => res.status(400).json(err));

    // Chatkit sign-up hook
    console.log(req.body.username);

    chatkit.createUser({ 
        id: req.body.username, 
        name: req.body.username 
         })
        .then(() => res.sendStatus(201))
        .catch(error => {
          if (error.error_type === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
          } 
//           (node:2223) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// [0]     at ServerResponse.setHeader (_http_outgoing.js:482:11)
// [0]     at ServerResponse.header (/Users/Esaadeh/Bootcamp/BootCamp/Assignments/Mo-Betta/node_modules/express/lib/response.js:767:10)
// [0]     at ServerResponse.send (/Users/Esaadeh/Bootcamp/BootCamp/Assignments/Mo-Betta/node_modules/express/lib/response.js:170:12)
// [0]     at ServerResponse.json (/Users/Esaadeh/Bootcamp/BootCamp/Assignments/Mo-Betta/node_modules/express/lib/response.js:267:15)
// [0]     at chatkit.createUser.then.catch.error (/Users/Esaadeh/Bootcamp/BootCamp/Assignments/Mo-Betta/server.js:88:38)
// [0]     at process.internalTickCallback (internal/process/next_tick.js:77:7)
// [0] (node:2223) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
// [0] (node:2223) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


          // else {
          //   res.status(error.status).json(error)
          // }
        })

});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({ success: false, message: 'No user found' });
    }
  }).catch(err => res.status(400).send({ success: false, message: "User not found...", error: err}));
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});


app.get("/news", isAuthenticated, (req, res) => {
  console.log("===== news=====");
  // console.log(req.query.q);
  console.log(req.headers.referer);
  let ref = "";
  // let splitRef;
  console.log("=========news ref===========");
  refPage = req.headers.referer;
  console.log(ref);

  let usaTodayUrl = 'http://www.usatoday.com'
  let foodUrl = 'travel/usa-today-eats/'
  let travelUrl = '/travel/'
  let boredUrl = '/life/books/'
  let entertainUrl = '/life/entrtainthis/'
  let marketsUrl = '/money/markets/'
  let upliftUrl = '/opinion/cartoons/'


  let theUrl = usaTodayUrl + marketsUrl

  switch (refPage) {
    case ('http://localhost:3000/bored'):
      theUrl = usaTodayUrl + upliftUrl
      break;
    case ('http://localhost:3000/hungry'):
      theUrl = usaTodayUrl + foodUrl
      break;
    case ('http://localhost:3000/outdoorsy'):
      // theUrl = usaTodayUrl + travelUrl
      theUrl = usaTodayUrl + boredUrl
      break;
    case ('http://localhost:3000/productive'):
      theUrl = usaTodayUrl + marketsUrl
      break;
    case ('http://localhost:3000/relax'):
      theUrl = usaTodayUrl + boredUrl
      break;
    case ('http://localhost:3000/uplift'):
      theUrl = usaTodayUrl + upliftUrl
      break;
  }



  // console.log("Scrape");
  var allResult = [];
  var resObject = {};
  axios.get(theUrl).then(function (response) {
    var result = {};
    var $ = cheerio.load(response.data);
    $('a[itemprop="url"]').each(function (i, element) {

      result.link = ("www.usatoday.com" + $(this).attr("href"));
      result.title = $(this)
        .find('p[itemprop="headline"]')
        .text();
      result.image = $(this)
        .find('img[itemprop="image"]')
        .attr("src");
      // console.log("==========RESULT==============")
      // console.log(result);
      resObject = { link: result.link, title: result.title, image: result.image };
      allResult.push(resObject);
      // allResult = allResult + result;

    })
    // console.log("============ALL==============")
    // console.log(allResult);
    res.send(allResult);
  }).catch(err => console.log(err));
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
