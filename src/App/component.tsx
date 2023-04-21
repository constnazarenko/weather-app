import classNames from "classnames";
import React, { createContext, FC, Suspense, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import City from "./City";
import Dashboard from "./Dashboard";
import Loading from "./Loading";
import "./styles.scss";
import {
  detectInitialTheme,
  detectThemeExplicit,
  ThemeToggle,
} from "./ThemeToggle";

export interface AppProps {
  title: string;
  loading: boolean;
}
export interface CityWeather {
  coord: { lon: number; lat: number };
  main: { temp: number; temp_max: number; temp_min: number };
  weather: { description: string; icon: string; id: number; main: string }[];
  name: string;

  [key: string]: unknown;
}

export const ThemeContext = createContext(null);
export const ThemeExplicitContext = createContext(null);

const App: FC<AppProps> = (props) => {
  const [theme, setTheme] = useState(detectInitialTheme());
  const [themeExplicit, setThemeExplicit] = useState(
    detectThemeExplicit(theme)
  );

  // TODO: Usually for such cases you want to use Redux as it present in current project.
  // But in this case State used for demo purposes.
  const [selectedCity, selectCity] = useState<CityWeather | null>();

  return (
    <ThemeExplicitContext.Provider value={{ themeExplicit, setThemeExplicit }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          className={classNames({ app: true, no: false })}
          data-bs-theme="blue"
        >
          {props.loading && <Loading />}

          <header className="mb-4">
            <nav className="navbar navbar-dark box-shadow">
              <div className="container d-flex justify-content-between">
                <div className="navbar-brand d-flex align-items-center">
                  <strong>Weather APP example</strong>
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          {!selectedCity && <Dashboard onSelect={selectCity} />}
          {!!selectedCity && (
            <section>
              <div className="container p-0">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCity(null);
                  }}
                  className="btn btn-link my-2"
                >
                  Go back to Dashboard
                </a>
              </div>
              <Suspense fallback={<Loading />}>
                <City cw={selectedCity} />
              </Suspense>
            </section>
          )}
        </div>
      </ThemeContext.Provider>
    </ThemeExplicitContext.Provider>
  );
};

export default App;
