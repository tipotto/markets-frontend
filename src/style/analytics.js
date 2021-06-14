import { makeStyles, createStyles } from '@material-ui/core/styles';

const analyticsStyles = makeStyles((theme) =>
  createStyles({
    prices: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '4rem',
    },
    items: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '4rem',
      flexWrap: 'wrap',
      '&:before': {
        content: '""',
        display: 'block',
        width: '24.5%',
        height: 0,
        order: 1,
      },
      '&:after': {
        content: '""',
        display: 'block',
        width: '24.5%',
        height: 0,
      },
    },
    analysisResult: {
      maxWidth: '65rem',
      margin: '0 auto',
      // padding: '6rem 1.5rem 0',
      // padding: '6rem 1.5rem',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '56rem',
      },
      // [theme.breakpoints.down('xs')]: {
      //   // padding: '2.5rem 1.5rem',
      //   padding: '6rem 1.5rem',
      // },
      [theme.breakpoints.only('sm')]: {
        // padding: '6rem 3rem',
        padding: '6rem 3rem 0',
      },
    },
  }),
);

export default analyticsStyles;
