import { combineReducers } from "redux";
import DB from "./App/Dashboard/reducer";
import App from "./App/reducer";

export default () =>
  combineReducers({
    App,
    DB,
  });
