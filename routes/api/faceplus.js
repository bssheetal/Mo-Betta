const router = require("express").Router();
const axios = require("axios");
var fs = require("fs");
var facepp = require('face-plusplus-node');

// Route /api/faceplusplus/faceanalyze
// router.post("/faceanalyze", (req, res) => {
//     axios
//         .post(`https://api-us.faceplusplus.com/facepp/v3/detect`, {
//             api_key: "Bks_XP_htVac2PChn4oWlL9v_7ukGWjP",
//             api_secret: "-JQADoPa44FewvVy9VXKq_j5G9jsDICg",
//             image_base64: req.body.imageData
//         })
//         .then(facePlusPlusData => {
//             console.log(facePlusPlusData)
//             res.json(facePlusPlusData.data);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(400).json({ error: "you got an error" });
//         });
// });

// // Route /api/faceplusplus/emotiondetection
// router.post("/emotiondetection", (req, res) => {
//     console.log("Inside emotiondetection");
//     axios.post(`https://api-us.faceplusplus.com/facepp/v3/face/analyze`, { data }).then(emotiondata => {
//         res.json(emotiondata.data);
//     }).then(emotiondata => {
//         console.log(emotiondata)
//         res.json(emotiondata.data);
//     })
//         .catch(error => {
//             console.log(error);
//             res.status(400).json({ error: "you got an error" });
//         });
// });


router.post("/faceanalyze", (req, response) => {
    console.log("Inside emotiondetection");

    facepp.setApiKey('Bks_XP_htVac2PChn4oWlL9v_7ukGWjP');
    facepp.setApiSecret('-JQADoPa44FewvVy9VXKq_j5G9jsDICg');
    var parameters = {
        return_attributes: 'emotion',
        image_base64: req.body.imageData
    }

    facepp.post('/detect', parameters, function (err, res) {

        console.log(res);
        // console.log(res.faces.attributes[0]);
        console.log(res.faces[0]);

        response.json(res.faces[0].attributes.emotion);
    });
})

module.exports = router;