import React from "react";


export default function Button({
  children,
  onClick = () => {},
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-accent-500 hover:bg-accent-600 text-white font-medium transition-colors flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
