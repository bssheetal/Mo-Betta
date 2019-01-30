const router = require("express").Router();
const axios = require("axios");
var fs = require("fs");

var config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'json'
};



router.post("/faceanalyze", (req, res) => {
    var data = {
        api_key: 'Bks_XP_htVac2PChn4oWlL9v_7ukGWjP',
        api_secret: '-JQADoPa44FewvVy9VXKq_j5G9jsDICg',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVxcaZdoOTdijHWappDS7daG8lhV72iTcrgTh6HPE3yyLCxvR'
    }

    console.log("inside faceanalyze api");
    axios.post('https://api-us.faceplusplus.com/facepp/v3/detect', data, config).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.log(error);
    })
});

router.post("/emotiondetection", (req, res) => {
    axios.post('https://api-us.faceplusplus.com/facepp/v3/detect', config, {
        api_key,
        api_secret,
        face_tokens,
        return_attributes
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.log(error);
    })
})
module.exports = router;