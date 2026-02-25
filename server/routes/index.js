const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const eventRoutes = require("./eventRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
