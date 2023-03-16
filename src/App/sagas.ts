import { call, put, takeLatest } from "redux-saga/effects";
import { LoadAction } from "./actions";
import {
  APP_FETCH_JSON,
  APP_FETCH_JSON_FAIL,
  APP_FETCH_JSON_SUCCESS,
  REMOVE_LOADING_SPINNER,
  SET_LOADING_SPINNER,
} from "./const";
import { loader } from "./tools";

function* load(action: LoadAction) {
  yield put({ type: SET_LOADING_SPINNER });
  yield loader(`/some_api`, {}, APP_FETCH_JSON_SUCCESS, APP_FETCH_JSON_FAIL);
  //TODO: Demo sleep
  yield call(sleep, 1000);
  yield put({ type: REMOVE_LOADING_SPINNER });
}

async function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("wake up!");
    }, ms);
  });
}
export default function* sagas() {
  yield takeLatest(APP_FETCH_JSON, load);
}
