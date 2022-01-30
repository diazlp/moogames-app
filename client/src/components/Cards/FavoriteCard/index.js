import React from "react";
import { connect } from "react-redux";

import GameCard from "../GameCard";
import MovieCard from "../MovieCard";

const FavoriteCard = ({ auth, favorite, game, movie }) => {
  const userFavorites = favorite.find(
    (el) => el.userId === auth.user?.id
  )?.favorites;

  const favoritedGame = userFavorites?.filter(
    (e) => e.id < 50000 && e !== game.map((el) => el.id)
  );

  const favoritedMovie = userFavorites?.filter(
    (e) => e.id > 50000 && e !== movie.map((el) => el.id)
  );

  const renderFavoriteCard = () => {
    return (
      <>
        <GameCard myFavorite={favoritedGame} />
        <MovieCard myFavorite={favoritedMovie} />
      </>
    );
  };

  return (
    <>
      {favoritedGame || favoritedMovie ? (
        renderFavoriteCard()
      ) : (
        <div>No Favorite Item</div>
      )}
    </>
  );
};

const mapStateToProps = ({ auth, favorite, game, movie }) => ({
  auth,
  favorite,
  game,
  movie,
});

export default connect(mapStateToProps)(FavoriteCard);
