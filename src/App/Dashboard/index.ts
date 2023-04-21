import { connect } from "react-redux";
import ReduxStore from "../../store";
import { loadDB } from "./actions";
import DB from "./component";
const mapStateToProps = (state: ReduxStore) => {
  return { cities: state.DB.cities };
};

export default connect(mapStateToProps, { loadDB })(DB);
export * from "./component";
