import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import { SpeedDialIcon, SpeedDial } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const actions = [
  {
    icon: <LiveTvIcon style={{ color: "#000" }} />,
    name: "Movie",
    operation: "movie",
  },
  {
    icon: <SportsEsportsIcon style={{ color: "#000" }} />,
    name: "Game",
    operation: "game",
  },
];

const FloatingButton = ({ auth }) => {
  const navigate = useNavigate();

  const handleNavigation = (name) => {
    name === "movie" ? navigate("/create/movie") : navigate("/create/game");
  };

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }} style={style}>
      {auth.token ? (
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleNavigation(action.operation)}
            />
          ))}
        </SpeedDial>
      ) : null}
    </Box>
    // </Box>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(FloatingButton);
