import { makeStyles, createStyles } from '@material-ui/core/styles';

const topStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: '#fff',
    },
    main: {
      maxWidth: '65rem',
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
    formContainer: {
      marginTop: '9rem',
      // [theme.breakpoints.down('xs')]: {
      //   marginTop: '6rem',
      // },
    },
    resultContainer: {
      // margin: '10rem 0 9rem',
      margin: '9rem 0',
    },
    result: {
      padding: '0 1.5rem',
    },
    resultHeader: {
      marginBottom: '5rem',
    },
    loading: {
      width: '100%',
      textAlign: 'center',
      paddingTop: '2rem',
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
    aboutContainer: {
      position: 'relative',
      marginTop: '9rem',
      // [theme.breakpoints.down('xs')]: {
      //   marginTop: '6rem',
      // },
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
      // borderBottom: '1px solid #e1e6ec',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    aboutButton: {
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
      '& .active': {
        background: 'none',
        bottom: '-30px',
      },
    },
    common: {
      fontFamily: 'Lato',
      color: '#2b546a',
      fontWeight: 300,
    },
    scrollUpBtn: {
      width: '2.5rem',
      height: '2.5rem',
      background: '#5CC5B6',
      display: 'block',
      lineHeight: '2.5rem',
      padding: '.5rem .5rem .2rem',
      position: 'fixed',
      right: '1.5rem',
      bottom: '-5rem',
      borderRadius: '.8rem',
      textAlign: 'center',
      zIndex: 9999,
      transition: 'bottom 0.8s',
      cursor: 'pointer',
    },
    showBtn: {
      bottom: '5rem',
      [theme.breakpoints.down('xs')]: {
        bottom: '2.5rem',
      },
    },
    itemTypeSelect: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'wrap',
      },
    },
    tabs: {
      [theme.breakpoints.down('xs')]: {
        margin: '0 auto 1rem',
        // margin: "0 auto 1.5rem",
      },
      '&> div.MuiTabScrollButton-root': {
        width: 0,
      },
    },
    tab: {
      '&>span.MuiTab-wrapper': {
        textTransform: 'none',
      },
    },
    pagination: {
      overflowX: 'scroll',
      [theme.breakpoints.down('xs')]: {
        margin: '0 auto',
      },
      '& ul.MuiPagination-ul': {
        flexWrap: 'nowrap',
      },
    },
    selectBox: {
      marginBottom: 30,
      display: 'block',
      textAlign: 'right',
    },
    platformSelectGroup: {
      [theme.breakpoints.down('xs')]: {
        margin: '0 auto',
      },
    },
    platformSelectBtn: {
      padding: '.5rem',
      border: 'none',
      '&:first-child': {
        borderRight: '1px solid #E0E0E0',
      },
      '&:last-child': {
        borderLeft: '1px solid #E0E0E0',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '.4rem',
      },
    },
  }),
);

export default topStyles;
