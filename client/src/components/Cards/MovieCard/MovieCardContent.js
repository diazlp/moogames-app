import React from "react";

import { CardContent, Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";

const GameCardContent = ({ movie }) => {
  const { genre, rating, year } = movie;

  return (
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        Genre: {genre}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Rating:{" "}
        <Rating defaultValue={rating} precision={0.5} readOnly size="small" />
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Release year: {year}
      </Typography>
    </CardContent>
  );
};

export default GameCardContent;
