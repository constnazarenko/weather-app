import { Action } from "redux";
import { APP_FETCH_JSON } from "./const";

export interface LoadAction extends Action {
  payload: Record<string, never>;
}
export type loadAppFunc = (formJSON?: string) => LoadAction;
export const load: loadAppFunc = () => ({
  type: APP_FETCH_JSON,
  payload: {},
});
