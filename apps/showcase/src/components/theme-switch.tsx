"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "#/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      className="w-12 px-0"
      name="theme_toggle"
      aria-label="Theme toggle"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}>
      <Sun
        size={22}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={22}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
