import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FilterBar = (props) => {
  const { itemData, label, onFirstFilter, onSecondFilter, onThirdFilter } =
    props;
  const [firstFilter, setFirstFilter] = useState([]);
  const [secondFilter, setSecondFilter] = useState([]);
  const [thirdFilter, setThirdFilter] = useState([]);

  useEffect(() => {
    if (label === "game") {
      itemData.map((item) => {
        setFirstFilter((state) => [...state, { label: item.platform }]);
        setSecondFilter((state) => [...state, { label: item.genre }]);
        setThirdFilter((state) => [...state, { label: item.release }]);
      });
    }
    if (label === "movie") {
      itemData.map((item) => {
        setFirstFilter((state) => [...state, { label: item.rating }]);
        setSecondFilter((state) => [...state, { label: item.genre }]);
        setThirdFilter((state) => [...state, { label: item.year }]);
      });
    }
  }, [itemData, label]);

  return (
    <div style={{ display: "flex", marginRight: "3vh" }}>
      <Autocomplete
        disablePortal
        options={firstFilter}
        sx={{ width: 150 }}
        onChange={(e) => onFirstFilter(e.currentTarget.textContent)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label === "game" ? "Platform" : "Rating"}
          />
        )}
      />
      <Autocomplete
        disablePortal
        options={secondFilter}
        sx={{ width: 150 }}
        onChange={(e) => onSecondFilter(e.currentTarget.textContent)}
        renderInput={(params) => <TextField {...params} label="Genre" />}
        style={{ marginLeft: "3vh" }}
      />
      <Autocomplete
        disablePortal
        options={thirdFilter}
        sx={{ width: 150 }}
        onChange={(e) => onThirdFilter(e.currentTarget.textContent)}
        renderInput={(params) => <TextField {...params} label="Year" />}
        style={{ marginLeft: "3vh" }}
      />
    </div>
  );
};

export default FilterBar;
