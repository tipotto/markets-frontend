import { makeStyles, createStyles } from '@material-ui/core/styles';

const topCss = makeStyles((theme) =>
  createStyles({
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
        margin: '0 auto 1.3rem',
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

export default topCss;
