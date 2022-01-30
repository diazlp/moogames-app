import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditOffIcon from "@mui/icons-material/EditOff";
import FileOpenIcon from "@mui/icons-material/FileOpen";

import { deleteGame, editGame } from "../../actions/gameAction";
import FilterBar from "../../components/ui/FilterBar";
import SearchBar from "../../components/ui/SearchBar";

const GameTable = ({ auth, section, game, deleteGame, editGame }) => {
  // const { auth, section, game, deleteGame, editGame } = props;
  const navigate = useNavigate();

  const [currentRow, setCurrentRow] = useState();

  const { token } = auth;
  const isLoggedIn = token ? true : false;

  useEffect(() => {
    setCurrentRow(game);
  }, [game]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      {
        field: "name",
        headerName: "Title",
        width: 150,
        editable: true,
        renderCell: ({ row: { id, name, image_url } }) => (
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
            <strong>{name}</strong>
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
        field: "release",
        headerName: "Year",
        type: "number",
        width: 100,
        editable: true,
      },
      {
        field: "platform",
        headerName: "Platform",
        width: 140,
        editable: true,
      },
      {
        field: "singlePlayer",
        headerName: "Singleplayer?",
        type: "boolean",
        width: 130,
        valueGetter: ({ row: { singlePlayer } }) =>
          singlePlayer === 1 ? true : false,
      },
      {
        field: "multiplayer",
        headerName: "Multiplayer?",
        type: "boolean",
        width: 130,
        valueGetter: ({ row: { multiplayer } }) =>
          multiplayer === 1 ? true : false,
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
            onClick={() => editGame(params.row, params.id)}
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
            onClick={() => deleteGame(params.id)}
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
    [deleteGame, editGame, navigate, section, isLoggedIn]
  );

  const onChangeHandler = (input) => {
    if (!input || input.length <= 1) {
      setCurrentRow(game);
    } else {
      setCurrentRow(
        game.filter((e) => e.name.toLowerCase().includes(input.toLowerCase()))
      );
    }
  };

  const onFirstFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(game);
    } else {
      setCurrentRow(game.filter((e) => e.platform.includes(textContent)));
    }
  };
  const onSecondFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(game);
    } else {
      setCurrentRow(game.filter((e) => e.genre.includes(textContent)));
    }
  };
  const onThirdFilter = (textContent) => {
    if (!textContent) {
      setCurrentRow(game);
    } else {
      setCurrentRow(game.filter((e) => e.release.includes(textContent)));
    }
  };

  return (
    <Box
      style={{
        margin: "5vh 20vh",
        textAlign: "center",
        boxShadow: "3px 3px 6px 3px rgba(0,0,0,0.31)",
        backgroundColor: "#FFF",
      }}
    >
      <Typography variant="h3" style={{ padding: "3vh 0" }}>
        <strong>Game Table List</strong>
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
            itemData={game}
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
        />
      </div>
    </Box>
  );
};

const mapStateToProps = ({ auth, game }) => ({ auth, game });

const mapDispatchToProps = {
  deleteGame,
  editGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
