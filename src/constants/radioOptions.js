const radioOptionsObject = {
  platform: [
    { label: 'メルカリ', value: 'mercari' },
    { label: 'ラクマ', value: 'rakuma' },
    { label: 'PayPayフリマ', value: 'paypay' },
    { label: 'ヤフオク', value: 'yahoo-auction' },
    { label: 'Amazon', value: 'amazon' },
    { label: '楽天', value: 'rakuten' },
    { label: 'Yahooショッピング', value: 'yahoo-shopping' },
  ],
  searchTarget: [
    { label: '現在の市場', value: 'selling' },
    { label: '過去の販売データ', value: 'soldout' },
  ],
  searchRange: [
    { label: '商品名', value: 'title' },
    { label: '商品名 + 説明文', value: 'title-desc' },
  ],
  priceType: [
    { label: '相場価格', value: 'market' },
    { label: 'いいねが多い価格', value: 'popular' },
  ],
  salesStatus: [
    { label: 'すべて', value: 'all' },
    { label: '販売中', value: 'selling' },
    { label: '売り切れ', value: 'soldout' },
  ],
  deliveryCost: [
    { label: 'すべて', value: 'all' },
    { label: '無料', value: 'free' },
  ],
  sortOrder: [
    { label: '安い順', value: 'asc' },
    { label: '高い順', value: 'desc' },
  ],
};

export default radioOptionsObject;
