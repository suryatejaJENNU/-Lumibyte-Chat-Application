import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";


export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800"
    >
      {theme === "dark" ? (
    <Moon className="w-5 h-5 text-accent-500" />   
  ) : (
    <Sun className="w-5 h-5 text-accent-500" />
  )}
    </button>
  );
}
