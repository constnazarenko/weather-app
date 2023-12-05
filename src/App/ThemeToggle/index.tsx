import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import "./styles.scss";

export type ExplicitThemeType = "light" | "dark";
export type ThemeType = ExplicitThemeType | "os-defined";

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}>(null);
export const ThemeExplicitContext = createContext<{
  themeExplicit: ExplicitThemeType;
  setThemeExplicit: React.Dispatch<React.SetStateAction<ExplicitThemeType>>;
}>(null);

export const detectInitialTheme = (): ThemeType => {
  const storedValue = localStorage.getItem("theme");
  if (storedValue && (storedValue === "light" || storedValue === "dark")) {
    document.documentElement.className = storedValue;
    return storedValue;
  }
  return "os-defined";
};
export const detectOSTheme = (): ExplicitThemeType =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
export const detectThemeExplicit = (theme: ThemeType): ExplicitThemeType =>
  theme !== "os-defined" ? theme : detectOSTheme();

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setThemeExplicit } = useContext(ThemeExplicitContext);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const themeChange = useCallback(({ matches }) => {
    if (document.documentElement.className === "os-defined") {
      setThemeExplicit(matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    mediaQuery.addEventListener("change", themeChange);

    return () => {
      mediaQuery.removeEventListener("change", themeChange);
    };
  }, []);

  const handleClick = useCallback(() => {
    const isOSDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const switchTo = (side: ThemeType) => {
      setTheme(side);
      setThemeExplicit(detectThemeExplicit(side));
      document.documentElement.className = side;
      if (side !== "os-defined") {
        localStorage.setItem("theme", side);
      } else {
        localStorage.removeItem("theme");
      }
    };

    if (theme === "os-defined") {
      switchTo(isOSDark ? "light" : "dark");
    } else if (theme === "dark") {
      switchTo(isOSDark ? "os-defined" : "light");
    } else if (theme === "light") {
      switchTo(isOSDark ? "dark" : "os-defined");
    }
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label={theme}
      aria-live="polite"
      onClick={handleClick}
    >
      <svg
        className="sun-and-moon"
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          className="stars"
          d="M 9.268 3.728 L 6.738 5.668 L 7.648 8.728 L 5.018 6.918 L 2.388 8.728 L 3.298 5.668 L 0.768 3.728 L 3.958 3.638 L 5.018 0.638 L 6.078 3.638 L 9.268 3.728 Z M 12.768 10.638 L 11.128 11.888 L 11.718 13.868 L 10.018 12.698 L 8.318 13.868 L 8.908 11.888 L 7.268 10.638 L 9.328 10.588 L 10.018 8.638 L 10.708 10.588 L 12.768 10.638 Z"
        />
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="12" r="6" fill="black" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" />
        <g className="sun-beams-left">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="12" y1="21" x2="12" y2="23" />
        </g>
        <g className="sun-beams-right">
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}
