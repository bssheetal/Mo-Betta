const axios = require('axios');
const router = require('express').Router();

// Route /api/video
// function to search Youtube for relevant videos based on the 'order' parameter
// The order parameter specifies the method that will be used to order resources in the API response. Options are: 'relevance', 'viewCount', 'rating', 'date', 'title', 'videoCount'
// maxResults: 0-50
// Youtube API Document https://developers.google.com/youtube/v3/docs/search/list
router.get("/", (req, res) => {
    // var searchText = req.body.searchText;
    var searchText = req.query.q;
    var maxResults = req.query.maxResults;
    // console.log(searchText);

    if (searchText) {
        var objParams = {
            key: "AIzaSyDRoM4iF7sZ807Iv__tG3KzEa2hRNBXHbM",
            q: searchText,
            part: "snippet",
            order: "relevance",
            maxResults: maxResults,
            type: "video"
        };

        axios.get("https://www.googleapis.com/youtube/v3/search?", { params: objParams })
            .then(response => {
                // console.log(response.data.items);
                var srcVideo = [];
                for (var i = 0; i < objParams.maxResults; i++) {
                    srcVideo.push("https://www.youtube.com/embed/" + response.data.items[i].id.videoId);
                }
                res.json(srcVideo);
            })
            .catch(err => res.json(err));

    } else {
        res.json("Please input the search text");
    };
});

module.exports = router;