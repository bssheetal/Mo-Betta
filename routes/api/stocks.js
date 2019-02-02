const router = require("express").Router();
const axios = require("axios");
var keys = require("../../keys.js");
var stockskey = keys.stocks.id;

router.get('/searchstock/:stockname', (req, res) => {

    var stockname=req.params.stockname;
    var stocksurl=`https://api.iextrading.com/1.0/stock/${stockname}/quote`;
    axios.get(stocksurl)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => res.json(err.message));
});

module.exports = router;