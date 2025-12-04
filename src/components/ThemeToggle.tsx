import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "landing" | "dashboard";
}

export const ThemeToggle = ({ variant = "dashboard" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      if (saved) return saved;
      // Default to system preference, fallback to dark
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={
        variant === "landing"
          ? "text-foreground hover:bg-secondary transition-all duration-300"
          : "text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
      }
      title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggle;
