import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovie } from "../../actions/movieAction";
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
  const { movie, fetchMovie } = props;

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const renderCard = () => {
    return movie.map((movie) => {
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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
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
      {renderCard()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  fetchMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
