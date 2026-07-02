import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Navbar collapsed={collapsed} />

      <main
        className={`transition-all duration-300 pt-24 px-6 pb-6 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;