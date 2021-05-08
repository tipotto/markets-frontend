/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import mercariIcon from "../../images/mercari-icon.png";
import rakumaIcon from "../../images/rakuma-icon.png";
import paypayIcon from "../../images/paypay-icon.png";
// import { addFavoriteItem, deleteFavoriteItem } from "../../actions";
import itemStyles from "../../style/item";

// const moldTitle = () => {
//   const MAX_LENGTH = 18;
//   if (!title) return "";
//   if (title.length <= MAX_LENGTH) return title;
//   return `${title.substr(0, MAX_LENGTH)}...`;
// };

// TODO: フロントエンドよりも、バックエンドで処理した方が良さそう
// const moldPrice = (price) => {
//   return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// };

// TODO: フロントエンドよりも、バックエンドで処理した方が良さそう
const setIcon = (service) => {
  let icon;
  let alt;
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

const Item = ({ item, isFavorite, handleFavorite, empty }) => {
  console.log("Item");
  const {
    root,
    emptyBox,
    header,
    fav,
    favButton,
    favIcon,
    link,
    media,
    priceBox,
    priceLabel,
    // deleteButton,
    // deleteIcon,
  } = itemStyles();

  if (empty) return <Card className={clsx(root, emptyBox)} />;

  const openNewTab = (e) => {
    // console.log("target", e.target);
    // console.log("currentTarget", e.currentTarget);
    const detailUrl = e.currentTarget.getAttribute("value");
    console.log("detailUrl", detailUrl);

    const newWindow = window.open(detailUrl, "_blank");
    newWindow.onload = () => {
      const body = newWindow.document.querySelector("body");
      body.replaceWith("<h1>Unkooooooooooooooooo</h1>");
    };

    // newWindow.addEventListener(
    //   "load",
    //   () => {
    //     const body = newWindow.document.querySelector("body");
    //     body.replaceWith("<h1>Unkooooooooooooooooo</h1>");
    //     // newWindow.document.title = "Unkooooooooo";
    //   },
    //   false
    // );
  };

  const { id, title, price, imageUrl, detailUrl, platform } = item;
  return (
    <Card className={root}>
      <CardHeader className={header} avatar={setIcon(platform)} title={title} />
      <div className={fav}>
        <ToggleButton
          className={favButton}
          value={{
            id,
            title,
            price,
            imageUrl,
            detailUrl,
            platform,
            isFavorite: !isFavorite,
          }}
          selected={isFavorite}
          onClick={handleFavorite}
        >
          <FavoriteIcon
            className={favIcon}
            style={{
              color: isFavorite ? "#F2105A" : "#E795B0",
            }}
          />
        </ToggleButton>
      </div>
      <div onClick={openNewTab} className={link} value={detailUrl}>
        <CardMedia className={media} image={imageUrl} title={title} />
        <div className={priceBox}>
          <div className={priceLabel}>¥{price.str}</div>
        </div>
      </div>
      {/* <a
        className={link}
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia className={media} image={imageUrl} title={title} />
        <div className={priceBox}>
          <div className={priceLabel}>¥{price.str}</div>
        </div>
      </a> */}
    </Card>
    // <Card className={root}>
    //   <CardHeader className={header} avatar={setIcon(platform)} title={title} />
    //   <div className={fav}>
    //     <ToggleButton
    //       className={selectedTab === "all" ? favButton : deleteButton}
    //       value={selectedTab === "all" ? !isFavorite : false}
    //       selected={isFavorite}
    //       onChange={handleChange}
    //     >
    //       {selectedTab === "all" && (
    //         <FavoriteIcon
    //           className={favIcon}
    //           style={{
    //             color: isFavorite ? "#F2105A" : "#E795B0",
    //           }}
    //         />
    //       )}
    //       {selectedTab === "favorites" && (
    //         <DeleteOutlinedIcon className={deleteIcon} color="secondary" />
    //       )}
    //     </ToggleButton>
    //   </div>
    //   <a
    //     className={link}
    //     href={detailUrl}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     <CardMedia className={media} image={imageUrl} title={title} />
    //     <div className={priceBox}>
    //       <div className={priceLabel}>¥{moldPrice(price)}</div>
    //     </div>
    //   </a>
    // </Card>
    //   {/* <CardContent className={content}>
    //       <Typography
    //         className={typography}
    //         variant="body2"
    //         color="textSecondary"
    //         component="p"
    //       >
    //         ¥{moldPrice()}
    //       </Typography>
    //     </CardContent> */}
    // </Card>
  );
};

export default memo(Item);
