const router = require("express").Router();
const axios = require("axios");
var keys = require("../../keys.js");
var stockskey = keys.stocks.id;

router.get('/searchstock/:stockname', (req, res) => {

    // var stockname=req.body.stockname;
    var stockname=req.params.stockname;
    var stocksurl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockname}&apikey=${stockskey}`;
    axios.get(stocksurl)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => res.json(err.message));
});

module.exports = router;