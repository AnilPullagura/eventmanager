const express = require("express");
const router = express.Router();
const loginRateLimiter = require("../middleware/loginLimiter");
const {
  registerUser,
  loginUser,
  fetchUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginRateLimiter, loginUser);
router.post("/user", fetchUser);
module.exports = router;
