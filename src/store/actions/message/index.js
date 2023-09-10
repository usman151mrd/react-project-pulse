import * as ActionList from "../actionsList";

export const SUCCESS = (payload) => ({
  type: ActionList.MESSAGE_SUCCESS,
  payload,
});
export const ERROR = (payload) => ({
  type: ActionList.MESSAGE_ERROR,
  payload,
});
export const WARRING = (payload) => ({
  type: ActionList.MESSAGE_WARNING,
  payload,
});
export const INFO = (payload) => ({
  type: ActionList.MESSAGE_INFO,
  payload,
});
export const NO_MESSAGE = (payload) => ({
  type: ActionList.MESSAGE_NULL,
  payload,
});
