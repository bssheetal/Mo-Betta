const router = require("express").Router();
const moodRoutes = require("./stocks");
const emotionroutes = require("./faceplus");
const videoRoutes = require("./video");
const musicroutes = require("./music");
const userinforoutes=require("./userInfo");
const foodRoutes = require("./food");

// routes
router.use("/mobetta", moodRoutes);
router.use("/faceplusplus",emotionroutes);
router.use("/video", videoRoutes);
router.use("/music",musicroutes);
router.use("/news",moodRoutes);
router.use("/userinfo",userinforoutes);
router.use("/food", foodRoutes);

module.exports = router;