import React, { Fragment } from "react";
import GameCard from "./Cards/GameCard";
import MovieCard from "./Cards/MovieCard";

import { Box, Typography } from "@material-ui/core";

/* to test the link */
import axios from "axios";
window.axios = axios;

const style = {
  sectionHeader: {
    fontFamily: "'Merriweather', serif",
    marginBottom: 30,
  },
};

const Homepage = () => {
  return (
    <Fragment>
      <Box
        component="span"
        sx={{
          display: "block",
          p: 5,
          m: 3,
        }}
      >
        <Typography variant="h3" style={style.sectionHeader}>
          &nbsp;&nbsp;&nbsp;Recent Games
        </Typography>
        <GameCard />
      </Box>
      <Box
        component="span"
        sx={{
          display: "block",
          p: 5,
          m: 3,
        }}
      >
        <Typography variant="h3" style={style.sectionHeader}>
          &nbsp;&nbsp;&nbsp;Recent Movies
        </Typography>
        <MovieCard />
      </Box>
    </Fragment>
  );
};

export default Homepage;
