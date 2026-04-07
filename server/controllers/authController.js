const authService = require("../services/authService.js");

exports.registerUser = async (req, res) => {
  try {
    const newUser = await authService.registerNewUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    if (error.message === "Provide required fields") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "User already exists") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userData = await authService.loginTheUser(req.body);
    res.status(200).json({
      token: userData.token,
      user: {
        id: userData.user._id,
        name: userData.user.name,
        email: userData.user.email,
        role: userData.user.role,
      },
    });
  } catch (error) {
    if (error.message === "Email and password required") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Invalid credentials") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Login failed" });
  }
};

exports.fetchUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const details = await authService.getUserDetails(userId);
    res.status(200).json({
      user_details: details,
    });
  } catch (error) {
    if (error.message === "User ID required") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
