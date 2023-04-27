import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import cars from "./cars";

export default combineReducers({
  alert,
  auth,
  profile,
  cars,
});
