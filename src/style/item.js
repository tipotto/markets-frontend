import { makeStyles, createStyles } from '@material-ui/core/styles';

const itemCss = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '215px',
      [theme.breakpoints.up('md')]: {
        width: '250px',
      },
      [theme.breakpoints.only('sm')]: {
        width: '160px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '120px',
      },
      height: '96%',
      boxSizing: 'border-box',
      marginLeft: '2.5px',
      marginRight: '2.5px',
      '&:first-of-type': {
        marginLeft: 0,
      },
      '&:last-of-type': {
        marginRight: 0,
      },
    },
    emptyBox: {
      boxShadow: 'none',
    },
    link: {
      position: 'relative',
      display: 'block',
      width: '100%',
      height: '100%',
      textDecoration: 'none',
      color: '#757575',
    },
    header: {
      padding: '.6rem',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      '&>div.MuiCardHeader-avatar': {
        marginRight: '.6rem',
        '&>div.MuiAvatar-root': {
          borderRadius: 0,
        },
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
    imageContainer: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    favButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: 'transparent',
      padding: '.4rem',
      zIndex: 9999,
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      },
    },
    favIcon: {
      fontSize: '2.2rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
    media: {
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '95%',
      },
    },
    priceBox: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      background: 'transparent',
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
  }),
);

export default itemCss;
