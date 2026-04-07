const adminService = require("../services/adminService.js");

exports.getDashboardStats = async (req, res) => {
  try {
    const adminStats = await adminService.getAdminDashboardStats();
    res.status(200).json({
      success: true,
      data: adminStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch dashboard statistics",
    });
  }
};
