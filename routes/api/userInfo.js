var router = require("express").Router();
var userInfoController=require("../../controllers/userInfo.js");

router.get("/stockinfo/:id",userInfoController.findById);
  
router.get("/stockinfo",userInfoController.findById);

router.post("/savestockinfo", userInfoController.create);

module.exports = router;

