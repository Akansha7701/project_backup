import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import {
  FaHome,
  FaFileAlt,
  FaUpload,
  FaUsers,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center py-3 rounded-xl transition-all duration-300 ${
      collapsed ? "justify-center px-0" : "justify-start gap-3 px-4"
    } ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white flex flex-col shadow-xl z-50 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`flex p-3 ${collapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-blue-400"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Logo */}

      <div className={`border-b border-slate-800 ${collapsed ? "p-4" : "p-6"}`}>
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold">Intelligent Document Assistant</h2>

              <p className="text-xs text-gray-400">Secure Document Portal</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li>
            <NavLink to="/" end className={navClass}>
              <FaHome />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/documents" className={navClass}>
                  <FaFileAlt />
                  {!collapsed && <span>Documents</span>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/upload" className={navClass}>
                  <FaUpload />
                  {!collapsed && <span>Upload</span>}
                </NavLink>
              </li>

              <li>
  <NavLink to="/users" className={navClass}>
    <FaUsers />
    {!collapsed && <span>Users</span>}
  </NavLink>
</li>



              <li>
                <NavLink to="/query" className={navClass}>
                  <FaComments />
                  {!collapsed && <span>Query</span>}
                </NavLink>
              </li>
            </>
          )}

          {role === "user" && (
            <li>
              <NavLink to="/query" className={navClass}>
                <FaComments />
                {!collapsed && <span>Query</span>}
              </NavLink>
            </li>
          )}

          {/* <li>
            <NavLink to="/profile" className={navClass}>
              <FaUser />
              {!collapsed && <span>Profile</span>}
            </NavLink>
          </li> */}

          <li>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center py-3 rounded-xl transition-all duration-300 ${
                collapsed ? "justify-center" : "justify-start gap-3 px-4"
              } text-gray-300 hover:bg-red-500 hover:text-white`}
            >
              <FaSignOutAlt />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
