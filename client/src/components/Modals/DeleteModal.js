import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  Grid,
} from "@material-ui/core";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import { deleteGame } from "../../actions/gameAction";
import { deleteMovie } from "../../actions/movieAction";

import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#FFF",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DeleteModal = (props) => {
  const { deleteGame, deleteMovie, modalStatus, itemId, cardRef, cancelModal } =
    props;
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = () => {
    const { value } = cardRef?.current;

    setDeleteClicked(!deleteClicked);

    setTimeout(() => {
      itemId < 30000 ? deleteGame(value) : deleteMovie(value);
      setDeleteClicked(!deleteClicked);
    }, 1000);
  };

  const renderModal = () => {
    return (
      <>
        <DeleteIcon style={{ color: "#FF1212" }} />
        <Modal
          open={modalStatus}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Box
            sx={{
              ...style,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Grow
              in={modalStatus}
              style={{ transformOrigin: "20 20 20" }}
              {...(modalStatus ? { timeout: 600 } : {})}
            >
              <Grid container style={{ justifyContent: "center" }}>
                <Grid item>
                  <IconButton st>
                    {deleteClicked ? (
                      <Grow
                        in={deleteClicked}
                        style={{ transformOrigin: "20 20 20" }}
                        {...(deleteClicked ? { timeout: 500 } : {})}
                      >
                        <CheckCircleOutlineIcon
                          style={{
                            color: "#4bb543",
                            textAlign: "center",
                            fontSize: "100",
                          }}
                        />
                      </Grow>
                    ) : (
                      <HighlightOffIcon
                        style={{
                          color: "#FF1212",
                          textAlign: "center",
                          fontSize: "100",
                        }}
                      />
                    )}
                  </IconButton>
                </Grid>
                <Grid item style={{ marginTop: "3vh" }}>
                  <Typography
                    variant="h6"
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  >
                    Are you sure you want to remove this item?
                  </Typography>
                </Grid>
                <Grid item>
                  <Stack
                    direction="row"
                    spacing={14}
                    style={{ marginTop: "7vh" }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "#FFF",
                        fontWeight: "bold",
                      }}
                      onClick={cancelModal}
                    >
                      <Typography variant="h7">Cancel</Typography>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#FF1212",
                        color: "#FFF",
                        fontWeight: "bold",
                      }}
                      onClick={handleDelete}
                      value={itemId}
                      ref={cardRef}
                    >
                      <Typography variant="h7">Delete</Typography>
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grow>
          </Box>
        </Modal>
      </>
    );
  };

  return <>{renderModal()}</>;
};

const mapDispatchToProps = {
  deleteGame,
  deleteMovie,
};

export default connect(null, mapDispatchToProps)(DeleteModal);
