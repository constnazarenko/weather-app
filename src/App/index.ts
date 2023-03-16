import { connect } from "react-redux";
import ReduxStore from "../store";
import { load } from "./actions";
import App from "./component";
const mapStateToProps = (state: ReduxStore) => {
  return { loading: state.App.loading, title: state.App.title };
};

export default connect(mapStateToProps, { load })(App);
export * from "./component";
