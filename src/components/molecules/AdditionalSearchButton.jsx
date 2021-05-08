import React, { memo } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import GetAppIcon from "@material-ui/icons/GetApp";
import ToggleButton from "@material-ui/lab/ToggleButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      marginTop: "6rem",
    },
  })
);

const AdditionalSearchButton = ({ formValues, handleAdditionalSearch }) => {
  const { button } = useStyles();
  console.log("AdditionalSearchButton");
  console.log("formValues", formValues);
  return (
    <ToggleButton
      className={button}
      value={formValues}
      onClick={handleAdditionalSearch}
      selected={false}
    >
      <GetAppIcon />
      もっと検索する
    </ToggleButton>
    // <Button
    //   variant="contained"
    //   color="primary"
    //   className={classes.button}
    //   startIcon={<GetAppIcon />}
    //   value={formValues}
    //   onClick={handleAdditionalSearch}
    // >
    //   もっと検索する
    // </Button>
  );
};

export default memo(AdditionalSearchButton);
