import React, { useCallback, useState } from "react";
import "./styles.scss";

export function ThemeToggle() {
  const detectInitialTheme = (): string => {
    const storedValue = localStorage.getItem("theme");
    if (storedValue && (storedValue === "light" || storedValue === "dark")) {
      document.documentElement.className = storedValue;
      return storedValue;
    }
    return "os-default";
  };

  const [theme, setTheme] = useState(detectInitialTheme());

  const handleClick = useCallback(() => {
    const isOSDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const switchTo = (side: "dark" | "light" | "os-default") => {
      setTheme(side);
      document.documentElement.className = side;
      if (side === "dark" || side === "light") {
        localStorage.setItem("theme", side);
      } else {
        localStorage.removeItem("theme");
      }
    };

    if (theme === "os-default") {
      switchTo(isOSDark ? "light" : "dark");
    } else if (theme === "dark") {
      switchTo(isOSDark ? "os-default" : "light");
    } else if (theme === "light") {
      switchTo(isOSDark ? "dark" : "os-default");
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
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="12" r="6" fill="black" />
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className="sun-beams-left" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="12" y1="21" x2="12" y2="23" />
        </g>
        <g className="sun-beams-right" stroke="currentColor">
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}
