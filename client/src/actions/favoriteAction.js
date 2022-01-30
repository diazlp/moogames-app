import { USER_FAVORITE } from "./types";

export const toggleFavorite = (itemData) => async (dispatch, getState) => {
  const {
    user: { id: userId },
  } = getState().auth;

  const prevUser = getState().favorite.map((e) => e);

  dispatch({
    type: USER_FAVORITE,
    payload: [userId, itemData, prevUser],
  });
};
