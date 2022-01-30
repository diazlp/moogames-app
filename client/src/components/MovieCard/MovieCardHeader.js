import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, CardHeader, IconButton } from "@material-ui/core";
import { deleteMovie } from "../../actions/movieAction";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const GameCardHeader = ({ movie, deleteMovie }) => {
  const navigate = useNavigate("");
  const { created_at, title, id } = movie;
  const cardRef = useRef();

  const handleEdit = () => {
    const { value } = cardRef.current;
    navigate(`/edit/movie/${value}`);
  };

  const handleDelete = () => {
    const { value } = cardRef.current;
    deleteMovie(value);
  };

  return (
    <CardHeader
      avatar={<Avatar aria-label="recipe">R</Avatar>}
      action={
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
            onClick={handleDelete}
            value={id}
            ref={cardRef}
          >
            <DeleteIcon style={{ color: "#FF1212" }} />
          </IconButton>
        </div>
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

const mapDispatchToProps = {
  deleteMovie,
};

export default connect(null, mapDispatchToProps)(GameCardHeader);
