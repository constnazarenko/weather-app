import React, { FC, useContext, useEffect } from "react";

import classNames from "classnames";
import moment from "moment/moment";
import DayPlaceholder from "../../images/city_day.png";
import NightPlaceholder from "../../images/city_night.png";
import { CityWeather, ThemeExplicitContext } from "../component";
import { kelvin2c } from "../tools";
import { loadDBFunc } from "./actions";
import Search from "./Search";
import "./styles.scss";

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
  loadDB: loadDBFunc;
}

const DB: FC<DBHandlers & DBProps & DBActions> = (props) => {
  const { themeExplicit, setThemeExplicit } = useContext(ThemeExplicitContext);

  useEffect(() => {
    props.loadDB();
  }, []);

  const handleSelect = (cw: CityWeather) => {
    return () => {
      if (!cw.coord) {
        return;
      }
      props.onSelect(cw);
    };
  };

  const handleSearchChange = () => {
    let tail;
    return (cityName: string) => {
      clearTimeout(tail);
      tail = setTimeout(() => props.loadDB(cityName), 1000);
    };
  };

  return (
    <div className="container dashboard">
      <div className="row">
        <Search onChange={handleSearchChange()} />
      </div>
      <div className="row">
        {props.cities &&
          props.cities.map((city, ind) => (
            <div
              className="col-md-4 mb-4"
              key={`${ind}${city.name}`}
              onClick={handleSelect(city.weather)}
            >
              <div
                className={classNames({
                  "card box-shadow h-100": true,
                  "pe-none": !city.weather.coord,
                })}
              >
                <div className="card-img-top text-white p-0 overlay">
                  <h3 className="position-absolute m-3 bg-dark bg-opacity-25 rounded p-2">
                    {city.name}
                  </h3>
                  <img
                    className="card-img-top"
                    alt={city.name}
                    style={{ height: "225px", width: "100%", display: "block" }}
                    src={
                      city.photo
                        ? city.photo
                        : themeExplicit === "dark"
                        ? NightPlaceholder
                        : DayPlaceholder
                    }
                  />
                </div>
                {!!city.weather?.main?.temp && (
                  <div className="card-body">
                    <div className="card-text row">
                      <div className="col">
                        <h3>{kelvin2c(city.weather?.main?.temp)}°</h3>
                      </div>
                      <div className="col">
                        <small>{city.weather?.weather?.[0]?.main}</small>
                        <br />
                        <small>
                          Max. {kelvin2c(city.weather?.main?.temp_max)}° Min.{" "}
                          {kelvin2c(city.weather?.main?.temp_min)}°
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
                )}
                {!city.weather?.main?.temp && (
                  <div className="card-body">
                    <div className="card-text row">
                      <div className="col">
                        <small>
                          Weather API provider doesn't have such city
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DB;
