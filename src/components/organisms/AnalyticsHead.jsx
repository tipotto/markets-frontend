import React from 'react';
import { Helmet } from 'react-helmet';

const AnalyticsHead = () => {
  return (
    <Helmet>
      <title>テスト</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta name="description" content="テスト" />
      <meta content="https://www.markets-jp.com/analyze" property="og:url" />
      <meta content="website" property="og:type" />
      <meta content="分析ツール" property="og:title" />
      <meta content="テスト" property="og:description" />
      <meta content="markets.jp" property="og:site_name" />
      <meta content="./markets-logo.png" property="og:image" />
    </Helmet>
  );
};

export default AnalyticsHead;
