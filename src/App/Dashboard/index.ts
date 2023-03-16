import { connect } from "react-redux";
import ReduxStore from "../../store";
import { load } from "./actions";
import DB from "./component";
const mapStateToProps = (state: ReduxStore) => {
  return { cities: state.DB.cities };
};

export default connect(mapStateToProps, { load })(DB);
export * from "./component";
