import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View your account information and security details.
        </p>
      </div>

      {/* Profile Banner */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* Left */}

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-5xl font-bold shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2 className="text-5xl font-bold">
                {user.name}
              </h2>

              <p className="text-blue-100 text-lg mt-2">
                {user.email}
              </p>

              <span
                className={`inline-block mt-5 px-5 py-2 rounded-full font-semibold ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-white/20 text-white"
                }`}
              >
                {user.role.toUpperCase()}
              </span>

            </div>

          </div>

          {/* Right */}

          <div className="text-right">

            <FaShieldAlt className="text-7xl opacity-20 ml-auto mb-4" />

            <p className="text-lg">
              Secure Document Management
            </p>

            <p className="text-blue-100 mt-2">
              Your account is verified and active.
            </p>

          </div>

        </div>

      </div>

      {/* Information Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Full Name */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center gap-4 mb-5">

            <div className="bg-blue-100 p-4 rounded-xl">
              <FaUser className="text-blue-600 text-xl" />
            </div>

            <h3 className="text-2xl font-semibold">
              Full Name
            </h3>

          </div>

          <p className="text-lg text-gray-600">
            {user.name}
          </p>

        </div>

        {/* Email */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center gap-4 mb-5">

            <div className="bg-green-100 p-4 rounded-xl">
              <FaEnvelope className="text-green-600 text-xl" />
            </div>

            <h3 className="text-2xl font-semibold">
              Email Address
            </h3>

          </div>

          <p className="text-lg text-gray-600 break-all">
            {user.email}
          </p>

        </div>

        {/* Role */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center gap-4 mb-5">

            <div className="bg-purple-100 p-4 rounded-xl">
              <FaUserShield className="text-purple-600 text-xl" />
            </div>

            <h3 className="text-2xl font-semibold">
              Role
            </h3>

          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              user.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {user.role.toUpperCase()}
          </span>

        </div>

        {/* Status */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center gap-4 mb-5">

            <div className="bg-green-100 p-4 rounded-xl">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>

            <h3 className="text-2xl font-semibold">
              Account Status
            </h3>

          </div>

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <span className="text-green-600 font-semibold">
              Active & Verified
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;