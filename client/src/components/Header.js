import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";

import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Container,
  Avatar,
  Button,
  makeStyles,
  MenuItem,
} from "@material-ui/core";

import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { userLogout } from "../actions";
import LoginButton from "./ui/LoginButton";

const style = {
  mainHeader: {
    backgroundColor: "#080808",
  },
  headerIcon: {
    verticalAlign: "middle",
    margin: "0px 7px 5px",
  },
};

const pages = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <HomeIcon style={style.headerIcon} />,
  },
  {
    id: 2,
    name: "Movie",
    url: "/item/movie",
    icon: <LiveTvIcon style={style.headerIcon} />,
  },
  {
    id: 3,
    name: "Game",
    url: "/item/game",
    icon: <SportsEsportsIcon style={style.headerIcon} />,
  },
];

const useStyle = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const Header = (props) => {
  const { auth, userLogout } = props;
  const navigate = useNavigate();
  const classes = useStyle();

  const [isLogin, setIsLogin] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  useEffect(() => {
    auth.token ? setIsLogin(true) : setIsLogin(false);
  }, [auth]);

  const settings = [
    { text: "Change Password", clickEvent: () => navigate("/account/setting") },
    { text: "Logout", clickEvent: () => userLogout() },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={style.mainHeader}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link className={classes.link} to="/">
              <LazyLoad height={200} once>
                <img
                  src="/happy-cow.svg"
                  alt="main-cow"
                  height={40}
                  width={60}
                />
              </LazyLoad>
            </Link>
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ id, name, url, icon }, i) => (
              <div key={id}>
                <Button
                  sx={{ my: 2, color: "white", display: "inline-block" }}
                  style={{ margin: "0 13px" }}
                >
                  <Link className={classes.link} to={url}>
                    {icon}
                    <strong>{name}</strong>
                  </Link>
                </Button>
              </div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogin ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={auth.token ? auth.user?.name.toUpperCase() : "Guest"}
                  src="/static/images/avatar/2.jpg"
                  style={{ backgroundColor: "orange" }}
                />
              </IconButton>
            ) : (
              <LoginButton />
            )}
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            style={{ marginTop: "6vh" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(({ text, clickEvent }) => (
              <MenuItem
                key={text}
                onClick={() => {
                  clickEvent();
                  handleCloseUserMenu();
                }}
              >
                <Typography style={{ textAlign: "center" }}>{text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
