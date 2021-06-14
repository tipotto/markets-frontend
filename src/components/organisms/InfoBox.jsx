import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    infoBox: {
      flex: 1,
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginRight: '.7rem',
      },
    },
    selected: {
      borderBottom: '.5rem solid rgba(75, 192, 192, 0.8)',
    },
    priceBox: {
      color: '#6c757d',
      fontWeight: 700,
      fontSize: '1.75rem',
      marginTop: '1rem',
      // fontWeight: '700 !important',
      // fontSize: '0.8rem !important',
      // marginTop: '15px !important',
    },
  }),
);

function InfoBox({ title, price, active, onClick }) {
  const { infoBox, selected, priceBox } = useStyles();
  return (
    <Card
      onClick={onClick}
      className={active ? clsx(infoBox, selected) : infoBox}
      // onClick={props.onClick}
      // className={`infoBox ${active && 'infoBox--selected'} ${
      //   isRed && 'infoBox--red'
      // }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <div className={priceBox}>¥ {price}</div>
        {/* <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          {cases}
        </h2> */}

        {/* <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography> */}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
