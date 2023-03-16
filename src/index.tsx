import * as React from "react";
import { Profiler, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import sagas from "./sagas";

import App from "./App";
import { Loading } from "./App/Loading";

const reduxLogger = createLogger({
  collapsed: true,
  diff: true,
  predicate: () => !!sessionStorage.getItem("enable_redux_logger"),
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(),
  compose(applyMiddleware(reduxLogger, sagaMiddleware))
);

sagaMiddleware.run(sagas);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // Aggregate or log render timings...
  console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
}

root.render(
  <Suspense fallback={<Loading />}>
    <Profiler id="StrictMode" onRender={onRender}>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    </Profiler>
  </Suspense>
);
