const router = require("express").Router();
const axios = require("axios");
// var cheerio = require("cheerio");

router.get("/scrape", (req, res) => {

    console.log("test");

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
    
    // .then(function (response) {

    //     var $ = cheerio.load(response.data);

    //     $('a[itemprop="url"]').each(function (i, element) {

    //         var result = {};

    //         result.link = ("www.usatoday.com" + $(this).attr("href"));

    //         result.title = $(this)
    //             .find('p[itemprop="headline"]')
    //             .text();

    //         result.image = $(this)
    //             .find('img[itemprop="image"]')
    //             .attr("src");

    //         console.log(result);
    //     });
    // })





});

module.exports = router;