const router = require("express").Router();
const axios = require("axios");

router.get("/searchstock", (req, res) => {

    var stockname="AAPL";
    var stocksurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockname}&apikey=WCO9IINU6B4U00GL`;
    axios.get(stocksurl, { params: { q: req.query } })
    .then(response => {
        res.send(response.data);
    })
    .catch(err => res.json(err.message));
});

module.exports = router;