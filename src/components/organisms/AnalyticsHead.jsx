import React from 'react';
import { Helmet } from 'react-helmet';

const AnalyticsHead = () => {
  return (
    <Helmet>
      <title>フリマサイト比較｜markets.jpでフリマ分析・比較</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta
        name="description"
        content="フリマサイトの相場や人気価格を分析・比較。現在の市場や過去の販売データを元にした、精度の高いフリマサイト比較が可能に。メルカリ、ラクマ、PayPayフリマ対応。商品の購入・出品時のサイト比較にお使いいただけます。"
      />
      <meta content="https://www.markets-jp.com/analyze" property="og:url" />
      <meta content="article" property="og:type" />
      <meta content="フリマ分析・比較サービス" property="og:title" />
      <meta
        content="フリマサイトの相場や人気価格をワンクリックで分析・比較。現在の市場や過去の販売データを元にした、精度の高いサイト比較が可能に。メルカリ、ラクマ、PayPayフリマに対応。"
        property="og:description"
      />
      <meta content="markets.jp" property="og:site_name" />
      <meta content="./markets-logo.png" property="og:image" />
    </Helmet>
  );
};

export default AnalyticsHead;
