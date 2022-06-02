import { makeStyles, createStyles } from '@material-ui/core/styles';

const vListCss = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100% !important',
      backgroundColor: '#fff',
    },
    cardArea: {
      padding: 0,
      // backgroundColor: '#fff',
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        height: 'auto !important',
      },
    },
  }),
);

export default vListCss;
