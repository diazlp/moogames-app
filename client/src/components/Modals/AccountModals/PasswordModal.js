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
import { Alert } from "@mui/material";
import { userPasswordChange } from "../../../actions";
import Homepage from "../../Homepage";

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 520,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PasswordModal = ({ auth, userPasswordChange }) => {
  let countTimer;
  const {
    user: { email, name },
  } = auth;
  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState({});
  const [successTimer, setSuccessTimer] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const passwordChangeFunc = async () => {
      setChangeStatus({ ...changeStatus, isProcessing: true });

      await userPasswordChange({
        current_password: data.get("current_password"),
        new_password: data.get("new_password"),
        new_confirm_password: data.get("new_confirm_password"),
      });
    };

    passwordChangeFunc()
      .then(() => setSuccessTimer(3))
      .then(() => setChangeStatus({ ...changeStatus, isInvalid: false }))
      .then(() =>
        setTimeout(() => {
          navigate("/");
        }, 3000)
      )
      .catch((err) => setChangeStatus({ ...changeStatus, isInvalid: true }));
  };

  useEffect(() => {
    if (!changeStatus.isInvalid)
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
            open
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
                    <IconButton onClick={() => navigate("/")}>
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
                  Hello, {name.split(" ").shift()}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    // defaultValue={email}
                    value={email}
                    name="email"
                    disabled
                  />
                  <TextField
                    autoComplete=""
                    margin="normal"
                    defaultValue=""
                    required
                    fullWidth
                    name="current_password"
                    label="Old Password"
                    type="password"
                    id="current_password"
                    inputProps={{ minLength: 6 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="new_password"
                    label="New Password"
                    type="password"
                    id="new_password"
                    inputProps={{ minLength: 6 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="new_confirm_password"
                    label="Confirm New Password"
                    type="password"
                    id="new_confirm_password"
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
                    Change Password
                  </Button>
                </Box>
              </Box>
              {changeStatus.isInvalid ? (
                <Alert severity="error" style={{ textAlign: "center" }}>
                  Something went wrong, please try again
                </Alert>
              ) : changeStatus.length === undefined &&
                changeStatus.isInvalid === undefined &&
                changeStatus.isProcessing === undefined ? (
                <></>
              ) : changeStatus.isProcessing ? (
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

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  userPasswordChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordModal);
