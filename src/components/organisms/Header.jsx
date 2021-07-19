import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import headerCss from '../../style/header';

const Header = () => {
  const { appBar, toolBar, logo } = headerCss();
  return (
    <AppBar className={appBar} position="static">
      <Toolbar className={toolBar}>
        <Typography variant="overline" className={logo} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
