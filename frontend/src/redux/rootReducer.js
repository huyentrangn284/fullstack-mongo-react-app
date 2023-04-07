import { combineReducers } from "redux";
import studentReducer from "./reducer";

const rootReducer = combineReducers({
  student: studentReducer,
});

export default rootReducer;
