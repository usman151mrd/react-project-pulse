import * as ActionList from "../../actions/actionsList";
const initialState = {
  msg: null,
};
const message = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.MESSAGE_SUCCESS:
      return { ...state, msg: { title: payload, status: "success" } };
    case ActionList.MESSAGE_ERROR:
      return { ...state, msg: { title: payload, status: "error" } };
    case ActionList.MESSAGE_WARNING:
      return { ...state, msg: { title: payload, status: "warning" } };
    case ActionList.MESSAGE_INFO:
      return { ...state, msg: { title: payload, status: "info" } };
    case ActionList.MESSAGE_NULL:
      return { ...state, msg: null };

    default:
      return state;
  }
};
export default message;
