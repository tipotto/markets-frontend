import { makeStyles, createStyles } from '@material-ui/core/styles';

const formStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40%',
      },
    },
    items: {
      marginBottom: 30,
      display: 'block',
      // '&> p.MuiFormHelperText-contained': {
      //   margin: 0,
      // },
    },
    keywordError: {
      '&> p.MuiFormHelperText-contained': {
        margin: '15px 0 0',
      },
    },
    platformsError: {
      '&> p.MuiFormHelperText-contained': {
        margin: 0,
        // margin: '15px 0 0',
      },
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2.5rem',
    },
    price: {
      width: '45%',
    },
    hyphen: {
      display: 'inline-block',
      paddingTop: '1rem',
    },
  }),
);

export default formStyles;
