import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import GameCard from "./GameCard";
import MovieCard from "./MovieCard";
import FavoriteCard from "./FavoriteCard";

const style = {
  sectionHeader: {
    fontFamily: "'Merriweather', serif",
    marginBottom: 30,
  },
};

const ItemCards = () => {
  const { section } = useParams();

  const renderCard = () => {
    if (section === "game") {
      return <GameCard />;
    } else if (section === "movie") {
      return <MovieCard />;
    } else {
      return <div>Mau kemana bos?!?!?! nyasar yhaaaaa</div>;
    }
  };

  if (section === "favorites") {
    return (
      <div>
        <Box
          component="span"
          sx={{
            display: "block",
            p: 5,
            m: 3,
          }}
        >
          <Grid container style={{ display: "block" }}>
            <Grid item>
              <Typography variant="h3" style={style.sectionHeader}>
                &nbsp;&nbsp;&nbsp;
                {section.charAt(0).toUpperCase() + section.slice(1)} Section
              </Typography>
            </Grid>
            <Grid>
              <FavoriteCard style={{ padding: "100vh" }} disabled />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box
          component="span"
          sx={{
            display: "block",
            p: 5,
            m: 3,
          }}
        >
          <Grid container spacing={6}>
            <Grid item>
              <Typography variant="h3" style={style.sectionHeader}>
                &nbsp;&nbsp;&nbsp;
                {section.charAt(0).toUpperCase() + section.slice(1)} Section
              </Typography>
              <Grid item>{renderCard()}</Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
};

export default ItemCards;
