import React, { FC, useEffect, useState } from "react";

import moment from "moment/moment";
import { CityWeather } from "../component";
import { kelvin2c } from "../tools";

import "./styles.scss";

export interface CityProps {
  cw: CityWeather;
}
export interface AggregatedList {
  [k: number]: {
    date: Date;
    weather: string;
    min: number;
    max: number;
  };
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
  aggregatedList?: AggregatedList;
}

export const useWeatherForecast = (url) => {
  const [state, setState] = useState<Forcast>(null);

  useEffect(() => {
    let ignore = false;

    const dataFetch = async () => {
      const data: Forcast = await (await fetch(url)).json();

      const aggregatedData: AggregatedList = {};
      data.list.forEach((d) => {
        const date = new Date(d.dt_txt);
        if (!aggregatedData[date.getDate()]) {
          aggregatedData[date.getDate()] = {
            date: date,
            weather: d.weather?.[0]?.description,
            min: d.main.temp_min,
            max: d.main.temp_max,
          };
        } else {
          if (aggregatedData[date.getDate()].min > d.main.temp_min) {
            aggregatedData[date.getDate()].min = d.main.temp_min;
          }
          if (aggregatedData[date.getDate()].max < d.main.temp_max) {
            aggregatedData[date.getDate()].max = d.main.temp_max;
          }
        }
      });
      data.aggregatedList = aggregatedData;

      if (!ignore) {
        setState(data);
      }
    };

    dataFetch();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { forecast: state };
};

const Index: FC<CityProps> = (props) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.cw.coord.lat}&lon=${props.cw.coord.lon}&appid=1827d8bc8210ab01b28b1546b538dd9d`;
  const { forecast } = useWeatherForecast(url);

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
              forecast.aggregatedList &&
              Object.values(forecast.aggregatedList).map((day) => (
                <div key={day.date} className="col">
                  <div className="container card mb-4 box-shadow p-3 cw-card">
                    <div className="row">
                      <h1>
                        {kelvin2c(day.max)}° - {kelvin2c(day.min)}°
                      </h1>
                    </div>
                    <div className="row">
                      <div className="col text-nowrap">
                        <small>{day.weather}</small>
                        <br />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <small className="text-muted small">
                        {day.date.getDay() === new Date().getDay()
                          ? "Today"
                          : day.date.toDateString()}
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

export default Index;
