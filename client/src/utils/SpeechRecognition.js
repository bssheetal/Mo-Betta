window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

let finalTranscript = '';
let recognition = new window.SpeechRecognition();
// let interimTranscript = '';
var recognizing = false;

recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;

recognition.onresult = (event) => {
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript = transcript;
      console.log(`recognition.onresult: ${finalTranscript}`);
    } 
    // else {
    //   interimTranscript += transcript;
    // }
  }
}

recognition.onstart = function () {
    recognizing = true;
};

recognition.onend = function () {
    recognizing = false;
};

recognition.onerror = function (event) {
    recognizing = false;
};

export default {
    start: () => {
        if (!recognizing) recognition.start();
    },
    stop: () => {
        recognition.stop();
    },
    getResult: () => {
        return finalTranscript;
    }
};