import { makeStyles, createStyles } from '@material-ui/core/styles';

const analyticsCss = makeStyles((theme) =>
  createStyles({
    common: {
      fontFamily: 'Lato',
      color: '#2b546a',
      fontWeight: 300,
    },
    wrapper: {
      backgroundColor: '#fff',
    },
    main: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '6rem 1.5rem 0',
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
    wholeChartWrapper: {
      position: 'relative',
      // marginTop: '9rem',
    },
    wholeChartButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '30px',
      paddingTop: '60px',
      textAlign: 'center',
      lineHeight: '30px',
      background: `linear-gradient(180deg, rgb(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 70%)`,
      cursor: 'pointer',
      transition: 'bottom 0.2s',
      '&.active': {
        background: 'none',
        bottom: '-60px',
      },
    },
    wholeChartSection: {
      height: '350px',
      overflow: 'hidden',
    },
    wholeChartContainer: {
      position: 'relative',
      margin: 'auto',
      width: '100%',
      height: '50rem',
    },
    partialChartWrapper: {
      margin: '6rem 0',
    },
    partialChartContainer: {
      position: 'relative',
      margin: 'auto',
      width: '100%',
      height: '25rem',
      [theme.breakpoints.down('xs')]: {
        height: '18rem',
      },
    },
    formContainer: {
      marginTop: '9rem',
      // [theme.breakpoints.down('xs')]: {
      //   marginTop: '6rem',
      // },
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
    resultContainer: {
      // margin: '10rem 0 9rem',
      margin: '9rem 0',
    },
    result: {
      padding: '0 1.5rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    toggleBtnContainer: {
      textAlign: 'right',
      marginBottom: '1.5rem',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    toggleBtnGroup: {
      // [theme.breakpoints.down('xs')]: {
      //   margin: '0 auto',
      // },
    },
    toggleBtn: {
      padding: '.5rem .8rem',
      // border: 'none',
      // '&:first-child': {
      //   borderRight: '1px solid #E0E0E0',
      // },
      // '&:last-child': {
      //   borderLeft: '1px solid #E0E0E0',
      // },
      // [theme.breakpoints.down('xs')]: {
      //   padding: '.4rem',
      // },
    },
    priceContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      // marginTop: '4rem',
      marginBottom: '4rem',
    },
    // items: {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   marginTop: '4rem',
    //   flexWrap: 'wrap',
    //   '&:before': {
    //     content: '""',
    //     display: 'block',
    //     width: '24.5%',
    //     height: 0,
    //     order: 1,
    //   },
    //   '&:after': {
    //     content: '""',
    //     display: 'block',
    //     width: '24.5%',
    //     height: 0,
    //   },
    // },
    items: {
      marginTop: '4rem',
    },
    // analysisResult: {
    //   maxWidth: '75rem',
    //   margin: '0 auto',
    //   // padding: '6rem 1.5rem 0',
    //   // padding: '6rem 1.5rem',
    //   [theme.breakpoints.down('sm')]: {
    //     maxWidth: '56rem',
    //   },
    //   // [theme.breakpoints.down('xs')]: {
    //   //   // padding: '2.5rem 1.5rem',
    //   //   padding: '6rem 1.5rem',
    //   // },
    //   [theme.breakpoints.only('sm')]: {
    //     // padding: '6rem 3rem',
    //     padding: '6rem 3rem 0',
    //   },
    // },
  }),
);

export default analyticsCss;
