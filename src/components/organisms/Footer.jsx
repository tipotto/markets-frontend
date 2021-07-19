import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import footerCss from '../../style/footer';

const Footer = () => {
  const { appBar, text } = footerCss();
  return (
    <footer className={appBar}>
      <Toolbar>
        <Typography variant="overline" className={text}>
          ©︎ markets.jp
        </Typography>
      </Toolbar>
    </footer>
  );
};

export default Footer;
