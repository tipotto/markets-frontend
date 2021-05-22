import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import marketsLogo from '../../images/markets-logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#57C5B6',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      height: '5rem',
    },
  },
  toolBar: {
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  logo: {
    width: '13rem',
    height: '3.8rem',
    background: `url(${marketsLogo}) no-repeat left/70%`,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolBar}>
        <Typography variant="overline" className={classes.logo} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
