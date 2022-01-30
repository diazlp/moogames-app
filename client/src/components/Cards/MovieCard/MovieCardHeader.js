import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, CardHeader, IconButton } from "@material-ui/core";
import { deleteMovie } from "../../../actions/movieAction";
import EditOffIcon from "@mui/icons-material/EditOff";
import DeleteModal from "../../Modals/DeleteModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const GameCardHeader = ({ movie, auth }) => {
  const navigate = useNavigate("");
  const { created_at, title, id } = movie;
  const { token } = auth;
  const cardRef = useRef();

  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalStatus(!deleteModalStatus);
  };

  const handleEdit = () => {
    const { value } = cardRef.current;
    navigate(`/edit/movie/${value}`);
  };

  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" style={{ backgroundColor: "#000" }} />
      }
      action={
        token ? (
          <div>
            <IconButton
              aria-label="settings"
              onClick={handleEdit}
              value={id}
              ref={cardRef}
            >
              <ModeEditIcon style={{ color: "#108810" }} />
            </IconButton>
            <IconButton
              aria-label="settings"
              onClick={toggleDeleteModal}
              value={id}
              ref={cardRef}
            >
              <DeleteModal
                modalStatus={deleteModalStatus}
                itemId={id}
                cardRef={cardRef}
                cancelModal={toggleDeleteModal}
              />
            </IconButton>
          </div>
        ) : (
          <IconButton disabled>
            <EditOffIcon />
          </IconButton>
        )
      }
      title={title}
      subheader={`${
        new Date(created_at).getDate() < 10
          ? "0" + new Date(created_at).getDate()
          : new Date(created_at).getDate()
      } ${
        new Date(created_at).getMonth() + 1 === 1
          ? "Januari"
          : new Date(created_at).getMonth() + 1 === 2
          ? "Februari"
          : new Date(created_at).getMonth() + 1 === 3
          ? "Maret"
          : new Date(created_at).getMonth() + 1 === 4
          ? "April"
          : new Date(created_at).getMonth() + 1 === 5
          ? "Mei"
          : new Date(created_at).getMonth() + 1 === 6
          ? "Juni"
          : new Date(created_at).getMonth() + 1 === 7
          ? "Juli"
          : new Date(created_at).getMonth() + 1 === 8
          ? "Agustus"
          : new Date(created_at).getMonth() + 1 === 9
          ? "September"
          : new Date(created_at).getMonth() + 1 === 10
          ? "Oktober"
          : new Date(created_at).getMonth() + 1 === 11
          ? "November"
          : "Desember"
      } ${new Date(created_at).getFullYear()}`}
    />
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCardHeader);
