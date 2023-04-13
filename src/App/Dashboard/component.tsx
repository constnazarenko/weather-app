import React, { FC, useEffect } from "react";

import moment from "moment/moment";
import { CityWeather } from "../component";
import { kelvin2c } from "../tools";
import { loadFunc } from "./actions";
import "./styles.scss";

// window.matchMedia("(prefers-color-scheme: dark)").matches;

export interface City {
  name: string;
  photo: string;
  weather?: CityWeather;
  tzOffset?: number;
}
export interface DBHandlers {
  onSelect: (cw: CityWeather) => void;
}
export interface DBProps {
  cities: City[];
}
export interface DBActions {
  load: loadFunc;
}

const DB: FC<DBHandlers & DBProps & DBActions> = (props) => {
  useEffect(() => {
    props.load();
  }, []);

  const handleSelect = (cw: CityWeather) => {
    return () => props.onSelect(cw);
  };

  return (
    <div className="container dashboard">
      <div className="row">
        {props.cities &&
          props.cities.map((city, ind) => (
            <div
              className="col-md-4"
              key={`${ind}${city.name}`}
              onClick={handleSelect(city.weather)}
            >
              <div className="card mb-4 box-shadow">
                <div className="card-img-top text-white p-0 overlay">
                  <h3 className="position-absolute m-3 bg-dark bg-opacity-25 rounded p-2">
                    {city.name}
                  </h3>
                  <img
                    className="card-img-top"
                    alt={city.name}
                    style={{ height: "225px", width: "100%", display: "block" }}
                    src={city.photo}
                  />
                </div>
                <div className="card-body">
                  <div className="card-text row">
                    <div className="col">
                      <h3>{kelvin2c(city.weather.main.temp)}°</h3>
                    </div>
                    <div className="col">
                      <small>{city.weather.weather?.[0]?.main}</small>
                      <br />
                      <small>
                        Max. {kelvin2c(city.weather.main.temp_max)}° Min.{" "}
                        {kelvin2c(city.weather.main.temp_min)}°
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <small className="text-muted small">
                      {moment()
                        .utc()
                        .add(city.tzOffset, "minutes")
                        .format("MMMM Do YYYY, h:mm:ss a")}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DB;
