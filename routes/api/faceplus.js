const router = require("express").Router();
const axios = require("axios");
var fs = require("fs");



// Route /api/faceplusplus/faceanalyze
router.post("/faceanalyze", (req, res) => {
    axios
        .post('https://api-us.faceplusplus.com/facepp/v3/detect', {
            api_key: 'Bks_XP_htVac2PChn4oWlL9v_7ukGWjP',
            api_secret: '-JQADoPa44FewvVy9VXKq_j5G9jsDICg',
            image_base64: req.body.imageData
        })
        .then(facePlusPlusData => {
            console.log(facePlusPlusData)
            res.json(facePlusPlusData.data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({error: "you got an error"});
        });
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