import { AppProps } from "./App";
import { DBProps } from "./App/Dashboard";

export default interface ReduxStore {
  App: AppProps;
  DB: DBProps;
}
