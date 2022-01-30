import React, { useState, createContext } from "react";

const CommentContext = createContext();

export const CommentContextStore = ({ children }) => {
  const [showComments, setShowComments] = useState(true);
  const [itemId, setItemId] = useState();

  const context = {
    showComments,
    setShowComments,
    itemId,
    setItemId,
  };
  return (
    <CommentContext.Provider value={context}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
