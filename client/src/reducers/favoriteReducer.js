import { USER_FAVORITE } from "../actions/types";
const INITIAL_STATE = [];

const favoriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FAVORITE:
      const [currentUser, newFavorites, prevUser] = action.payload;

      /* check whether USER has existed on state */
      let isUserExisted = prevUser.find((e) => e.userId === currentUser); // returns an object OR undefined

      /* if user DO exist, ONLY DO TOGGLE FAVORITE */
      let toggleFavorite = state.map(
        (prevState) =>
          prevState.userId === currentUser // if prevState has current user, toggle favorite
            ? {
                ...prevState,
                favorites: prevState.favorites.find(
                  (e) => e.id === newFavorites.id
                )
                  ? [
                      ...prevState.favorites.filter(
                        (favorite) => favorite.id !== newFavorites.id // deleting favorite from redux store
                      ),
                    ]
                  : [...prevState.favorites, newFavorites], // adding favorite to redux store
              }
            : prevState // ELSE, returns previous state
      );

      /* returns the favorite data based on relevant condition */
      let favoriteItem = isUserExisted
        ? toggleFavorite
        : [...state, { userId: currentUser, favorites: [newFavorites] }]; // adding new user to the data

      return favoriteItem;
    default:
      return state;
  }
};

export default favoriteReducer;
