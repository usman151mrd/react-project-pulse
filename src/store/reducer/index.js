import { combineReducers } from "redux";
import message from "./message";
import project from "./project";
import user from "./user";
import stock from "./stock";

export default combineReducers({
  User: user,
  Message: message,
  Project: project,
  Stock: stock,
});
