const jwt = require("jsonwebtoken");

exports.generator = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
