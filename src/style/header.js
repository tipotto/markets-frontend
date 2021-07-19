import { makeStyles, createStyles } from '@material-ui/core/styles';
import marketsLogo from '../images/markets-logo.png';

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
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    logo: {
      width: '13rem',
      height: '3.8rem',
      background: `url(${marketsLogo}) no-repeat left/70%`,
    },
  }),
);

export default headerCss;
