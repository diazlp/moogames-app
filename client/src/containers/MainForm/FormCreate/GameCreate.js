import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { createGame, editGame } from "../../../actions/gameAction";

const GameForm = ({ createGame, editGame, game }) => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const { itemId } = useParams();

  const singleRef = useRef();
  const multiRef = useRef();

  const [checked, setChecked] = useState({
    singlePlayer: true,
    multiplayer: false,
  });

  useEffect(() => {
    if (itemId) {
      const filteredGame = game.filter((e) => e.id === Number(itemId))[0];
      setItemData(filteredGame);
    }
  }, [game, itemId]);

  const { singlePlayer, multiplayer } = checked;

  const handleCheckedChange = (e) => {
    if (itemData) {
      setItemData({ ...itemData, [e.target.name]: e.target.checked });
    }

    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (itemId) {
      editGame(
        {
          name: data.get("name"),
          platform: data.get("platform"),
          genre: data.get("genre"),
          release: data.get("release"),
          image_url: data.get("image_url"),
          singlePlayer: singleRef.current.checked,
          multiplayer: multiRef.current.checked,
        },
        itemId
      ).then(() => navigate("/"));
    } else {
      createGame({
        name: data.get("name"),
        platform: data.get("platform"),
        genre: data.get("genre"),
        release: data.get("release"),
        image_url: data.get("image_url"),
        singlePlayer: singleRef.current.checked,
        multiplayer: multiRef.current.checked,
      }).then(() => navigate("/"));
    }
  };

  if (itemId && !itemData) return <div></div>;

  return (
    <Box
      component="form"
      style={{
        margin: "1vh 10vh",
        textAlign: "center",
        boxShadow: "3px 3px 6px 3px rgba(0,0,0,0.31)",
        backgroundColor: "#FFF",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3" style={{ paddingTop: 10 }}>
        <strong>Form {!itemId ? "Create" : "Edit"} Game</strong>
      </Typography>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: 10,
          padding: 10,
        }}
      >
        <Grid item xs={10} sm={3}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            helperText="Input name"
            fullWidth
            value={itemData ? itemData.name : ""}
            onChange={(e) => setItemData({ name: e.currentTarget.value })}
            variant="outlined"
          />
          <TextField
            required
            id="platform"
            name="platform"
            label="Platform"
            fullWidth
            helperText="Input platform"
            value={itemData ? itemData.platform : ""}
            onChange={(e) => setItemData({ platform: e.currentTarget.value })}
            variant="outlined"
          />
          <TextField
            required
            id="genre"
            name="genre"
            label="Genre"
            helperText="Input genre"
            fullWidth
            value={itemData ? itemData.genre : ""}
            onChange={(e) => setItemData({ genre: e.currentTarget.value })}
            variant="outlined"
          />
          <TextField
            required
            type="number"
            id="release"
            name="release"
            label="Release year"
            helperText="Input release year"
            inputProps={{ inputprops: { min: 0, max: 10 } }}
            value={itemData ? itemData.release : ""}
            onChange={(e) => setItemData({ release: e.currentTarget.value })}
            variant="outlined"
          />
          <TextField
            required
            multiline
            id="image_url"
            name="image_url"
            label="Image URL"
            fullWidth
            helperText="Input image url"
            rows={2}
            value={itemData ? itemData.image_url : ""}
            onChange={(e) => setItemData({ image_url: e.currentTarget.value })}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="singlePlayer"
                checked={
                  itemData ? Boolean(itemData.singlePlayer) : singlePlayer
                }
                onChange={handleCheckedChange}
                inputRef={singleRef}
              />
            }
            label="Singleplayer"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="multiplayer"
                checked={itemData ? Boolean(itemData.multiplayer) : multiplayer}
                onChange={handleCheckedChange}
                inputRef={multiRef}
              />
            }
            label="Multiplayer"
            name="multiplayer"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{
              backgroundColor: "#1976d2",
              margin: "10px 0",
              color: "white",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

const mapDispatchToProps = {
  createGame,
  editGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameForm);
