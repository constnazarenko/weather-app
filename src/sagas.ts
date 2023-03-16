import { all } from "redux-saga/effects";
import DB from "./App/Dashboard/sagas";
import App from "./App/sagas";

export default function* sagas() {
  yield all([App(), DB()]);
}
