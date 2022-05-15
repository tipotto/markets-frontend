import React from 'react';
import { Helmet } from 'react-helmet';

const AnalyticsHead = () => (
  <Helmet>
    <title>フリマサイト比較｜フリマのmarkets.jp</title>
    <meta
      name="description"
      content="フリマサイトの相場や人気価格の分析ツール。現在の市場や過去の販売履歴に基づく、精度の高いフリマ比較ができます。豊富な検索オプションで、メルカリ、ラクマ、PayPayフリマに対応。商品の購入や出品時のサイト比較に便利です。"
    />
    <meta content="https://www.markets-jp.com/analyze" property="og:url" />
    <meta content="article" property="og:type" />
    <meta content="フリマ分析・比較サービス" property="og:title" />
    <meta
      content="フリマサイトの相場をワンクリックで分析・比較。現在の市場や過去の販売データを元にした、精度の高いサイト比較が可能に。メルカリ、ラクマ、PayPayフリマに対応。"
      property="og:description"
    />
  </Helmet>
);

export default AnalyticsHead;
