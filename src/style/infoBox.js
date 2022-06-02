import { makeStyles, createStyles } from '@material-ui/core/styles';

const infoBoxCss = makeStyles((theme) =>
  createStyles({
    header: {
      fontSize: '1.1rem',
      backgroundColor: '#fff',
    },
    infoBox: {
      width: '24.5%',
      margin: '0 .2rem 2rem',
      '&:first-of-type': {
        margin: '0 .2rem 2rem 0',
      },
      '&:last-of-type': {
        margin: '0 0 2rem .2rem',
      },
      [theme.breakpoints.only('sm')]: {
        width: '49.5%',
        margin: '0 0 .5rem',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: '0 0 .5rem',
      },
    },
    priceBox: {
      color: '#6c757d',
      fontWeight: 700,
      fontSize: '1.75rem',
      marginTop: '1rem',
    },
  }),
);

export default infoBoxCss;
