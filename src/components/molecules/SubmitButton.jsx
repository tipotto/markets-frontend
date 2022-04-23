import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginTop: '5rem',
      backgroundColor: '#57C5B6',
      '&:hover': {
        backgroundColor: '#57C5B6',
      },
    },
  }),
);

const SubmitButton = ({ disabled }) => {
  const { button } = useStyles();
  return (
    <Button
      id="submit"
      className={button}
      type="submit"
      size="medium"
      variant="contained"
      color="secondary"
      fullWidth
      disabled={disabled}
    >
      検索する
    </Button>
  );
};

export default SubmitButton;
