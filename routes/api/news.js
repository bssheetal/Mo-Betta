const router = require("express").Router();
const axios = require("axios");
// var cheerio = require("cheerio");

router.get("/scrape", (req, res) => {

    // console.log("test");

    let usaTodayUrl = "http://www.usatoday.com";
    let suffixUrl = "/money/markets/";
    let url = usaTodayUrl + suffixUrl

    axios.get(url)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        res.json(err.message);
    })
});

module.exports = router;