import React, { memo } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToggleButton from '@material-ui/lab/ToggleButton';
import mercariIcon from '../../images/mercari-icon.png';
import rakumaIcon from '../../images/rakuma-icon.png';
import paypayIcon from '../../images/paypay-icon.png';
import itemStyles from '../../style/item';

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

const setIcon = (service) => {
  let icon;
  let alt;
  if (service === 'mercari') {
    icon = mercariIcon;
    alt = 'mercari icon';
  } else if (service === 'rakuma') {
    icon = rakumaIcon;
    alt = 'rakuma icon';
  } else {
    icon = paypayIcon;
    alt = 'paypay icon';
  }

  return <Avatar alt={alt} src={icon} />;
};

const Item = ({ item, isFavorite, handleFavorite, empty }) => {
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
  } = itemStyles();

  if (empty) return <Card className={clsx(root, emptyBox)} />;

  const { title, price, imageUrl, detailUrl, platform } = item;

  return (
    <Card className={root}>
      <CardHeader className={header} avatar={setIcon(platform)} title={title} />
      <div className={fav}>
        <ToggleButton
          className={favButton}
          value={{ ...item, isFavorite: !isFavorite }}
          selected={isFavorite}
          onClick={handleFavorite}
        >
          <FavoriteIcon
            className={favIcon}
            style={{
              color: isFavorite ? '#F2105A' : '#E795B0',
            }}
          />
        </ToggleButton>
      </div>
      <a
        className={link}
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia className={media} image={imageUrl} title={title} />
        <div className={priceBox}>
          <div className={priceLabel}>¥{price.str}</div>
        </div>
      </a>
    </Card>
  );
};

export default memo(Item);
