import { all } from "redux-saga/effects";
import App from "./App/sagas";

export default function* sagas() {
  yield all([App()]);
}
