import { FaFileAlt, FaComments } from "react-icons/fa";

function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              <div
                className={`p-3 rounded-full ${
                  activity.type === "document"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {activity.type === "document" ? (
                  <FaFileAlt />
                ) : (
                  <FaComments />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-800 break-words">
                  {activity.text}
                </p>

                <p className="text-sm text-gray-500">
                  {activity.type === "document"
                    ? "Document Uploaded"
                    : "Query Asked"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(activity.time).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;