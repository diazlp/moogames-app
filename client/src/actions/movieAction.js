import axios from "axios";
import { CREATE_MOVIE, DELETE_MOVIE, EDIT_MOVIE, FETCH_MOVIE } from "./types";

export const fetchMovie = () => async (dispatch) => {
  const res = await axios.get("/api/movie");

  dispatch({
    type: FETCH_MOVIE,
    payload: res.data,
  });
};

export const createMovie = (movieData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  await axios.post("/api/create/movie", movieData, {
    params: {
      token,
    },
  });

  dispatch({
    type: CREATE_MOVIE,
  });
};

export const editMovie = (movieData, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const res = await axios.put("/api/edit/movie", movieData, {
    params: {
      id,
      token,
    },
  });

  dispatch({
    type: EDIT_MOVIE,
    payload: res.data,
  });
};

export const deleteMovie = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const { movie } = getState();

  const selectedMovie = movie.filter((e) => e.id === Number(id))[0];

  await axios.post("/api/delete/movie", {
    params: {
      id,
      token,
    },
  });

  dispatch({
    type: DELETE_MOVIE,
    payload: selectedMovie,
  });
};
