const router = require("express").Router();
const moodRoutes = require("./stocks");
const emotionroutes = require("./faceplus");

// Book routes
router.use("/mobetta", moodRoutes);
router.use("/faceplusplus",emotionroutes)

module.exports = router;