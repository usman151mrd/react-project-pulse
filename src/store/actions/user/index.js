import * as ActionList from "../actionsList";
import API from "../../../api";
import jwtdecode from "jwt-decode";
import { ERROR, SUCCESS } from "../message";
import { GET_ALL_PROJECT, GET_DEFAULT_PROJECT, PROJECTS } from "../project";

export const IS_LOGGED_IN = () => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = () => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.TOKEN,
  payload,
});

export const USER = (data, callback) => {
  return async (dispatch) => {
    await window.localStorage.setItem("Token", escape(data.access));
    API.defaults.headers.common["Authorization"] = "Bearer " + data.access;
    let token = jwtdecode(escape(data.access));
    dispatch(TOKEN(token));
    dispatch(IS_LOGGED_IN());
    dispatch(GET_DEFAULT_PROJECT());
    dispatch(GET_ALL_PROJECT(() => {}));
    callback();
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("Token");
    if (token !== null) {
      API.defaults.headers.common["Authorization"] = "Bearer " + token;
      dispatch(TOKEN(jwtdecode(token)));
      dispatch(GET_DEFAULT_PROJECT());
      dispatch(IS_LOGGED_IN());
      dispatch(GET_ALL_PROJECT(() => {}));
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("Token");
    dispatch(PROJECTS([]));
    dispatch(IS_LOGGED_OUT());
  };
};

export const LOGIN = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/token/", data)
      .then((response) => {
        dispatch(USER(response.data, callback));
      })
      .catch((error) => {
        console.log(error.response);
        let content;
        if (error.response) {
          content = error.response.data.detail;
        } else if (error.request) {
          content = "Something went wrong. Try again";
        } else {
          content = error.message;
        }
        dispatch(ERROR(content));
        errorCb();
      });
  };
};

export const SIGNUP = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/auth/register", data)
      .then((response) => {
        dispatch(SUCCESS("User Registered Successfully!"));
        callback();
        dispatch(USER(response.data, true));
      })
      .catch((error) => {
        console.log(error.response);
        let content;
        if (error.response) {
          content = error.response.data.error;
        } else if (error.request) {
          content = "Something went wrong. Try again";
        } else {
          content = error.message;
        }
        dispatch(ERROR(content));
        errorCb();
      });
  };
};

export const FORGET_PASSWORD = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/auth/new-password/", data)
      .then((response) => {
        dispatch(SUCCESS(response.data.message));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let content;
        if (error.response) {
          content = error.response.data.error;
        } else if (error.request) {
          content = "Something went wrong. Try again";
        } else {
          content = error.message;
        }
        dispatch(ERROR(content));
        errorCb();
      });
  };
};
