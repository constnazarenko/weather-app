import React, { FC, useEffect, useState } from "react";

import moment from "moment/moment";
import { CityWeather } from "./component";
import { kelvin2c } from "./tools";

export interface CityProps {
  cw: CityWeather;
}

interface Forcast {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    pop: number;
    sys: { pod: string };
    visibility: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    };
    wind: { speed: number; deg: number; gust: number };
  }[];
  message: number;
}

export const useWeatherForecast = (url) => {
  const [state, setState] = useState<Forcast>(null);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { forecast: state };
};

const City: FC<CityProps> = (props) => {
  //TODO: Beware! Hardcoded keys in links is obviously a no-no in real projects!
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.cw.coord.lat}&lon=${props.cw.coord.lon}&appid=1827d8bc8210ab01b28b1546b538dd9d`;
  const { forecast } = useWeatherForecast(url);
  console.log("@@@###", props.cw, forecast);

  const { cw } = props;

  return (
    <div className="container city rounded mt-4">
      <div className="row">
        <div className="col-4 bg-info bg-opacity-25 rounded p-3">
          <div className="row">
            <h1>{cw.name}</h1>
          </div>
          <div className="row">
            <h1>{kelvin2c(cw.main.temp)}°</h1>
          </div>
          <div className="row">
            <div className="col">
              <small>{cw.weather?.[0]?.main}</small>
              <br />
              <small>
                Max. {kelvin2c(cw.main.temp_max)}° Min.{" "}
                {kelvin2c(cw.main.temp_min)}°
              </small>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-2">
            <small className="text-muted small">
              {moment()
                .utc()
                .add(cw.tzOffset, "minutes")
                .format("MMMM Do YYYY, h:mm:ss a")}
            </small>
          </div>
        </div>
        <div className="col container">
          <div className="row">
            {forecast &&
              forecast.list
                .filter((day) => {
                  //TODO: probably data should be aggregated somewhere else
                  //TODO: but as this is demo only, one midday reading will be sufficient.
                  return parseInt(moment.unix(day.dt).format("HH")) === 14;
                })
                .map((day) => (
                  <div key={day.dt} className="col">
                    <div
                      key={day.dt}
                      className="container card mb-4 box-shadow p-3 cw-card"
                    >
                      <div className="row">
                        <h1>{kelvin2c(day.main.temp)}°</h1>
                      </div>
                      <div className="row">
                        <div className="col text-nowrap">
                          <small>{day.weather?.[0]?.main}</small>
                          <br />
                          <small>
                            Max. {kelvin2c(day.main.temp_max)}° Min.{" "}
                            {kelvin2c(day.main.temp_min)}°
                          </small>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center align-items-center mt-2">
                        <small className="text-muted small">
                          {moment.unix(day.dt).format("ddd, D MMMM")}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
