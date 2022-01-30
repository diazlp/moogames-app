import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import LoginIcon from "@mui/icons-material/Login";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import LiveTvIcon from "@mui/icons-material/LiveTv";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { userLogout } from "../../actions";

const style = {
  margin: "10vh 0",
  top: 20,
  right: "auto",
  bottom: "auto",
  left: 10,
  position: "fixed",
  zIndex: 10,
  opacity: 0.65,
  color: "#000",
  "&:hover": {
    opacity: 1,
  },
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideBar = ({ auth, favorite, userLogout }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const [state, setState] = useState({
    left: false,
  });

  const userFavorites = favorite.find((el) => el.userId === auth.user?.id);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ height: "100%", alignSelf: "center" }}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {auth.token ? (
          [
            { text: "My Favorites", action: () => navigate("/item/favorites") },
            {
              text: "Change Password",
              action: () => navigate("/account/setting"),
            },
            { text: "Logout Account", action: userLogout },
          ].map(({ text, action }, i) => (
            <ListItem button key={i} onClick={action}>
              <ListItemIcon>
                {i === 0 ? (
                  <Badge
                    badgeContent={
                      userFavorites ? userFavorites.favorites.length : 0
                    }
                    color="secondary"
                    showZero
                  >
                    <FavoriteIcon />
                  </Badge>
                ) : i === 1 ? (
                  <SettingsIcon />
                ) : (
                  <LogoutIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))
        ) : (
          <ListItem button onClick={() => navigate("/account/login")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login Account" />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {[
          { text: "Movie List", action: () => navigate("/table/movie") },
          { text: "Game List", action: () => navigate("/table/game") },
        ].map(({ text, action }, i) => (
          <ListItem button key={i} onClick={action}>
            <ListItemIcon>
              {i % 2 === 0 ? <LiveTvIcon /> : <SportsEsportsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor, i) => (
        <Fragment key={i}>
          <Button onClick={toggleDrawer(anchor, true)} style={style}>
            <MenuOpenOutlinedIcon
              sx={{ bgcolor: "#C0C0C0", borderRadius: "15px", fontSize: "6vh" }}
            />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  userLogout,
};

const mapStateToProps = ({ auth, favorite }) => ({ auth, favorite });

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
