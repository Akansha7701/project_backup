function Navbar({ collapsed }) {
  const username = localStorage.getItem("name") || "User";

  return (
    <header
      className="fixed top-0 right-0 h-20 bg-white shadow-md z-40 flex items-center justify-between px-8 transition-all duration-300"
      style={{
        left: collapsed ? "5rem" : "16rem", 
      }}
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Intelligent Document Assistant
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {username.charAt(0).toUpperCase()}
        </div>

        <span className="font-medium text-gray-700">
          {username}
        </span>
      </div>
    </header>
  );
}

export default Navbar;







