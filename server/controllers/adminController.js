const Event = require("../models/Event");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const stats = await Event.aggregate([
      {
        $project: {
          attendeeCount: { $size: { $ifNull: ["$attendees", []] } },
          price: { $ifNull: ["$price", 0] },
        },
      },
      {
        $project: {
          attendeeCount: 1,
          price: 1,

          eventRevenue: { $multiply: ["$attendeeCount", "$price"] },
        },
      },
      {
        $group: {
          _id: null,
          totalRegistrations: { $sum: "$attendeeCount" },
          totalRevenue: { $sum: "$eventRevenue" },
        },
      },
    ]);

    const result =
      stats.length > 0 ? stats[0] : { totalRegistrations: 0, totalRevenue: 0 };

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        totalRegistrations: result.totalRegistrations,
        totalRevenue: result.totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch dashboard statistics",
    });
  }
};
