const Event = require("../models/Event");

exports.getAdminDashboardStats = async () => {
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
  const data = {
    totalEvents,
    totalRegistrations: result.totalRegistrations,
    totalRevenue: result.totalRevenue,
  };
  return data;
};
