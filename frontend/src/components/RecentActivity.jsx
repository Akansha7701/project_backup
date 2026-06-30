import { useEffect, useState } from "react";
import axios from "axios";

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        // "http://localhost:5000/api/query/history",
        "http://localhost:5000/api/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActivities(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p>No activity yet</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((item) => (
            <li key={item.id}>
              {/* ❓ {item.query} */}
              {item.filename} uploaded
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivity;