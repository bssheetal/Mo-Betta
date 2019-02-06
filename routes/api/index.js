const router = require("express").Router();
const moodRoutes = require("./stocks");
const emotionroutes = require("./faceplus");
const videoRoutes = require("./video");
const musicroutes = require("./music");
const userinforoutes=require("./userInfo");
// Book routes
router.use("/mobetta", moodRoutes);
router.use("/faceplusplus",emotionroutes);
router.use("/video", videoRoutes);
router.use("/music",musicroutes);
router.use("/news",moodRoutes);
router.use("/userinfo",userinforoutes);

module.exports = router;