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
      [theme.breakpoints.down('sm')]: {
        maxWidth: '56rem',
      },
    },
    wholeChartWrapper: {
      position: 'relative',
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
      background:
        'linear-gradient(180deg, rgb(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 70%)',
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
      margin: '9rem 0',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    toggleBtnContainer: {
      textAlign: 'right',
      marginBottom: '1.5rem',
    },
    toggleBtn: {
      padding: '.5rem .8rem',
    },
    priceContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: '4rem',
    },
  }),
);

export default analyticsCss;
