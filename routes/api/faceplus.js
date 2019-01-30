const router = require("express").Router();
const axios = require("axios");
var fs = require("fs");



// Route /api/faceplusplus/faceanalyze
router.post("/faceanalyze", (req, res) => {

    console.log("HAHAHAHAH");

    var config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'json'
    };
    
    var data = {
        api_key: 'Bks_XP_htVac2PChn4oWlL9v_7ukGWjP',
        api_secret: '-JQADoPa44FewvVy9VXKq_j5G9jsDICg',
        image_base64: req.body.imageData
    }

    console.log("inside faceanalyze api");
    axios.post('http://api-us.faceplusplus.com/facepp/v3/detect', data, config).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.log(error);
    })
});

module.exports = router;