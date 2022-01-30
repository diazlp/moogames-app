import {
  CREATE_GAME,
  DELETE_GAME,
  EDIT_GAME,
  FETCH_GAME,
} from "../actions/types";

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_GAME:
      return action.payload;
    case CREATE_GAME:
      return state;
    case EDIT_GAME:
      return state.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    case DELETE_GAME:
      return state.filter((e) => e.id !== action.payload.id);
    default:
      return state;
  }
};

export default gameReducer;
