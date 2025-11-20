"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="fixed top-6 right-6 p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-50 opacity-0"
        aria-label="Toggle theme"
        disabled
      >
        <div style={{ width: 20, height: 20 }} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`fixed top-6 right-6 p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-50 ${theme === "light"
        ? "bg-[#ffdbb6] border-2 border-[#8b6914] text-[#2b1d0e] hover:bg-[#ffcf9f]"
        : "bg-[#2d3748] border-2 border-[#4a5568] text-[#f7fafc] hover:bg-[#3d4758]"
        }`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}