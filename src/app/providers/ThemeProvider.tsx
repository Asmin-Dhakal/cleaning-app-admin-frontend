import React, { createContext, useContext, useState, useEffect } from "react";
import { darkTheme, lightTheme, type ThemeMode } from "../../styles/themes";
import type { Theme } from "../../styles/themes";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = "dark",
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  // Load theme from localStorage and apply CSS variables on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme") as ThemeMode | null;
    const resolvedMode =
      savedMode === "light" || savedMode === "dark" ? savedMode : initialMode;
    setMode(resolvedMode);
    applyThemeVariables(resolvedMode);
  }, []);

  // Save and apply theme when mode changes
  useEffect(() => {
    localStorage.setItem("theme", mode);
    applyThemeVariables(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to apply theme variables to document root
function applyThemeVariables(mode: ThemeMode) {
  const theme = mode === "light" ? lightTheme : darkTheme;
  const root = document.documentElement;

  // Set color variables
  root.style.setProperty("--color-primary", theme.colors.primary);
  root.style.setProperty("--color-primary-hover", theme.colors.primaryHover);
  root.style.setProperty("--color-accent", theme.colors.accent);
  root.style.setProperty("--color-accent-soft", theme.colors.accentSoft);
  root.style.setProperty("--color-background", theme.colors.background);
  root.style.setProperty("--color-surface", theme.colors.surface);
  root.style.setProperty(
    "--color-surface-elevated",
    theme.colors.surfaceElevated,
  );
  root.style.setProperty("--color-text", theme.colors.text);
  root.style.setProperty("--color-text-muted", theme.colors.textMuted);
  root.style.setProperty("--color-text-inverse", theme.colors.textInverse);
  root.style.setProperty("--color-border", theme.colors.border);
  root.style.setProperty("--color-focus-ring", theme.colors.focusRing);
  root.style.setProperty("--color-success", theme.colors.success);
  root.style.setProperty("--color-warning", theme.colors.warning);
  root.style.setProperty("--color-danger", theme.colors.danger);
  root.style.setProperty("--color-info", theme.colors.info);

  // Set gradient variables
  root.style.setProperty("--gradient-hero", theme.gradients.hero);
  root.style.setProperty("--gradient-card", theme.gradients.card);
  root.style.setProperty("--gradient-button", theme.gradients.button);
  root.style.setProperty("--gradient-subtle-bg", theme.gradients.subtleBg);

  // Set motion variables
  root.style.setProperty("--motion-duration-fast", theme.motion.duration.fast);
  root.style.setProperty(
    "--motion-duration-normal",
    theme.motion.duration.normal,
  );
  root.style.setProperty(
    "--motion-easing-standard",
    theme.motion.easing.standard,
  );
}
