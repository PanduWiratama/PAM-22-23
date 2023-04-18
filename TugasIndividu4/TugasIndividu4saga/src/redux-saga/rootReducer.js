import { combineReducers } from "redux";
import ipDataReducer from "./ipData/reducer";

const rootReducer = combineReducers({
  data: ipDataReducer,
});

export default rootReducer;
