import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";

import { FaFileAlt, FaComments, FaHistory } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalQueries: 0,
  });

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl py-8 px-8 shadow-xl mb-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              {role === "admin" ? "Admin Dashboard" : "Welcome Back!"}
            </h1>

            <p className="mt-3 text-lg text-blue-100">
              {role === "admin"
                ? "Manage documents, monitor  queries and oversee the complete document management system."
                : "Access documents, submit AI queries and manage your profile securely."}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {role === "admin" && (
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
          />
        )}

        <DashboardCard
          title="Total Documents"
          value={stats.totalDocuments}
          icon={<FaFileAlt />}
        />

        <DashboardCard
          title={role === "admin" ? "Total Queries" : "My Queries"}
          value={stats.totalQueries}
          icon={<FaComments />}
        />
      </div>

      <div className="mt-8">
        <RecentActivity activities={stats.recentActivity || []} />
      </div>
    </>
  );
}

export default Dashboard;
