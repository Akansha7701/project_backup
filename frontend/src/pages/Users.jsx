import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";

function Users() {
  // States

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Fetch Users

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  // Create User

  const handleCreateUser = async () => {
    if (!name || !email || !password) {
      return toast.error("Please fill all fields.");
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/users",
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("User created successfully");

      setShowModal(false);

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setSearch("");

      fetchUsers();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  // Delete User

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");

      setShowDeleteModal(false);
      setSelectedUserId(null);

      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  // Search

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  // UI

  return (
    <div className="p-4 md:p-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered users in the system.
          </p>
        </div>

        <button
          onClick={() => {
            setName("");
            setEmail("");
            setPassword("");
            setRole("user");
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          + Add User
        </button>
      </div>

      {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-[700px] w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">User</th>

              <th className="p-4 text-left">Email</th>

              <th className="hidden md:table-cell p-4 text-left">Role</th>

              <th className="hidden md:table-cell p-4 text-left">Joined</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="hidden md:table-cell p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="hidden md:table-cell p-4">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="text-center py-14">
                    <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />

                    <p className="text-gray-500">No users found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 
          Create User Modal
      */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create New User
            </h2>

            <form
              autoComplete="off"
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser();
              }}
            >
              <input
                type="text"
                name="new-user-name"
                autoComplete="off"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                name="new-user-email"
                autoComplete="off"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                name="new-user-password"
                autoComplete="new-password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="user">User</option>
              </select>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setRole("user");
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  Delete Confirmation Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600" size={30} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
              Delete User
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Are you sure you want to delete this user?
            </p>

            <p className="text-center text-red-500 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUserId(null);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteUser}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
