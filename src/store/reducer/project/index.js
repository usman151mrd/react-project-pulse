import * as ActionList from "../../actions/actionsList";
const initialState = {
  allProject: [],
  default: null,
  project_details: null,
};
const project = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.ADD_PROJECT:
      return { ...state, allProject: [...state.allProject, payload] };
    case ActionList.ALL_PROJECT:
      return { ...state, allProject: payload };
    case ActionList.DEFAULT:
      return { ...state, default: payload };
    case ActionList.PROJECT_DATA:
      return { ...state, project_details: payload };
    default:
      return state;
  }
};
export default project;
