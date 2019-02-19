import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import API from './utils/API';
import TextToSpeech from "./utils/TextToSpeech";
// import SpeechRecognition from "./utils/SpeechRecognition"
import KeyHandler, { KEYUP, KEYDOWN } from 'react-key-handler';
import Emotionsnavbar from './components/Emotionsnavbar';

const Auth = new AuthService();

class App extends Component {
  state = {
    username: "",
    email: "",
    speechText: "",
    choice: "camera",
    menuRight: "50px",
    menuTop: "120px",
    menuBtnWidth: "36px",
    menuBtnHeight: "30px",
    itemIconFontSize: "2.3rem",
    itemTextFontSize: "12pt",
    emotionIconFontSize: "3rem",
    emotionTextFontSize: "12pt",
    pageTitleFontSize: "28pt"
  };
  // handleLogout = () => {
  //   Auth.logout();
  //   this.props.history.replace('/signup');
  // };

  // goToEditProfile = () => {
  //   this.props.history.replace('/profile');
  // };

  goToCamera = () => {
    this.props.history.replace('/camera');
  };


  componentDidMount() {
    console.log(Auth.getProfile());

    API.getUser(this.props.user.id).then(res => {
      console.log(res.data);
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });

    this.videoDisplay();

    var mq = window.matchMedia("(max-width: 768px)");
    setTimeout(() => {
      if (mq.matches) {
        // window width is at less than 768px
        this.setState({
          menuRight: "25px",
          menuTop: "110px",
          menuBtnWidth: "18px",
          menuBtnHeight: "15px",
          itemIconFontSize: "1.5rem",
          itemTextFontSize: "9pt",
          emotionIconFontSize: "2rem",
          emotionTextFontSize: "9pt",
          pageTitleFontSize: "18pt"
        });
      }
      else {
        // window width is greater than 768px
        this.setState({
          menuRight: "50px",
          menuTop: "120px",
          menuBtnWidth: "36px",
          menuBtnHeight: "30px",
          itemIconFontSize: "2.3rem",
          itemTextFontSize: "12pt",
          emotionIconFontSize: "3rem",
          emotionTextFontSize: "12pt",
          pageTitleFontSize: "28pt"
        });
      };
    }, 1000);

    setTimeout(() => {
      TextToSpeech.speak(`Hi ${this.state.username}, do you want to take a picture? please following the instructions on the page.`);
    }, 2000);

  };

  speak = () => {
    // SpeechRecognition.start();
  };

  getSpeechText = () => {
    // var speechText = SpeechRecognition.getResult();
    // this.setState({
    //   speechText: speechText
    // });

    // SpeechRecognition.stop();
    setTimeout(() => {
      console.log(this.state.speechText);

      if (this.state.speechText) this.handleOnClickCapture("");
      // switch (this.state.speechText) {
      //     case "yes":
      //         this.handleOnClickCapture("");
      //         break;
      //     default:
      // };
    }, 100);
  };

  videoDisplay = () => {
    const player = document.getElementById('player');
    const constraints = {
      video: true
    };

    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        player.srcObject = stream;
      });
  };

  handleOnClickCapture = e => {
    console.log("capture clicked");
    // e.preventDefault();

    console.log('video capture');
    const player = document.getElementById('player');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    // console.log(canvas.toDataURL());

    const data = { imageData: canvas.toDataURL() }
    API.facialRecognition(data)
      .then(res => {
        console.log(res.data);
        this.setState({
          emotion: res.data
        });

        switch (res.data) {
          case "happiness":
            TextToSpeech.speak(`Hi ${this.state.username}, you look happy. Let's get some work done!`);
            this.props.history.replace('/productive');
            break;
          case "neutral":
            TextToSpeech.speak(`Hi ${this.state.username}, you look bored. Do you want to do something nice to someone else?`);
            this.props.history.replace('/bored');
            break;
          case "sadness":
            TextToSpeech.speak(`Hi ${this.state.username}, you look sad. It is okay not to be okay as long as you are not giving up. Let me cheer you up!`);
            this.props.history.replace('/uplift');
            break;
          case "anger":
            TextToSpeech.speak(`Hi ${this.state.username}, you look angery. Let me help you to calm down and relax`);
            this.props.history.replace('/relax');
            break;
          case "fear":

          default:
            TextToSpeech.speak(`Hi ${this.state.username}, do you want to go out and get some inspiration from the nature?`);
            this.props.history.replace('/Outdoorsy');
        };
      })
      .catch(err => console.log(err));
  }

  previewFile = e => {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  findemotion = e => {
    var data = { imageData: document.getElementById('previewimage').getAttribute("src") }
    console.log(data);
    // API.facialRecognition(data)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));

    API.facialRecognition(data)
      .then(res => {
        console.log(res.data);
        this.setState({
          emotion: res.data
        });

        switch (res.data) {
          case "happiness":
            this.props.history.replace('/productive');
            break;
          case "neutral":
            this.props.history.replace('/bored');
            break;
          case "sadness":
            this.props.history.replace('/uplift');
            break;
          case "anger":
            this.props.history.replace('/relax');
            break;
          case "fear":
            break;
          default:
            this.props.history.replace('/hungry');
        };
      })
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      canvas: {
        display: "none"
      },
      fileInput: {
        display: "none"
      },
      previewImage: {
        display: "none"
      }
    };

    var MenuStyles = {
      bmBurgerButton: {
        position: 'fixed',
        width: this.state.menuBtnWidth,
        height: this.state.menuBtnHeight,
        right: this.state.menuRight,
        top: this.state.menuTop,

      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmBurgerBarsHover: {
        background: '#a90000'
      },
      bmCrossButton: {
        height: '18px',
        width: '18px',
        fill: '#fff',
        color: "#fff",
        background: 'transparent'
      },
      bmCross: {
        background: '#bdc3c7',
        color: "#fff",
      },
      bmMenuWrap: {
        position: 'fixed',
        height: '100%'
      },
      bmMenu: {
        // background: '#fafafa',
        background: 'white',
        padding: '0.5em 1.5em 0',
        fontSize: '1.15em',
        height: '100%'

      },
      bmMorphShape: {
        fill: '#fff'
      },
      bmItemList: {
        color: '#fff',
        padding: '-0.5em',
        top: '0.3%',

      },
      bmItem: {
        display: 'block'
      },
      bmOverlay: {
        // background: 'rgba(0, 0, 0, 0.3)'
        background: 'rgba(255, 255, 255, 0.3)'
      }
    }

    var EmotionMenuStyles = {
      iconStyle: {
        fontSize: this.state.emotionIconFontSize
      },
      textStyle: {
        fontSize: this.state.emotionTextFontSize
      }
    };

    return (
      <div>
        <Emotionsnavbar MenuStyles={MenuStyles} EmotionIconStyle={EmotionMenuStyles.iconStyle} EmotionIconTextStyle={EmotionMenuStyles.textStyle} />

        <div className="App">
          <div className="App-header">
            {/* <h2>Welcome {this.state.username}</h2> */}
          </div>
          <div className="App-intro">
            {/* <div>
            <button type="button" className="btn btn-warning rounded-0 m-2" onClick={this.goToCamera} >Go to Camera</button>
          </div> */}

            {/* <button type="button" className="btn btn-primary rounded-0 m-2" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger rounded-0 m-2" onClick={this.handleLogout}>Logout</button> */}


            <div className="container Camera">
              <div className="card card-signin flex-row my-5">
                <div className="card-img-left d-none d-md-flex">
                  <video id="player" autoPlay width="560" height="315"></video>
                </div>

                <div className="card-body">
                  <h1 className="card-title text-center"><b>Welcome {this.state.username}</b></h1>
                  <div>
                    <canvas id="canvas" width="560" height="315" style={styles.canvas}></canvas>
                    <button id="capture" className="mb-5" onClick={this.handleOnClickCapture} ref={capture => this.capture = capture} >Capture</button>
                  </div>
                  <div>
                    {/* here ref is added becoz functionality by default of input parameter comes with sometext which cannot be overridden so had to make display none and add a reference that on buttonclick the event in inputgets triggered*/}
                    <input type="file" id="fileInput" onChange={this.previewFile} ref={fileInput => this.fileInput = fileInput} style={styles.fileInput} />
                    <img src="" id="previewimage" onLoad={this.findemotion} alt="" style={styles.previewImage} />
                    <button onClick={() => this.fileInput.click()}>Upload Image</button>
                  </div>
                </div>
              </div>
              <span id="speech-question">Hi {this.state.username}, do you want to take a picture?</span>
              <ul>
                <li id="speech-yes">
                  {/* If yes, please look at the camera, press the button "s" and say "yes please". */}
                  If yes, please click on Capture Image.
                </li>
                <li id="speech-yes">
                  {/* Then after looking at the camera for 3 seconds, please lift your finger up from the key and the picture will automatically be taken. */}
                </li>
                <li id="speech-no">
                  If no, please click on Upload Image
                </li>
                <li id="speech-no">
                  or Choose an emotion by clicking the menu button on the top-right part of the page.
                </li>
              </ul>
              <React.Fragment>
                <KeyHandler
                  keyEventName={KEYDOWN}
                  keyValue="s"
                  onKeyHandle={this.speak}
                />
                <KeyHandler
                  keyEventName={KEYUP}
                  keyValue="s"
                  onKeyHandle={this.getSpeechText}
                />
                <p>{this.state.speechText}</p>
                <p>{this.state.emotion}</p>
              </React.Fragment>
            </div>

          </div>
        </div >
      </div>
    );
  }
}

export default withAuth(App);
