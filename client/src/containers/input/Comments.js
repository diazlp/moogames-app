import React, { useContext } from "react";
import NewComment from "./CommentForm";
import CommentContext from "../../context/CommentContext";

import Stack from "@mui/material/Stack";

const Comments = () => {
  const commentCtx = useContext(CommentContext);

  const { showComments, itemId } = commentCtx;
  //setShowComments
  /*
  const toggleCommentHandler = () => {
    setShowComments(!showComments);
  };
  */

  return (
    <Stack spacing={2}>
      {/* <button
        style={{
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
          padding: "4px",
          backgroundColor: "#7dd0db",
          // border: "0.2px solid grey",
        }}
        onClick={toggleCommentHandler}
      >
        <strong>{showComments ? "Hide" : "Show"} Comments</strong>
      </button> */}

      <div>{showComments && <NewComment itemId={itemId} />}</div>
    </Stack>
  );
};

export default Comments;
