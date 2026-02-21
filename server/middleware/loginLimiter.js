const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    message:
      "Too many Login attempts from this IP,please try again after 10 minutes",
  },
});

module.exports = loginRateLimiter;
