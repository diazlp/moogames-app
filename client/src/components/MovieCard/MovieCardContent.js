import React from "react";

import { CardContent, Typography } from "@material-ui/core";

const GameCardContent = ({ movie }) => {
  const { genre, rating, year } = movie;

  return (
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        Genre: {genre}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Rating: {rating} / 10
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Release year: {year}
      </Typography>
    </CardContent>
  );
};

export default GameCardContent;
