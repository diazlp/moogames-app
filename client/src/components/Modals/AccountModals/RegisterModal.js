import React, { useState } from "react";
import { connect } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  Button,
  Modal,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registerUser } from "../../../actions";

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

const RegisterModal = ({ registerUser, openModal, closeModal }) => {
  const [registerFail, setRegisterFail] = useState({});

  const [invalidEmail, setInvalidEmail] = useState({
    isInvalid: false,
    errorText: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (invalidEmail.errorText.length) {
      return;
    }

    const registerFunc = async () => {
      setRegisterFail({ ...registerFail, isProcessing: true });

      await registerUser({
        name: `${data.get("firstName")} ${data.get("lastName")}`,
        email: data.get("email"),
        password: data.get("password"),
      });
    };

    registerFunc()
      .then(() => setRegisterFail({ ...registerFail, failStatus: false }))
      .then(() => {
        setTimeout(() => {
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        setRegisterFail({ ...registerFail, failStatus: true });
      });
  };

  const handleChange = (e) => {
    const re =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!e.target.value.match(re)) {
      setInvalidEmail({
        isInvalid: true,
        errorText: "Your email is invalid",
      });
    } else {
      setInvalidEmail({ isInvalid: false, errorText: "" });
    }
  };

  const renderModal = () => {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Modal
            open={openModal}
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
                    <IconButton onClick={closeModal}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Grid>
                  <Grid item style={{ marginLeft: "20px" }}>
                    <Avatar sx={{ m: 1 }} style={{ backgroundColor: "purple" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        error={invalidEmail.isInvalid ? true : false}
                        helperText={
                          invalidEmail.isInvalid ? invalidEmail.errorText : null
                        }
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        inputProps={{ minLength: 6 }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{
                      backgroundColor: "#1976d2",
                      marginTop: "5px",
                      color: "white",
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
              {registerFail.failStatus ? (
                <Alert severity="error" style={{ textAlign: "center" }}>
                  Something went wrong, please try again
                </Alert>
              ) : registerFail.length === undefined &&
                registerFail.failStatus === undefined &&
                registerFail.isProcessing === undefined ? (
                <></>
              ) : registerFail.isProcessing ? (
                <Alert severity="warning" style={{ textAlign: "center" }}>
                  Your request is being processed. Please wait...
                </Alert>
              ) : (
                <Alert severity="success" style={{ textAlign: "center" }}>
                  Your account is successfully registered. Please proceed...
                </Alert>
              )}
            </Container>
          </Modal>
        </ThemeProvider>
      </div>
    );
  };

  return <div>{renderModal()}</div>;
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(RegisterModal);
