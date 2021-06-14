import { makeStyles, createStyles } from '@material-ui/core/styles';

const analysisItemStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '24.5%',
      height: 'auto',
      boxSizing: 'border-box',
      marginTop: '.5rem',
      [theme.breakpoints.down('xs')]: {
        width: '32.5%',
        marginTop: '.4rem',
      },
    },
    emptyBox: {
      boxShadow: 'none',
    },
    link: {
      display: 'block',
      width: '100%',
      height: '100%',
      textDecoration: 'none',
      color: '#757575',
    },
    header: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      '&>div.MuiCardHeader-content': {
        '&>span.MuiTypography-root': {
          height: '2.5rem',
          maxWidth: '100%',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'left',
        },
      },
    },
    fav: {
      width: '100%',
      // display: "flex",
      // justifyContent: "space-between",
      marginBottom: '-1.5rem',
      background: 'transparent',
      textAlign: 'right',
    },
    media: {
      height: '5rem',
      paddingTop: '56.25%', // 16:9
    },
    // content: {
    //   [theme.breakpoints.up("sm")]: {
    //     paddingBottom: 0,
    //   },
    //   [theme.breakpoints.down("xs")]: {
    //     display: "none",
    //   },
    // },
    // typography: {
    //   fontSize: "17px",
    //   textAlign: "center",
    // },
    priceBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '-2.8rem',
      background: 'transparent',
      [theme.breakpoints.only('xs')]: {
        marginTop: '-2.7rem',
      },
      [theme.breakpoints.only('sm')]: {
        marginTop: '-3rem',
      },
      [theme.breakpoints.only('md')]: {
        marginTop: '-3.2rem',
      },
    },
    priceLabel: {
      margin: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: '0 12px 12px 0',
      color: '#fff',
      fontSize: '1.3rem',
      fontWeight: 400,
      padding: '4px 12px 4px 8px',
      zIndex: 2,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
    favButton: {
      background: 'transparent !important',
      padding: 0,
      marginRight: '.5rem',
      marginBottom: '-1.3rem',
      border: 'none',
      [theme.breakpoints.down('xs')]: {
        marginRight: '.3rem',
        marginBottom: '-0.5rem',
      },
    },
    favIcon: {
      fontSize: '2.2rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
    // deleteButton: {
    //   background: "transparent !important",
    //   padding: 0,
    //   marginRight: ".3rem",
    //   marginBottom: "-1.5rem",
    //   border: "none",
    //   [theme.breakpoints.down("xs")]: {
    //     marginRight: ".1rem",
    //     marginBottom: "-0.7rem",
    //   },
    // },
    // deleteIcon: {
    //   fontSize: "2.5rem",
    //   [theme.breakpoints.down("xs")]: {
    //     fontSize: "1.8rem",
    //   },
    // },
  }),
);

export default analysisItemStyles;
