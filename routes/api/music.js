const router = require("express").Router();
// const axios = require("axios");
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.music.id);

var spotify = new Spotify({
    id: '608f7a893412478fb1dffc23cf6bd0c5',
    secret: '34bf60c1f8e3402294f060254f829845'
});



var getMeSpotify = function (songName) {
    if (songName === undefined) {
        songName = "Happy";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

getMeSpotify("Sad");

// module.exports = router;