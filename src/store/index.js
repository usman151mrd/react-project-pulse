import { createStore, applyMiddleware, compose } from "redux";
import MainReducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const MainStore = createStore(
  MainReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default MainStore;
