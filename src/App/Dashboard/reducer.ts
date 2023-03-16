import produce from "immer";
import { AnyAction } from "redux";
import { DBProps } from "./component";
import { DB_FETCH_JSON_FAIL, DB_FETCH_JSON_SUCCESS } from "./const";

const defaultApp: DBProps = {
  cities: [],
};

const reducer = (state: DBProps = defaultApp, action: AnyAction) => {
  switch (action.type) {
    case DB_FETCH_JSON_SUCCESS:
      return produce(state, (draft) => {
        draft.cities = action.payload;
      });

    case DB_FETCH_JSON_FAIL:
      //TODO: here should be triggered error handling
      return state;

    default:
      return state;
  }
};
export default reducer;
