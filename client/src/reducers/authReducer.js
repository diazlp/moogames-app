import {
  REGISTER_USER,
  USER_LOGIN,
  USER_LOGOUT,
  PASSWORD_CHANGE,
} from "../actions/types";

const authReducer = (state = [], action) => {
  switch (action.type) {
    case REGISTER_USER:
      return state;
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return (action.payload = []);
    case PASSWORD_CHANGE:
      return state;
    default:
      return state;
  }
};

export default authReducer;
