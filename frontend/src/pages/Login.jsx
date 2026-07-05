import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", response.data.user.name);

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <FaShieldAlt className="text-white text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                DRDO Assistant
              </h1>
              <p className="text-slate-500">Intelligent Document Management</p>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-slate-800 leading-tight mb-6">
              Secure Document
              <br />
              Management
              <span className="text-blue-600"> Made Simple.</span>
            </h2>

            <p className="text-lg text-slate-600 leading-8 max-w-lg">
              A secure role-based document management system designed for
              intelligent document storage, retrieval, and AI-assisted
              workflows.
            </p>
          </div>

          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl h-fit">
              <FaCheckCircle size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 text-lg">
                Secure Authentication
              </h3>

              <p className="text-slate-500 mt-2">
                JWT-based authentication with role-based access for Admin and
                Users.
              </p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 text-lg">
              📄 Document Management
            </h3>

            <p className="text-slate-500 mt-2">
              Upload, organize, preview, and manage important documents
              securely.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 text-lg">
              🤖 AI Ready
            </h3>

            <p className="text-slate-500 mt-2">
              Built to integrate intelligent document search and AI-powered
              assistance.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleLogin}
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10 w-full max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue to DRDO Assistant
            </p>
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <FaEnvelope
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
  type="email"
  name="username"
  autoComplete="off"
  placeholder="Email Address"
  className="w-full border border-gray-300 rounded-lg p-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

        


          {/* Password */}
          <div className="relative mb-4">
            <FaLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
  type={showPassword ? "text" : "password"}
  name="password"
  autoComplete="new-password"
  placeholder="Password"
  className="w-full border border-gray-300 rounded-lg p-3 pl-11 pr-12"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember Me */}
          {/* <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div> */}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>

          {/* <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p> */}
        </motion.form>
      </div>
    </div>
  );
}

export default Login;
