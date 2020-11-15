import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#57C5B6',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      height: '100px',
    },
  },
  toolBar: {
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  title: {
    fontWeight: '300',
    letterSpacing: '0.1em',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" className={classes.title}>
          markets.jp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
