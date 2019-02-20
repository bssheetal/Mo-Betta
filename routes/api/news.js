const router = require("express").Router();
const axios = require("axios");
// var cheerio = require("cheerio");

router.get("/scrape", (req, res) => {
    console.log(req.query.q);
    // console.log("test");

    // let usaTodayUrl = "http://www.usatoday.com";
    // let suffixUrl = "/money/markets/";
    // let url = usaTodayUrl + suffixUrl

    // axios.get(url)
    // .then(response => {
    //     res.send(response.data);
    // })
    // .catch(err => {
    //     res.json(err.message);
    // })
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

module.exports = router;