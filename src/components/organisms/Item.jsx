import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import mercariIcon from "../../images/mercari-icon.png";
import rakumaIcon from "../../images/rakuma-icon.png";
import paypayIcon from "../../images/paypay-icon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    boxSizing: "border-box",
    [theme.breakpoints.up("md")]: {
      width: "24%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "32%",
    },
  },
  link: {
    display: "block",
    width: "100%",
    height: "100%",
    textDecoration: "none",
    color: "#757575",
  },
  header: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    "&>div.MuiCardHeader-content": {
      "&>span.MuiTypography-root": {
        height: "2.5rem",
        maxWidth: "100%",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  },
  media: {
    height: "5rem",
    paddingTop: "56.25%", // 16:9
  },
  // content: {
  //   [theme.breakpoints.up("sm")]: {
  //     paddingBottom: 0,
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     display: "none",
  //   },
  // },
  // typography: {
  //   fontSize: "17px",
  //   textAlign: "center",
  // },
  priceLabel: {
    display: "table",
    marginTop: "-2rem",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "0 12px 12px 0",
    color: "#fff",
    fontSize: ".8rem",
    fontWeight: 600,
    padding: "4px 12px 4px 8px",
    zIndex: 2,
  },
}));

const Item = ({ title, price, image, detail, platform }) => {
  const classes = useStyles();

  // const moldTitle = () => {
  //   const MAX_LENGTH = 18;
  //   if (!title) return "";
  //   if (title.length <= MAX_LENGTH) return title;
  //   return `${title.substr(0, MAX_LENGTH)}...`;
  // };

  const moldPrice = () => {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const setIcon = (service) => {
    let icon, alt;
    if (service === "mercari") {
      icon = mercariIcon;
      alt = "mercari icon";
    } else if (service === "rakuma") {
      icon = rakumaIcon;
      alt = "rakuma icon";
    } else {
      icon = paypayIcon;
      alt = "paypay icon";
    }

    return <Avatar alt={alt} src={icon} />;
  };

  return (
    <Card className={classes.root}>
      <a
        className={classes.link}
        href={detail}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardHeader
          className={classes.header}
          avatar={setIcon(platform)}
          title={title}
        />
        <CardMedia className={classes.media} image={image} title={title} />
        <div className={classes.priceLabel}>¥{moldPrice()}</div>
        {/* <CardContent className={classes.content}>
          <Typography
            className={classes.typography}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            ¥{moldPrice()}
          </Typography>
        </CardContent> */}
      </a>
    </Card>
  );
};

export default Item;
