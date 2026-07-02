import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-3
        rounded-xl
        bg-blue-600
        text-white
        font-semibold
        shadow-md
        hover:bg-blue-700
        transition-all
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export default Button;