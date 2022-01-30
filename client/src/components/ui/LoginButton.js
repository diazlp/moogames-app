import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/account/login")}
      color="primary"
      variant="contained"
    >
      Login Account
    </Button>
  );
};

export default LoginButton;
