import React from 'react';
import { Helmet } from 'react-helmet';

const AnalyticsHead = () => (
  <Helmet>
    <title>フリマ検索｜フリマのmarkets.jp</title>
    <meta
      name="description"
      content="フリマサイトを一括検索し、まとめて価格を比較できます。豊富な検索オプションで、メルカリ、ラクマ、PayPayフリマに対応。複数のフリマサイトをワンクリックで比較でき、手軽にお得な商品が見つかります。"
    />
    <meta content="https://www.markets-jp.com/" property="og:url" />
    <meta content="website" property="og:type" />
    <meta content="フリマ一括検索サービス" property="og:title" />
    <meta
      content="ワンクリックでフリマサイトを一括検索し、欲しいアイテムをかんたん比較。メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションにより、精度の高い検索ができます。"
      property="og:description"
    />
  </Helmet>
);

export default AnalyticsHead;
