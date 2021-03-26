import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#57C5B6",
    padding: "20px",
    flexGrow: 1,
  },
  text: {
    color: "white",
    fontSize: "1.0rem",
    fontWeight: "200",
    letterSpacing: "0.12em",
    textAlign: "center",
    flexGrow: 1,
    textTransform: "lowercase",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <footer className={classes.appBar}>
      <Toolbar>
        <Typography variant="overline" className={classes.text}>
          ©︎ markets.jp
        </Typography>
      </Toolbar>
    </footer>
  );
};

export default Header;
