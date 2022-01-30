import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import movieReducer from "./movieReducer";
import favoriteReducer from "./favoriteReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  movie: movieReducer,
  favorite: favoriteReducer,
});
