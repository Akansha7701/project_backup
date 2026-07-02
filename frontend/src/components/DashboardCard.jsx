import { motion } from "framer-motion";

function DashboardCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 h-52 flex flex-col items-center justify-center text-center transition-all duration-300"
    >
      {/* Icon */}

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg mb-5">
        {icon}
      </div>

      {/* Title */}

      <h3 className="text-gray-500 text-sm font-semibold">
        {title}
      </h3>

      {/* Value */}

      <p className="mt-3 text-3xl font-bold text-gray-800 break-all">
        {value}
      </p>
    </motion.div>
  );
}

export default DashboardCard;