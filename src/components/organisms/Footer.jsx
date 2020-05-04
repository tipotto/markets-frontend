import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#57C5B6",
    padding: "20px",
    flexGrow: 1,
  },
  text: {
    fontSize: "1.0rem",
    fontWeight: "200",
    letterSpacing: "0.12em",
    textAlign: "center",
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.text}>
          ©︎ markets.jp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
