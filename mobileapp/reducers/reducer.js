import { combineReducers } from "redux";
import appReducer from "./app/appReducer";
import uiReducer from "./app/uiReducer";

const reducer = combineReducers({
  appReducer: appReducer,
  uiReducer: uiReducer
});

export default reducer;
