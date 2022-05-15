import { makeStyles, createStyles } from '@material-ui/core/styles';
import marketsLogo from '../images/markets-logo-large.png';
import marketsLogoShort from '../images/markets-logo-short.png';

const headerCss = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: '#57C5B6',
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        height: '5rem',
      },
    },
    toolBar: {
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    logo: {
      width: '13rem',
      height: '3.8rem',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        background: `url(${marketsLogo}) no-repeat left/70%`,
      },
      [theme.breakpoints.down('xs')]: {
        background: `url(${marketsLogoShort}) no-repeat left/18%`,
      },
    },
  }),
);

export default headerCss;
