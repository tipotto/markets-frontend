import { makeStyles, createStyles } from '@material-ui/core/styles';

const footerCss = makeStyles(() =>
  createStyles({
    appBar: {
      backgroundColor: '#57C5B6',
      padding: '20px',
      flexGrow: 1,
    },
    text: {
      color: 'white',
      fontSize: '1.0rem',
      fontWeight: '200',
      letterSpacing: '0.12em',
      textAlign: 'center',
      flexGrow: 1,
      textTransform: 'lowercase',
    },
  }),
);

export default footerCss;
