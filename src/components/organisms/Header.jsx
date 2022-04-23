import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HeaderMenu from './HeaderMenu';
import headerCss from '../../style/header';

const Header = () => {
  const { appBar, toolBar, logo } = headerCss();
  const handlePageTop = (event) => {
    window.location.href = '/';
  };
  return (
    <AppBar className={appBar} position="static">
      <Toolbar className={toolBar}>
        <Typography
          onClick={handlePageTop}
          variant="overline"
          className={logo}
        />
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
