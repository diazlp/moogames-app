import React, { useState, useEffect } from "react";
import axios from "axios";

import { Avatar, Divider, Grid, Paper } from "@material-ui/core";

const CommentList = ({ itemId }) => {
  const [dataComment, setDataComment] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get("/api/comments", {
        params: {
          itemId,
        },
      });

      setDataComment(res.data);
    };
    fetchComment();
  }, [itemId, dataComment]);

  if (!dataComment) return;

  const renderNew = () => {
    return dataComment.reverse().map(({ _id, email, name, comment }) => {
      return (
        <div key={_id} style={{ padding: 14 }}>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt={name}
                  src={name}
                  style={{ backgroundColor: "#80DEEA" }}
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
                <p style={{ textAlign: "left", color: "gray" }}>{email}</p>
                <p style={{ textAlign: "left" }}>{comment}</p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </Paper>
        </div>
      );
    });
  };

  return (
    <div style={{ margin: "60px", textAlign: "center" }}>
      <h1>Comments</h1>
      {renderNew()}
    </div>
  );
};

export default CommentList;
