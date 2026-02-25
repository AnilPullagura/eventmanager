import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("jwt_token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="admin-loading">Loading stats...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h2>Total Registrations</h2>
          <p className="stat-value">{stats.totalRegistrations}</p>
        </div>
        <div className="stat-card">
          <h2>Total Revenue</h2>
          <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
