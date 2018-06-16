import { combineReducers } from "redux";
import appReducer from "./app/appReducer";

const reducer = combineReducers({
  appReducer: appReducer
});

export default reducer;
