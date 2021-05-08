import { makeStyles, createStyles } from "@material-ui/core/styles";

const formStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "40%",
      },
    },
    items: {
      marginBottom: 30,
      display: "block",
    },
    priceContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2.5rem",
    },
    price: {
      width: "45%",
    },
    hyphen: {
      display: "inline-block",
      paddingTop: "1rem",
    },
  })
);

export default formStyles;
