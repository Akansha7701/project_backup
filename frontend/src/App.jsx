import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
// import Profile from "./pages/Profile";
import Query from "./pages/Query";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MainLayout from "./layouts/MainLayout";

import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/documents"
          element={
            <AdminRoute>
              <Documents />
            </AdminRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <AdminRoute>
              <UploadDocument />
            </AdminRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/query" element={<Query />} />
      </Route>
    </Routes>
  );
}

export default App;
