var router = require("express").Router();
var userInfoController=require("../../controllers/userInfo.js");

router.get("/stockinfo/:id",userInfoController.findById);
  
router.post("/stockinfo/", userInfoController.create);

module.exports = router;

