import React from "react";

import { CardContent, Typography } from "@material-ui/core";

const GameCardContent = ({ game }) => {
  const { genre, platform, release } = game;

  return (
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        Genre: {genre}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Platform: {platform}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Release year: {release}
      </Typography>
    </CardContent>
  );
};

export default GameCardContent;
