const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  fetchUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", fetchUser);
module.exports = router;
