import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, CardHeader, IconButton } from "@material-ui/core";
import { deleteGame } from "../../actions/gameAction";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const GameCardHeader = (props) => {
  const navigate = useNavigate("");
  const { created_at, name, id } = props.game;
  const { deleteGame } = props;

  const cardRef = useRef();

  const handleEdit = () => {
    const { value } = cardRef.current;
    navigate(`/edit/game/${value}`);
  };

  const handleDelete = () => {
    const { value } = cardRef.current;
    deleteGame(value);
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
      title={name}
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
  deleteGame,
};

export default connect(null, mapDispatchToProps)(GameCardHeader);
