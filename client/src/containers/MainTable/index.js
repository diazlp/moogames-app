import React from "react";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";
import MovieTable from "./MovieTable";

const MainTable = () => {
  const { section } = useParams();

  if (section === "game") {
    return <GameTable section={section} />;
  } else if (section === "movie") {
    return <MovieTable section={section} />;
  } else {
    return <div>OOps... wrong page.</div>;
  }
};

export default MainTable;
