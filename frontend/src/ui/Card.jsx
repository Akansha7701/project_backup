function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-6
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;