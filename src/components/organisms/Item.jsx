import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: "35px",
    marginLeft: "35px",
    display: "inline-block",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: "5px",
  },
  content: {
    paddingBottom: 0,
  },
  typo: {
    fontSize: "17px",
    textAlign: "center",
  },
}));

const Item = (props) => {
  const classes = useStyles();
  const { title, price, image, detail, platform } = props;

  return (
    <a href={detail} target="_blank" rel="noopener noreferrer">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {platform}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title="Paella dish"
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.typo}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            ¥{price}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};

export default Item;
