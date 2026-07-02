import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";

import {
  FaFileAlt,
  FaComments,
  FaHistory,
} from "react-icons/fa";

function Dashboard() {
  const [documentsCount, setDocumentsCount] = useState(0);
  const [latestUpload, setLatestUpload] = useState("No documents uploaded");
  const [queryCount, setQueryCount] = useState(0);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDocumentsCount();
    fetchQueryHistory();
  }, []);

  const fetchDocumentsCount = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const docs = response.data;

      setDocumentsCount(docs.length);

      if (docs.length > 0) {
        setLatestUpload(docs[0].filename);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQueryHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/query/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueryCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl py-8 px-8 shadow-xl mb-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              {role === "admin"
                ? "Admin Dashboard"
                : "Welcome Back!"}
            </h1>

            <p className="mt-3 text-lg text-blue-100">
              {role === "admin"
                ? "Manage documents, monitor AI queries and oversee the complete document management system."
                : "Access documents, submit AI queries and manage your profile securely."}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title={
            role === "admin"
              ? "Total Documents"
              : "Available Documents"
          }
          value={documentsCount}
          icon={<FaFileAlt />}
        />

        <DashboardCard
          title={
            role === "admin"
              ? "Total Queries"
              : "My Queries"
          }
          value={queryCount}
          icon={<FaComments />}
        />

        <DashboardCard
          title="Recent Activity"
          value={documentsCount}
          icon={<FaHistory />}
        />
      </div>

      {/* Latest Uploaded Document */}

      <div className="bg-white rounded-2xl shadow-md mt-8 p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Latest Uploaded Document
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-700 break-all">
              {latestUpload}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Most recently uploaded document
            </p>
          </div>

          <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
            <FaFileAlt size={28} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="mt-8">
        <RecentActivity />
      </div>
    </>
  );
}

export default Dashboard;