import { combineReducers } from "redux";
import theme from "./theme";
import profile from "./profile";
import UserData from "./userdata";

const rootReducer = combineReducers({
  theme,
  profile,
  UserData,
});

export default rootReducer;
