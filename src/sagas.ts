import { all } from "redux-saga/effects";
import DB from "./App/Dashboard/sagas";

export default function* sagas() {
  yield all([DB()]);
}
