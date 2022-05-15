import { makeStyles, createStyles } from '@material-ui/core/styles';

const baseCss = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: '#fff',
    },
    container: {
      marginTop: '9rem',
    },
    main: {
      maxWidth: '130rem',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '56rem',
      },
      [theme.breakpoints.up('md')]: {
        padding: '7rem 10rem',
      },
      [theme.breakpoints.only('sm')]: {
        padding: '7rem 3rem',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '7rem 1rem',
      },
    },
    common: {
      fontFamily: 'Lato',
      color: '#2b546a',
      fontWeight: 300,
    },
    title: {
      display: 'inline-block',
      marginRight: '1.5rem',
      fontFamily: 'Avenir Next',
      fontWeight: 400,
      color: '#0bc8b6',
      letterSpacing: '0.035em',
      fontSize: '1.5rem',
    },
    serviceName: {
      fontFamily: 'Avenir Next',
      fontSize: '3.5rem',
      fontWeight: 400,
      marginBottom: '1.2rem',
      color: '#0bc8b6',
      letterSpacing: '0.035em',
      [theme.breakpoints.down('sm')]: {
        fontSize: '3rem',
      },
    },
    siteDescription: {
      fontSize: '1.4rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
    sectionTitle: {
      fontSize: '1.4rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.3rem',
      },
    },
    sectionDescription: {
      fontSize: '1.2rem',
      marginTop: '-0.5rem',
      paddingBottom: '1.7rem',
      borderBottom: '1px solid #e1e6ec',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    sectionToolLink: {
      fontSize: '1.2rem',
      paddingTop: '1.3rem',
      borderTop: '1px solid #e1e6ec',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    toolLink: {
      textDecoration: 'none',
      color: '#24C8B6',
    },
    aboutContainer: {
      position: 'relative',
    },
    aboutSection: {
      height: '150px',
      overflow: 'hidden',
    },
    aboutTitle: {
      fontSize: '1.3rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
    aboutDescription: {
      fontSize: '1.1rem',
      marginTop: '-0.5rem',
      paddingBottom: '1.3rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    aboutListItem: {
      marginTop: '1.5rem',
    },
    aboutButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '30px',
      paddingTop: '100px',
      textAlign: 'center',
      lineHeight: '30px',
      background:
        'linear-gradient(180deg, rgb(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 70%)',
      cursor: 'pointer',
      transition: 'bottom 0.2s',
      '&.active': {
        background: 'none',
        bottom: '-30px',
      },
    },
    searchContainer: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    resultContainer: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '7rem',
      },
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
    result: {
      padding: '0',
    },
    resultHeader: {
      marginBottom: '3rem',
    },
    loading: {
      width: '100%',
      textAlign: 'center',
      padding: '2rem 0 1rem',
    },
    loadingText: {
      fontSize: '1.2rem',
      marginTop: '1.5rem',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    errorText: {
      fontSize: '1.2rem',
      marginTop: '.3rem',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    scrollUpBtn: {
      [theme.breakpoints.up('sm')]: {
        width: '150px',
        height: '150px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100px',
        height: '100px',
      },
      right: '10px',
      bottom: 0,
      position: 'fixed',
      opacity: 0,
      transform: 'none',
      transition: 'all 1s ease',
      zIndex: 9999,
      '&.show': {
        opacity: 0.8,
        transform: 'none',
      },
      '& a': {
        [theme.breakpoints.up('sm')]: {
          width: '150px',
          height: '150px',
        },
        [theme.breakpoints.down('xs')]: {
          width: '100px',
          height: '100px',
        },
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        '&::before': {
          [theme.breakpoints.up('sm')]: {
            width: '70px',
            height: '70px',
            top: '-70px',
            fontSize: '70px',
          },
          [theme.breakpoints.down('xs')]: {
            width: '50px',
            height: '50px',
            top: '-140px',
            fontSize: '50px',
          },
          bottom: 0,
          right: 0,
          left: 0,
          fontFamily: "'Font Awesome 5 Free'",
          fontWeight: 600,
          content: "'\\f102'",
          color: '#5CC5B6',
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center',
        },
        '&::after': {
          [theme.breakpoints.up('sm')]: {
            top: '75px',
          },
          [theme.breakpoints.down('xs')]: {
            top: '5px',
          },
          bottom: 0,
          right: 0,
          left: 0,
          fontSize: '25px',
          fontWeight: 500,
          content: "'TOP'",
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center',
          color: '#5CC5B6',
        },
      },
    },
    showScrollUpBtn: {
      [theme.breakpoints.down('xs')]: {
        bottom: '2.5rem',
      },
    },
  }),
);

export default baseCss;
