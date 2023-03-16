import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";

import { loadAppFunc } from "./actions";
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
    console.log("RUN!");
  }, []);
  const [counter, setCounter] = useState(0);

  const clickMe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setCounter(counter + 1);
  };

  return (
    <div className={classNames({ app: true, no: false })}>
      {props.loading && <Loading />}
      <h1>Test - {props.title}</h1>
      <button onClick={clickMe}>Click me: {counter}</button>
    </div>
  );
};

export default App;
