import { makeStyles, createStyles } from '@material-ui/core/styles';

const infoBoxCss = makeStyles((theme) =>
  createStyles({
    infoBox: {
      width: '24.5%',
      marginBottom: '2rem',
      [theme.breakpoints.only('sm')]: {
        width: '49.5%',
        marginBottom: '.5rem',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginBottom: '.5rem',
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
