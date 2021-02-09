import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#57C5B6',
      '&:hover': {
        backgroundColor: '#57C5B6',
      },
    },
  })
);

const RadioButton = ({ disabled }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      type="submit"
      size="medium"
      variant="contained"
      color="secondary"
      fullWidth
      disabled={disabled}
    >
      送信する
    </Button>
  );
};

export default RadioButton;
