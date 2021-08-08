import { makeStyles, createStyles } from '@material-ui/core/styles';

const topCss = makeStyles((theme) =>
  createStyles({
    serviceContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: '4rem 0',
    },
    serviceBox: {
      width: '48.5%',
      marginBottom: '2rem',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginBottom: '1.3rem',
      },
    },
    serviceName: {
      margin: '.5rem 0 0',
    },
    link: {
      textDecoration: 'none',
      color: '#2D5569',
    },
    icon: {
      fontSize: '4rem',
      color: '#2D5569',
    },
  }),
);

export default topCss;
