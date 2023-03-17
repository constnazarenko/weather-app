import classNames from "classnames";
import React, { FC, Suspense, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { loadAppFunc } from "./actions";
import City from "./City";
import Dashboard from "./Dashboard";
import { Index } from "./Loading";
import "./styles.scss";

export interface AppProps {
  title: string;
  loading: boolean;
}
export interface AppActions {
  load: loadAppFunc;
}
export interface CityWeather {
  coord: { lon: number; lat: number };
  main: { temp: number; temp_max: number; temp_min: number };
  weather: { description: string; icon: string; id: number; main: string }[];
  name: string;

  [key: string]: unknown;
}

const App: FC<AppProps & AppActions> = (props) => {
  useEffect(() => {
    props.load();
  }, []);

  // TODO: Usually for such cases you want to use Redux as it present in current project.
  // But in this case State used for demo purposes.
  const [selectedCity, selectCity] = useState<CityWeather | null>();

  return (
    <div className={classNames({ app: true, no: false })}>
      {props.loading && <Index />}

      <header className="mb-4">
        <div className="navbar navbar-dark bg-primary box-shadow">
          <div className="container d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center">
              <strong>Weather APP example</strong>
            </div>
          </div>
        </div>
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
              className="btn btn-info text-bg-light my-2"
            >
              Go back to Dashboard
            </a>
          </div>
          <Suspense fallback={<Index />}>
            <City cw={selectedCity} />
          </Suspense>
        </section>
      )}
    </div>
  );
};

export default App;
