const router = require("express").Router();
const moodRoutes = require("./stocks");

// Book routes
router.use("/mobetta", moodRoutes);

module.exports = router;