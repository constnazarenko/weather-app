import produce from "immer";
import { AnyAction } from "redux";
import { AppProps } from "./component";
import {
  APP_FETCH_JSON_FAIL,
  APP_FETCH_JSON_SUCCESS,
  REMOVE_LOADING_SPINNER,
  SET_LOADING_SPINNER,
} from "./const";

const defaultApp = {
  title: "Initial title",
  loading: true,
};

const reducer = (state: AppProps = defaultApp, action: AnyAction) => {
  switch (action.type) {
    case APP_FETCH_JSON_SUCCESS:
      return produce(state, (draft) => {
        draft.title = action.app.title;
      });

    case APP_FETCH_JSON_FAIL:
      return produce(state, (draft) => {
        draft.title = "API is down.";
      });

    case SET_LOADING_SPINNER:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case REMOVE_LOADING_SPINNER:
      return produce(state, (draft) => {
        draft.loading = false;
      });

    default:
      return state;
  }
};
export default reducer;
