import classNames from "classnames";
import React, { FC, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { loadAppFunc } from "./actions";
import Dashboard from "./Dashboard";
import { Loading } from "./Loading";
import "./styles.scss";

export interface AppProps {
  title: string;
  loading: boolean;
}
export interface AppActions {
  load: loadAppFunc;
}

const App: FC<AppProps & AppActions> = (props) => {
  useEffect(() => {
    props.load();
  }, []);

  return (
    <div className={classNames({ app: true, no: false })}>
      {props.loading && <Loading />}

      <header className="mb-4">
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <strong>Weather APP example</strong>
            </a>
          </div>
        </div>
      </header>

      {/*<section className="jumbotron text-center">*/}
      {/*  <div className="container">*/}
      {/*    <h1 className="jumbotron-heading">Weather app example</h1>*/}
      {/*    <p className="lead text-muted">Data fetched from public APIs.</p>*/}
      {/*    <p>*/}
      {/*      <a href="#" className="btn btn-primary my-2">Main call to action</a>*/}
      {/*      <a href="#" className="btn btn-secondary my-2">Secondary action</a>*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <Dashboard />
    </div>
  );
};

export default App;
