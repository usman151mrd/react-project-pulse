import * as ActionList from "../actionsList";
import API from "../../../api";
import { ERROR, INFO } from "../message";

export const ADD_PROJECT = (payload) => ({
  type: ActionList.ADD_PROJECT,
  payload,
});

export const PROJECTS = (payload) => ({
  type: ActionList.ALL_PROJECT,
  payload,
});

export const DEFAULT_STATUS = (payload) => ({
  type: ActionList.DEFAULT,
  payload,
});

export const GET_DEFAULT_PROJECT = () => {
  return async (dispatch) => {
    let config = await localStorage.getItem("configuration");
    if (config) {
      dispatch(DEFAULT_STATUS(JSON.parse(config)));
    }
  };
};

export const SET_DEFAULT_PROJECT = (project) => {
  return async (dispatch) => {
    await localStorage.setItem("configuration", JSON.stringify(project));
    dispatch(DEFAULT_STATUS(project));
  };
};

export const NEW_PROJECT = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.post("/project/", data)
      .then((response) => {
        console.log(response.data)
        callback();
        dispatch(ADD_PROJECT(response.data.result));
      })
      .catch((error) => {
        console.log(error.response);
        let content;
        if (error.response) {
          content = "Correct Keyword " + error.response?.data?.details.correct;
        } else if (error.request) {
          content = "Something went wrong. Try again";
        } else {
          content = error.message;
        }
        dispatch(ERROR(content));
        dispatch(
          INFO(
            "Candidate Words " + error.response.data.details ||
              error.response.data.details.candidate.toString()
          )
        );
        errorCb();
      });
  };
};

export const DELETE_PROJECT = (id, callback, errorCb) => {
  return async (dispatch) => {
    await API.delete(`/project/${id}/`)
      .then((response) => {
        callback();
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

export const GET_ALL_PROJECT = (callback) => {
  return async (dispatch) => {
    await API.get("/project/list/")
      .then((response) => {
        dispatch(PROJECTS(response.data.result));
        callback();
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
        callback();
      });
  };
};

export const PROJECT_DETAILS = (payload) => ({
  type: ActionList.PROJECT_DATA,
  payload,
});

export const GET_PROJECT_DETAILS_BY_ID = (id, callback) => {
  return async (dispatch) => {
    await API.get(`/home/${id}/`)
      .then((response) => {
        dispatch(PROJECT_DETAILS(response.data));
        callback(response.data);
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
        callback();
      });
  };
};
export const SET_DEFAULT_PROJECT_BY_ID = (row, callback) => {
  return async (dispatch) => {
    console.log(row)
    await API.put(`/project/${row.id}/`)
      .then((response) => {
        dispatch(SET_DEFAULT_PROJECT(row));
        callback();
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
        callback();
      });
  };
};
