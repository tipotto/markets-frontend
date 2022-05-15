import React from 'react';
import { Helmet } from 'react-helmet';

const TopHead = () => (
  <Helmet>
    <title>フリマサイト検索・比較｜フリマのmarkets.jp</title>
    <meta
      name="description"
      content="フリマサイトを一括検索して価格を比較したり、現在の市場や過去の販売データをもとに、相場や人気価格を分析できるサービス。メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションにより、精度の高いデータをご提供。"
    />
    <meta content="https://www.markets-jp.com/" property="og:url" />
    <meta content="website" property="og:type" />
    <meta content="フリマ検索・分析サービス" property="og:title" />
    <meta
      content="フリマサイトを一括検索して価格を比較したり、現在の市場や過去の販売データをもとに、相場や人気価格を分析。検索オプションも豊富で、メルカリ、ラクマ、PayPayフリマに対応。"
      property="og:description"
    />
  </Helmet>
);

export default TopHead;
