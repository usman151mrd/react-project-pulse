import * as ActionList from "../../actions/actionsList";
const initialState = {
  selected_stock: [],
  stock: [],
};
const project = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.STOCK:
      return { ...state, selected_stock: payload };
    default:
      return state;
  }
};
export default project;
