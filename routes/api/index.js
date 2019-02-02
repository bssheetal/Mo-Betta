const router = require("express").Router();
const moodRoutes = require("./stocks");
const emotionroutes = require("./faceplus");
const videoRoutes = require("./video");

// Book routes
router.use("/mobetta", moodRoutes);
router.use("/faceplusplus",emotionroutes);
router.use("/video", videoRoutes);

module.exports = router;