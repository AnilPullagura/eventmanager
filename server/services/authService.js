const User = require("../models/User.js");
const { generator } = require("../Utils/jwtGenerator.js");
const bcrypt = require("bcrypt");

exports.registerNewUser = async (userData) => {
  const { name, email, password } = userData;
  if (!name || !email || !password) {
    throw new Error("Provide required fields");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

exports.loginTheUser = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generator({ email: user.email, userId: user._id });
  return { user, token };
};

exports.getUserDetails = async (userId) => {
  if (!userId) {
    throw new Error("User ID required");
  }
  const details = await User.findById(userId).select("-password");
  if (!details) {
    throw new Error("User not found");
  }
  return details;
};
