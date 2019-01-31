var keys = require("../../keys.js");
var facerecognitionKey = "Bks_XP_htVac2PChn4oWlL9v_7ukGWjP";
var facerecognitionsecret = "-JQADoPa44FewvVy9VXKq_j5G9jsDICg";
const router = require("express").Router();
const axios = require("axios");
var fs = require("fs");
var facepp = require('face-plusplus-node');



router.post("/faceanalyze", (req, response) => {
    console.log("Inside emotiondetection");
    console.log("facerecognition key is" + facerecognitionKey);
    facepp.setApiKey(facerecognitionKey);
    facepp.setApiSecret(facerecognitionsecret);
    var parameters = {
        return_attributes: 'emotion',
        image_base64: req.body.imageData

    };


    facepp.post('/detect', parameters, function (err, res) {
        console.log(res);
        console.log(res.faces[0]);
        //response.json(res.faces[0].attributes.emotion);
        var emotions = res.faces[0].attributes.emotion
        let emotionskeys = Object.keys(emotions);
        let emotionsarr = Object.values(emotions);
        //response.json(max_emotion);
        var maxvalue = 0;
        var maxvaluekey = null;
        for (var i = 0; i < emotionsarr.length; i++) {
            
            if (emotionsarr[i] > maxvalue) {
                maxvalue = emotionsarr[i];
                maxvaluekey = emotionskeys [i];
            }
            
        }
        response.json(maxvaluekey);
    });
})

module.exports = router;