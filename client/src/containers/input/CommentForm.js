import React, { useRef, useState } from "react";
import axios from "axios";

import { TextField, Button, Box } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const NewComment = (props) => {
  const [formText, setFormText] = useState({
    email: "",
    name: "",
    comment: "",
  });

  const { itemId } = props;

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const addCommentHandler = (commentData) => {
    axios.post("/api/comments", commentData);
    // .then((res) => console.log(res));
  };

  const sendCommentHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      !enteredName ||
      !enteredComment ||
      !enteredEmail.includes("@") ||
      enteredEmail.trim() === "" ||
      enteredName.trim() === "" ||
      enteredComment.trim() === ""
    ) {
      return;
    }

    addCommentHandler({
      email: enteredEmail,
      name: enteredName,
      comment: enteredComment,
      itemId,
    });
    setFormText({ name: "", email: "", comment: "" });
  };

  return (
    <form onSubmit={sendCommentHandler}>
      <Box style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <TextField
          required
          id="filled-basic"
          label="Your Email"
          variant="filled"
          helperText="Please enter your email"
          inputRef={emailInputRef}
          autoComplete="false"
          value={formText.email}
          onChange={(e) => setFormText({ email: e.target.value })}
          inputProps={{
            style: {
              backgroundColor: "#FFF",
              boxShadow:
                'inset 5px 5px 10px #c3c4c4, inset -5px -5px 10px #fff"',
            },
          }}
          style={{ marginRight: "20px" }}
        />
        <TextField
          required
          id="filled-basic"
          label="Your Name"
          variant="filled"
          helperText="Please enter your name"
          inputRef={nameInputRef}
          value={formText.name}
          onChange={(e) => setFormText({ name: e.target.value })}
          inputProps={{
            style: {
              backgroundColor: "#FFF",
              boxShadow:
                'inset 5px 5px 10px #c3c4c4, inset -5px -5px 10px #fff"',
            },
          }}
        />
        <TextField
          fullWidth
          required
          id="filled-basic"
          label="Your Comment"
          variant="filled"
          helperText="Please enter your comment"
          inputRef={commentInputRef}
          value={formText.comment}
          onChange={(e) => setFormText({ comment: e.target.value })}
          inputProps={{
            style: {
              backgroundColor: "#FFF",
              boxShadow:
                'inset 5px 5px 10px #c3c4c4, inset -5px -5px 10px #fff"',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          endIcon={<Send />}
          style={{ backgroundColor: "#80DEEA" }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default NewComment;
