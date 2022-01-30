import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovie } from "../../../actions/movieAction";
import { toggleFavorite } from "../../../actions/favoriteAction";
import MovieCardHeader from "./MovieCardHeader";
import MovieCardContent from "./MovieCardContent";

import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const useStyle = makeStyles(() => ({
  card: {
    cursor: "pointer",
  },
  cardMedia: {
    height: 200,
  },
}));

const Dashboard = (props) => {
  const classes = useStyle();
  const { auth, movie, favorite, fetchMovie, toggleFavorite, myFavorite } =
    props;

  const userFavorites = favorite.find((el) => el.userId === auth.user?.id);

  const handleFavorite = (e) => {
    let selectedFavorite = movie.find(
      (el) => el.id === Number(e.currentTarget.value)
    );

    toggleFavorite(selectedFavorite);
  };

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const renderCard = (switchCard) => {
    return switchCard.map((movie) => {
      return (
        <Grid item xs={3} md={4} key={movie.id}>
          <Card
            className={classes.card}
            style={{ boxShadow: "3px 3px 6px 3px rgba(0,0,0,0.31)" }}
          >
            <MovieCardHeader movie={movie} />
            <Link to={`/movie/${movie.id}`}>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={
                  movie.image_url.includes("http")
                    ? movie.image_url
                    : "/defaultImage.png"
                }
                alt={movie.name}
              />
            </Link>
            <MovieCardContent movie={movie} />
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={auth.token ? handleFavorite : null}
                value={movie.id}
                disabled={!auth.token ? true : false}
              >
                {userFavorites?.favorites?.find((e) => e.id === movie.id) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : !auth.token ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Link to={`/movie/${movie.id}`} style={{ color: "blue" }}>
                <MoreHorizIcon />
              </Link>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  if (!movie) return <CircularProgress />;

  return (
    <Grid container spacing={6}>
      {myFavorite ? renderCard(myFavorite) : renderCard(movie)}
    </Grid>
  );
};

const mapStateToProps = ({ auth, favorite, movie }) => ({
  auth,
  favorite,
  movie,
});

const mapDispatchToProps = {
  fetchMovie,
  toggleFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
