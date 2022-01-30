import React from "react";
import { Box, Container, Typography, Link } from "@material-ui/core";

const style = {
  footer: {
    display: "flex",
    textAlign: "center",
    backgroundColor: "#080808",
    color: " #FFF",
  },
};

const Footer = () => {
  const Copyright = () => {
    return (
      <Typography variant="body2">
        {"Copyright © "}
        <Link color="inherit" href="https://diazlp-portofolio.netlify.app/">
          Diaz Linggaputra
        </Link>{" "}
        {new Date().getFullYear()}
        {". All rights reserved."}
      </Typography>
    );
  };

  const renderFooter = () => {
    return (
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 5,
          mt: 7,
        }}
        style={style.footer}
      >
        <Container maxWidth="sm">
          {/* <Typography variant="body1">
            Like what you're seeing? Reach me out!
          </Typography> */}
          <Copyright />
        </Container>
      </Box>
    );
  };

  return <div>{renderFooter()}</div>;
};

export default Footer;
