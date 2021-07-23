import React from 'react';
import { Helmet } from 'react-helmet';

const AnalyticsHead = () => {
  return (
    <Helmet>
      <title>フリマ検索｜markets.jpでフリマ一括検索</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta
        name="description"
        content="フリマサイトを一括検索し、価格を簡単に比較。詳細な検索オプションで、メルカリ、ラクマ、PayPayフリマに対応。フリマサイトを1つずつ検索しなくても、ワンクリックで一括検索できるため、必ずお手頃な商品が見つかります。"
      />
      <meta content="https://www.markets-jp.com/" property="og:url" />
      <meta content="website" property="og:type" />
      <meta content="検索ツール" property="og:title" />
      <meta
        content="ワンクリックでフリマサイトを一括検索し、欲しいアイテムをかんたん比較。メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションにより、精度の高い検索が可能です。"
        property="og:description"
      />
      <meta content="markets.jp" property="og:site_name" />
      <meta content="./markets-logo.png" property="og:image" />
    </Helmet>
  );
};

export default AnalyticsHead;
