Artificially Intelligent App helps to deal with emotions providing various options based on current state of mind and makes the user go into positive frame of mind.
MERN(Mongo,Express,React and Node) application  in which User's emotions are captured from their facial expression and they are provided with various interests based on their state of emotion.

##  Getting Started 🌲

Simply open up the deployed link. You can create a new account or, if you're a returning user, you can just log in. 
User is directed to a page where you can upload image or take picture via Laptop's built in camera using windows based Face Recogntion API.Also voice commands via Windows based Speech Recogniton API can be used to capture image.Once the image is captured  Face++ is used to extract emotional state of mind of user.

Based on the state of mind user is redirected to various pages like Productive,Hungry,Outdoorsy,Bored,Uplift and Relax.

All these pages have different interests comprising of 
####  Productive
Stocks,News,Podcast,Music,Video,Chat
####  Hungry
Various Food Recipes
####  Outdoorsy
Some outdoor documentaries/Videos
#### Bored
Some Interesting music to cheer you up
#### Uplift
Some music to lift up ur mood
#### Relax
Some relaxing videos and music

## Prerequisites 📂
You will need both node and yarn installed on your computer in order to run this app. You can find out more about yarn at their official site.

https://yarnpkg.com/lang/en/docs/install/#windows-stable

## Installation 📁
Inside your terminal or command prompt, navigate to the location of the cloned repo. Install the necessary dependencies by running either -

npm i
or

yarn install
after the dependencies have been installed, you will need to make sure you have mongoDB configured on your computer as outlined in the next section.

If you already have mongoDB setup, you can run

yarn start
to intialize the app. It will launch the application at http://localhost:3000 and you are now ready to search for various based on your emotional state

mongoDB 🌿
In order for the app to render locally, you will need to have mongoDB installed on your computer. Depending on your operating system, the installation proccess will be different. You can find more info on installing mongoDB through their documentation.

https://docs.mongodb.com/manual/installation/

## Built With 🌱
HTML5 & CSS3

Bootstrap - CSS framework

Javascript - programming language

mongoDB - database

Express.js - routing framework

React.js - user interface library

Node.js - javascript runtime

#### NPM/Yarn packages

axios - Promise based HTTP client

cheerio - Markup parser and manipulator

Express - Routing framework

mongoose - NoSQL database

morgan - Logging middleware

morgan-body - Logging middleware

react-router-dom - Routing library for React with DOM bindings

Face-plusplus-node-To get user's current emotional state

chart.js&react-chartkick-To display the stocks charts for a period of 6 months

react-file-base64-To convert the image src to base64 format

react-rss-podcast-player-Listen to podcasts

chatkit-To enter in chatroom with buddies

### API's

Windows based Face recognition-To get user's face captured via Laptop's camera

Windows based speech recognition and text to speech-Allows user to give voice command to capture images

Demo
The demo of the Mo-Betta application can be found here.

https://mo-betta.herokuapp.com/login Default username:testuser@gmail.com Password:password

## Authors 🔑

Iris Cheng

Sheetal B Srikumar

Emad Saadeh

Taylor Walker 

## Acknowledgments 🙏

A bigly thank you to our instructor, Travis & TA's Adam and Mark 
