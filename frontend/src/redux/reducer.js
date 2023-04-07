import * as types from "./actionType";

const initialState = {
  students: [],
  student: {},
  msg: "",
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case types.ADD_STUDENT:
      return {
        ...state,
        msg: action.payload,
      };
    case types.DELETE_STUDENT:
      return {
        ...state,
        msg: action.payload,
      };
    case types.GET_ONE_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
    case types.UPDATE_STUDENT:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
