import { Action } from "redux";
import { DB_FETCH_JSON } from "./const";

export interface LoadAction extends Action {
  payload: Record<string, never>;
}
export type loadFunc = () => LoadAction;
export const load: loadFunc = () => ({
  type: DB_FETCH_JSON,
  payload: {},
});
