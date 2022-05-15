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
import yahooAuctionIcon from '../../images/yahoo-auction-icon.png';
import amazonIcon from '../../images/amazon-icon.png';
import rakutenIcon from '../../images/rakuten-icon.png';
import yahooShoppingIcon from '../../images/yahoo-shopping-icon.png';
import itemCss from '../../style/item';

const useItem = () => {
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
    } else if (service === 'paypay') {
      icon = paypayIcon;
      alt = 'paypay icon';
    } else if (service === 'yahoo-auction') {
      icon = yahooAuctionIcon;
      alt = 'yahoo-auction icon';
    } else if (service === 'amazon') {
      icon = amazonIcon;
      alt = 'amazon icon';
    } else if (service === 'rakuten') {
      icon = rakutenIcon;
      alt = 'rakuten icon';
    } else if (service === 'yahoo-shopping') {
      icon = yahooShoppingIcon;
      alt = 'yahoo-shopping icon';
    }

    return <Avatar alt={alt} src={icon} />;
  };

  return { setIcon };
};

const Item = ({ item, isFavorite, handleFavorite, empty }) => {
  const {
    root,
    emptyBox,
    header,
    imageContainer,
    favButton,
    favIcon,
    link,
    media,
    priceBox,
    priceLabel,
  } = itemCss();
  const { setIcon } = useItem();

  if (empty) return <Card className={clsx(root, emptyBox)} />;
  const { title, price, imageUrl, detailUrl, platform } = item;

  return (
    <Card className={root}>
      <CardHeader className={header} avatar={setIcon(platform)} title={title} />
      <div className={imageContainer}>
        {handleFavorite && (
          <ToggleButton
            className={favButton}
            value={{ ...item, isFavorite: !isFavorite }}
            selected={isFavorite}
            onClick={handleFavorite}
          >
            <FavoriteIcon
              className={favIcon}
              style={{
                color: isFavorite
                  ? 'rgb(242, 16, 90, 0.8)'
                  : 'rgb(231, 149, 176, 0.7)',
              }}
            />
          </ToggleButton>
        )}
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
      </div>
    </Card>
  );
};

export default memo(Item);
