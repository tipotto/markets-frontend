import { makeStyles, createStyles } from '@material-ui/core/styles';

const formCss = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    title: {
      color: '#2b546a',
      fontWeight: 300,
    },
    formContainer: {
      [theme.breakpoints.up('md')]: {
        width: '15%',
        minWidth: '6rem',
      },
    },
    formDetailOptionContainer: {
      position: 'relative',
    },
    formDetailOptionSection: {
      height: '80px',
      overflow: 'hidden',
      paddingTop: '1.3rem',
    },
    formOptionLink: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '30px',
      paddingTop: '30px',
      textAlign: 'center',
      lineHeight: '30px',
      background:
        'linear-gradient(180deg, rgb(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 70%)',
      cursor: 'pointer',
      transition: 'bottom 0.2s',
      '&.active': {
        background: 'none',
        bottom: '-40px',
      },
    },
    items: {
      marginBottom: 30,
      display: 'block',
    },
    keywordError: {
      '&> p.MuiFormHelperText-contained': {
        margin: '15px 0 0',
      },
    },
    platformsError: {
      '&> p.MuiFormHelperText-contained': {
        margin: 0,
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

export default formCss;
