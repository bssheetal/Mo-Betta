const router = require("express").Router();
const moodRoutes = require("./stocks");
const emotionroutes = require("./faceplus");
const musicroutes = require("./music");

// Book routes
router.use("/mobetta", moodRoutes);
router.use("/faceplusplus",emotionroutes);
router.use("/music",musicroutes)

module.exports = router;