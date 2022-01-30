import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditOffIcon from "@mui/icons-material/EditOff";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { deleteMovie, editMovie } from "../../actions/movieAction";
import FilterBar from "../../components/ui/FilterBar";
import SearchBar from "../../components/ui/SearchBar";

const MovieTable = ({ auth, section, movie, deleteMovie, editMovie }) => {
  // const { auth, section, movie, deleteMovie, editMovie } = props;
  const navigate = useNavigate();
  const { token } = auth;
  const isLoggedIn = token ? true : false;

  const [currentRow, setCurrentRow] = useState();

  useEffect(() => {
    setCurrentRow(movie);
  }, [movie]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      {
        field: "title",
        headerName: "Title",
        width: 150,
        editable: true,
        renderCell: ({ row: { id, title, image_url } }) => (
          <div
            key={id}
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              src={image_url.includes("http") ? image_url : "/defaultImage.png"}
              alt={image_url}
              width={40}
              height={40}
              style={{ borderRadius: "20px", marginRight: "5px" }}
            />
            <strong>{title}</strong>
          </div>
        ),
      },
      {
        field: "genre",
        headerName: "Genre",
        width: 150,
        editable: true,
      },
      {
        field: "year",
        headerName: "Year",
        type: "number",
        width: 100,
        editable: true,
        renderCell: ({ row: { id, year } }) => <div key={id}>{year}</div>,
      },
      {
        field: "duration",
        headerName: "Duration",
        type: "number",
        width: 90,
        editable: true,
        renderCell: ({ row: { id, duration } }) => (
          <div key={id}>{duration}m</div>
        ),
      },
      {
        field: "rating",
        headerName: "Rating",
        type: "number",
        width: 140,
        editable: true,
        renderCell: ({ row: { id, rating } }) => (
          <Rating
            key={id}
            name="half-rating"
            value={rating >= 0 && rating <= 5 ? Number(rating) : 0}
            precision={0.5}
            readOnly
          />
        ),
      },
      {
        field: "description",
        headerName: "Description",
        width: 300,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              isLoggedIn ? (
                <ModeEditIcon style={{ color: "#108810" }} />
              ) : (
                <EditOffIcon />
              )
            }
            label="edit"
            onClick={() => editMovie(params.row, params.id)}
            disabled={!isLoggedIn}
          />,
          <GridActionsCellItem
            icon={
              isLoggedIn ? (
                <DeleteIcon style={{ color: "#FF1212" }} />
              ) : (
                <DeleteIcon />
              )
            }
            label="delete"
            onClick={() => deleteMovie(params.id)}
            disabled={!isLoggedIn}
          />,
          <GridActionsCellItem
            icon={
              isLoggedIn ? <FileOpenIcon style={{ color: "#FF8C00" }} /> : <></>
            }
            label="fullEdit"
            onClick={() => navigate(`/edit/${section}/${params.id}`)}
            disabled={!isLoggedIn}
          />,
        ],
      },
    ],
    [editMovie, navigate, section, isLoggedIn, deleteMovie]
  );

  const onChangeHandler = (input) => {
    if (!input || input.length <= 1) {
      setCurrentRow(movie);
    } else {
      setCurrentRow(
        movie.filter((e) => e.title.toLowerCase().includes(input.toLowerCase()))
      );
    }
  };

  const onFirstFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(movie);
    } else {
      setCurrentRow(movie.filter((e) => e.rating.includes(textContent)));
    }
  };
  const onSecondFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(movie);
    } else {
      setCurrentRow(movie.filter((e) => e.genre.includes(textContent)));
    }
  };
  const onThirdFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(movie);
    } else {
      setCurrentRow(movie.filter((e) => e.release.includes(textContent)));
    }
  };

  return (
    <Box
      style={{
        margin: "5vh 10vh",
        textAlign: "center",
        boxShadow: "3px 3px 6px 3px rgba(0,0,0,0.31)",
        backgroundColor: "#FFF",
      }}
    >
      <Typography variant="h3" style={{ padding: "3vh 0" }}>
        <strong>Movie Table List</strong>
      </Typography>
      <Grid
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3vh",
        }}
      >
        <Grid item>
          <SearchBar onChange={onChangeHandler} />
        </Grid>
        <Grid item>
          <FilterBar
            label={section}
            itemData={movie}
            onFirstFilter={onFirstFilter}
            onSecondFilter={onSecondFilter}
            onThirdFilter={onThirdFilter}
          />
        </Grid>
      </Grid>
      <div style={{ height: 400 }}>
        <DataGrid
          rows={currentRow}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          style={{ margin: "0", paddingBottom: "2vh", border: "none" }}
          zeroMinWidth
        />
      </div>
    </Box>
  );
};

const mapStateToProps = ({ auth, movie }) => ({ auth, movie });

const mapDispatchToProps = {
  deleteMovie,
  editMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
