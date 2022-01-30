import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Modal,
  Typography,
  TextField,
  Grid,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, AlertTitle } from "@mui/material";
import { userLogin } from "../../../actions";
import RegisterModal from "./RegisterModal";
import Homepage from "../../Homepage";

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const LoginModal = ({ userLogin }) => {
  let countTimer;
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [loginStatus, setLoginStatus] = useState({});
  const [successTimer, setSuccessTimer] = useState(0);
  const [openRegister, setOpenRegister] = useState(false);

  /* helper function to close register modal on submit*/
  const closeRegisterModal = () => {
    setOpenRegister(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const loginFunc = async () => {
      setLoginStatus({ ...loginStatus, isProcessing: true });

      await userLogin({
        email: data.get("email"),
        password: data.get("password"),
      });
    };

    loginFunc()
      .then(() => setSuccessTimer(2))
      .then(() => setLoginStatus({ ...loginStatus, isInvalid: false }))
      .then(() =>
        setTimeout(() => {
          navigate("/");
        }, 3000)
      )
      .catch((err) => setLoginStatus({ ...loginStatus, isInvalid: true }));
  };

  const handleClose = () => {
    navigate("/");
    setOpen(!open);
  };

  useEffect(() => {
    if (!loginStatus.isInvalid)
      countTimer = setInterval(() => {
        setSuccessTimer(successTimer - 1);
      }, 1000);

    return () => {
      clearInterval(countTimer);
    };
  }, [successTimer]);

  const renderModal = () => {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  ...style,
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  spacing={10}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Grid item>
                    <IconButton onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                  <Grid item style={{ marginLeft: "20px" }}>
                    <Avatar sx={{ m: 1 }} style={{ backgroundColor: "purple" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputProps={{ minLength: 6 }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{
                      backgroundColor: "#1976d2",
                      marginTop: "50px",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Button>
                  <Grid
                    container
                    justifyContent="flex-end"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#4286f4",
                    }}
                    onClick={() => setOpenRegister(!openRegister)}
                  >
                    Don't have an account? Sign Up
                  </Grid>
                </Box>
                <RegisterModal
                  openModal={openRegister}
                  closeModal={closeRegisterModal}
                />
              </Box>
              {loginStatus.isInvalid ? (
                <Alert severity="error" style={{ textAlign: "center" }}>
                  <AlertTitle>
                    <b>Login Failed!</b>
                  </AlertTitle>
                  Check your credentials or please try again later
                </Alert>
              ) : loginStatus.length === undefined &&
                loginStatus.isInvalid === undefined &&
                loginStatus.isProcessing === undefined ? (
                <></>
              ) : loginStatus.isProcessing ? (
                <Alert severity="warning" style={{ textAlign: "center" }}>
                  Your request is being processed. Please wait...
                </Alert>
              ) : (
                <Alert severity="success" style={{ textAlign: "center" }}>
                  Login Successful! Redirecting back in {successTimer}{" "}
                  seconds...
                </Alert>
              )}
            </Container>
          </Modal>
        </ThemeProvider>
      </div>
    );
  };

  return (
    <div>
      <Homepage />
      {renderModal()}
    </div>
  );
};

const mapDispatchToProps = {
  userLogin,
};

export default connect(null, mapDispatchToProps)(LoginModal);
