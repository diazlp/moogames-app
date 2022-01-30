import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGame } from "../../actions/gameAction";
import GameCardHeader from "./GameCardHeader";
import GameCardContent from "./GameCardContent";

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

const GameCard = (props) => {
  const classes = useStyle();
  const { game, fetchGame } = props;

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  const renderCard = () => {
    return game.map((itemGame) => {
      return (
        <Grid item xs={3} md={4} key={itemGame.id}>
          <Card
            className={classes.card}
            style={{ boxShadow: "3px 3px 6px 3px rgba(0,0,0,0.31)" }}
          >
            <GameCardHeader game={itemGame} />
            <Link to={`/game/${itemGame.id}`}>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={
                  itemGame.image_url.includes("http")
                    ? itemGame.image_url
                    : "/defaultImage.png"
                }
                alt={itemGame.name}
              />
            </Link>
            <GameCardContent game={itemGame} />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Link to={`/game/${itemGame.id}`} style={{ color: "blue" }}>
                <MoreHorizIcon />
              </Link>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  if (!game) return <CircularProgress />;

  return (
    <Grid container spacing={6}>
      {renderCard()}
    </Grid>
  );
};

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = {
  fetchGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
