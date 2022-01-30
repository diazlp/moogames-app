import axios from "axios";
import { CREATE_GAME, EDIT_GAME, DELETE_GAME, FETCH_GAME } from "./types";

export const fetchGame = () => async (dispatch) => {
  const res = await axios.get("/api/game");

  dispatch({
    type: FETCH_GAME,
    payload: res.data,
  });
};

export const createGame = (gameData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  await axios.post("/api/create/game", gameData, {
    params: {
      token,
    },
  });

  dispatch({
    type: CREATE_GAME,
  });
};

export const editGame = (gameData, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const res = await axios.put("/api/edit/game", gameData, {
    params: {
      id,
      token,
    },
  });

  dispatch({
    type: EDIT_GAME,
    payload: res.data,
  });
};

export const deleteGame = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const { game } = getState();

  const selectedGame = game.filter((e) => e.id === Number(id))[0];

  await axios.post("/api/delete/game", {
    params: {
      id,
      token,
    },
  });

  dispatch({
    type: DELETE_GAME,
    payload: selectedGame,
  });
};
