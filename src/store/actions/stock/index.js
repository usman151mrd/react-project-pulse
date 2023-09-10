import api from "../../../api";
import * as ActionList from "../actionsList";
import { ERROR } from "../message";

export const SET_STOCK = (payload) => ({
  type: ActionList.STOCK,
  payload,
});

export const GET_SELECTED_STOCKS = (data, callback) => {
  return async (dispatch) => {
    await api
      .get(`/stock/list/${data}/`)
      .then((response) => {
        callback(response.data.result);
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
