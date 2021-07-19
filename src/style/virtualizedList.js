import { makeStyles, createStyles } from '@material-ui/core/styles';

const vListCss = makeStyles(() =>
  createStyles({
    cardArea: {
      marginTop: 10,
      padding: 0,
      backgroundColor: '#fff',
      '&>div.ReactVirtualized__List': {
        outline: 'none',
      },
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      '&>div.MuiPaper-root': {
        marginLeft: '2.5px',
        marginRight: '2.5px',
        '&:first-child': {
          marginLeft: 0,
        },
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
  }),
);

export default vListCss;
