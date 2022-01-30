import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentContext from "../context/CommentContext";
import Comments from "./input/Comments";
import CommentList from "./input/CommentList";
import { MOVIE_API_URL } from "../config";

import {
  LinearProgress,
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles(() => ({
  movieImage: {
    maxWidth: 500,
    maxHeight: 500,
  },
}));

const MovieDetail = () => {
  const { showComments, setItemId } = useContext(CommentContext);

  const classes = useStyles();

  const [selectedMovie, setSelectedMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchMoviePage = async () => {
      const res = await axios.get(`${MOVIE_API_URL}/${id}`);

      if (res.status >= 200 && res.status < 300) setSelectedMovie(res.data);
    };
    fetchMoviePage();
    setItemId(id);
  }, [id, setItemId]);

  if (!selectedMovie) return <LinearProgress />;

  const { genre, image_url, rating, title, duration, year, description } =
    selectedMovie;

  return (
    <Container p={10}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0 40px 0" }}
      >
        <strong>Movie Detail #{id}</strong>
      </Typography>
      <Paper elevation={12} style={{ marginTop: "5vh" }}>
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignContent="center"
        >
          <Grid
            item
            style={{
              display: "flex",
              alignItems: "center",
              width: "auto",
            }}
          >
            <Box
              sx={{
                width: 500,
                background: "#FFB74D",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "5px 5px 8px #5a5a5a, -5px -5px 0px #ffffff",
              }}
              mt={2}
              p={3}
              align="center"
            >
              <img
                src={
                  image_url.includes("http") ? image_url : "/defaultImage.png"
                }
                alt={title}
                className={classes.movieImage}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                width: 500,
                bgcolor: "#FFB74D",
                alignContent: "center",
                borderRadius: "20px",
                boxShadow: "5px 5px 8px #5a5a5a, -5px -5px 0px #ffffff",
              }}
              mt={2}
              p={3}
            >
              <Typography variant="h5" align="center" color="textPrimary">
                <strong>
                  {title} ({year})
                </strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center">
                {genre}
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">
                  Release Year: <b>{year}</b>
                </Typography>
                <Typography variant="body1">
                  Rating:{" "}
                  <Rating
                    defaultValue={Number(rating)}
                    readOnly
                    size="small"
                    precision={0.5}
                    style={{ color: "yellow" }}
                  />
                </Typography>
                <Typography variant="body1">
                  Duration: <b>{duration} menit</b>
                </Typography>
                <Typography
                  variant="body1"
                  style={{ textAlign: "center", marginTop: "5px" }}
                >
                  "{description}"
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 500,
                textAlign: "center",
                background: "#e8e8e8",
                borderRadius: "20px",
                boxShadow:
                  "inset 5px 5px 10px #c3c4c4, inset -5px -5px 10px #fff",
              }}
              mt={4}
              p={3}
            >
              <Comments />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box>{showComments && <CommentList itemId={id} />}</Box>
    </Container>
  );
};

export default MovieDetail;
