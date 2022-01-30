import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentContext from "../context/CommentContext";
import Comments from "./input/Comments";
import CommentList from "./input/CommentList";
import { GAME_API_URL } from "../config";

import {
  LinearProgress,
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  gameImage: {
    maxWidth: 500,
    maxHeight: 500,
  },
}));

const GameDetail = () => {
  const { showComments, setItemId } = useContext(CommentContext);

  const classes = useStyles();

  const [selectedGame, setSelectedGame] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchGamePage = async () => {
      const res = await axios.get(`${GAME_API_URL}/${id}`);

      if (res.status >= 200 && res.status < 300) setSelectedGame(res.data);
    };
    fetchGamePage();
    setItemId(id);
  }, [id, setItemId]);

  if (!selectedGame) return <LinearProgress />;

  const {
    genre,
    image_url,
    multiplayer,
    name,
    platform,
    release,
    singlePlayer,
  } = selectedGame;

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
    <Container p={10}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0 40px 0" }}
      >
        <strong>Game Detail #{id}</strong>
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
                alt={name}
                className={classes.gameImage}
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
                <strong>{name}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center">
                {genre}
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">
                  Release Year: <b>{release}</b>
                </Typography>
                <Typography variant="body1">
                  Platform: <b>{renderPlatform()}</b>
                </Typography>
                <Typography variant="body1">
                  Multiplayer: <b>{multiplayer === 1 ? "Yes" : "No"}</b>
                </Typography>
                <Typography variant="body1">
                  Singleplayer: <b>{singlePlayer === 1 ? "Yes" : "No"}</b>
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

export default GameDetail;
