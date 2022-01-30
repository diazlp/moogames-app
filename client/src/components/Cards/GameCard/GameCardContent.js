import React from "react";

import { CardContent, Typography, Button } from "@material-ui/core";

const GameCardContent = ({ game }) => {
  const { genre, platform, release } = game;

  const processedPlatform = platform
    ?.replace(" ", "")
    .replace(".", ",")
    .split(",");

  const randomColorGenerator = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  const renderPlatform = () => {
    return processedPlatform?.map((platform, i) => {
      return (
        <Button
          disabled
          style={{
            backgroundColor: randomColorGenerator(),
            color: "#FFF",
            padding: 0.2,
          }}
          key={i}
        >
          {platform}
        </Button>
      );
    });
  };

  return (
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        Genre: {genre}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Platform: <b>{renderPlatform()}</b>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Release year: {release}
      </Typography>
    </CardContent>
  );
};

export default GameCardContent;
