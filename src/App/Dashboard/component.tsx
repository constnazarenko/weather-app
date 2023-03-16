import React, { FC, useEffect } from "react";

import moment from "moment/moment";
import { loadFunc } from "./actions";
import "./styles.scss";

export interface City {
  name: string;
  photo: string;
  weather?: unknown;
  tzOffset?: number;
}
export interface DBProps {
  cities: City[];
}
export interface DBActions {
  load: loadFunc;
}

const DB: FC<DBProps & DBActions> = (props) => {
  useEffect(() => {
    props.load();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {props.cities &&
          props.cities.map((city, ind) => (
            <div className="col-md-4" key={`${ind}${city.name}`}>
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  alt={city.name}
                  style={{ height: "225px", width: "100%", display: "block" }}
                  src={city.photo}
                />
                <div className="card-body">
                  <p className="card-text">{city.name}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                    </div>
                    <small className="text-muted">
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
