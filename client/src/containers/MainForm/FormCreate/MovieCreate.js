import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, TextField, Box, Button } from "@material-ui/core";
import { createMovie, editMovie } from "../../../actions/movieAction";

const MovieForm = ({ createMovie, editMovie, movie }) => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    if (itemId) {
      const filteredMovie = movie.filter((e) => e.id === Number(itemId))[0];
      setItemData(filteredMovie);
    }
  }, [movie, itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (itemId) {
      editMovie(
        {
          title: data.get("title"),
          genre: data.get("genre"),
          year: data.get("year"),
          duration: data.get("duration"),
          rating: data.get("rating"),
          review: data.get("review"),
          description: data.get("description"),
          image_url: data.get("image_url"),
        },
        itemId
      ).then(() => navigate("/"));
    } else {
      createMovie({
        title: data.get("title"),
        genre: data.get("genre"),
        year: data.get("year"),
        duration: data.get("duration"),
        rating: data.get("rating"),
        review: data.get("review"),
        description: data.get("description"),
        image_url: data.get("image_url"),
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
        <strong>Form {itemId ? "Edit" : "Create"} Movie</strong>
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
            id="title"
            name="title"
            label="Title"
            helperText="Input title"
            fullWidth
            value={itemData ? itemData.title : ""}
            onChange={(e) => setItemData({ title: e.currentTarget.value })}
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
          <Grid item sm={7}>
            <TextField
              required
              type="number"
              id="year"
              name="year"
              label="Release Year"
              helperText="Input release year"
              value={itemData ? itemData.year : ""}
              onChange={(e) => setItemData({ year: e.currentTarget.value })}
              variant="outlined"
            />
            <TextField
              required
              type="number"
              id="duration"
              name="duration"
              label="Duration (min)"
              helperText="Input duration"
              value={itemData ? itemData.duration : ""}
              onChange={(e) => setItemData({ duration: e.currentTarget.value })}
              variant="outlined"
            />
            <TextField
              required
              type="number"
              id="rating"
              name="rating"
              label="Rating"
              helperText="Input rating"
              value={itemData ? itemData.rating : ""}
              onChange={(e) => setItemData({ rating: e.currentTarget.value })}
              variant="outlined"
            />
          </Grid>
          <TextField
            required
            multiline
            id="review"
            name="review"
            label="Review"
            fullWidth
            helperText="Input movie review"
            rows={2}
            value={itemData ? itemData.review : ""}
            onChange={(e) => setItemData({ review: e.currentTarget.value })}
            variant="outlined"
          />
          <TextField
            required
            multiline
            id="description"
            name="description"
            label="Description"
            fullWidth
            helperText="Input description"
            rows={3}
            value={itemData ? itemData.description : ""}
            onChange={(e) =>
              setItemData({ description: e.currentTarget.value })
            }
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
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  createMovie,
  editMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
