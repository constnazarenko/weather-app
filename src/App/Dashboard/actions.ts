import { Action } from "redux";
import { DB_FETCH_JSON } from "./const";

export interface LoadDBAction extends Action {
  payload: Record<string, string>;
}
export type loadDBFunc = (cityName?: string) => LoadDBAction;
export const loadDB: loadDBFunc = (cityName) => ({
  type: DB_FETCH_JSON,
  payload: { cityName },
});
