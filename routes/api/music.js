const router = require("express").Router();
// const axios = require("axios");
var Spotify = require('node-spotify-api');

// var spotify = new Spotify(keys.music.id);

router.get("/searchmusic", (req, res) => {

    var spotify = new Spotify({
        id: '608f7a893412478fb1dffc23cf6bd0c5',
        secret: '34bf60c1f8e3402294f060254f829845'
    });

    spotify.search({ type: 'track', query: 'Happy' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
});

module.exports = router;