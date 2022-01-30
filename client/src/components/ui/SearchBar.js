import React, { useState } from "react";

import { Button, IconButton, InputBase } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const [term, setTerm] = useState();
  const { onChange } = props;

  const onChangeHandler = () => {
    onChange(term);
  };

  return (
    <Button
      component="form"
      style={{
        display: "flex",
        marginLeft: "3vh",
        border: "1px solid #C0C0C0",
      }}
      onChange={onChangeHandler}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search title..."
        inputProps={{ "aria-label": "search title" }}
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
      />
      <IconButton type="submit" sc={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Button>
  );
};

export default SearchBar;
