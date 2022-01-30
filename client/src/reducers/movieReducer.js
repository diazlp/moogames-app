import {
  CREATE_MOVIE,
  DELETE_MOVIE,
  FETCH_MOVIE,
  EDIT_MOVIE,
} from "../actions/types";

const movieReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return action.payload;
    case CREATE_MOVIE:
      return state;
    case EDIT_MOVIE:
      return state.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    case DELETE_MOVIE:
      return state.filter((e) => e.id !== action.payload.id);
    default:
      return state;
  }
};

export default movieReducer;
