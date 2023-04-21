import { connect } from "react-redux";
import ReduxStore from "../store";
import App from "./component";
const mapStateToProps = (state: ReduxStore) => {
  return { loading: state.App.loading, title: state.App.title };
};

export default connect(mapStateToProps, {})(App);
export * from "./component";
export { ThemeToggle } from "./ThemeToggle";
