function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-slate-50
        px-4
        py-3
        outline-none
        transition
        duration-300
        focus:border-blue-600
        focus:ring-4
        focus:ring-blue-100
      "
    />
  );
}

export default Input;