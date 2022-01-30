import React from "react";
import { useParams } from "react-router-dom";
import GameForm from "./FormCreate/GameCreate";
import MovieForm from "./FormCreate/MovieCreate";

const MainForm = () => {
  const params = useParams();
  const { section } = params;

  if (section === "game") {
    return <GameForm />;
  } else if (section === "movie") {
    return <MovieForm />;
  } else {
    return <div>OOps... wrong page.</div>;
  }
};

export default MainForm;
