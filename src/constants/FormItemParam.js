/**
 * プラットフォーム
 */
const mercari = {
  label: "メルカリ",
  value: "mercari",
};

const rakuten = {
  label: "ラクマ",
  value: "rakuten",
};

const PlatformParam = {
  nameAttr: "platform",
  label: "プラットフォーム",
  items: [mercari, rakuten],
};

/**
 * 検索結果の表示件数
 */
const result_num1 = {
  label: "10件",
  value: "10",
};

const result_num2 = {
  label: "30件",
  value: "30",
};

const result_num3 = {
  label: "50件",
  value: "50",
};

const ResultNumParam = {
  nameAttr: "resultNum",
  label: "検索結果の表示件数",
  items: [result_num1, result_num2, result_num3],
};

/**
 * 検索結果のソート項目
 */
const price = {
  label: "値段",
  value: "price",
};

const title = {
  label: "商品名",
  value: "title",
};

const platform = {
  label: "プラットフォーム",
  value: "platform",
};

const SortIndexParam = {
  nameAttr: "sortIndex",
  label: "検索結果のソート項目",
  items: [price, title, platform],
};

/**
 * 検索結果のソート順
 */
const ascend = {
  label: "昇順",
  value: "ASC",
};

const descend = {
  label: "降順",
  value: "DESC",
};

const SortOrderParam = {
  nameAttr: "sortOrder",
  label: "検索結果のソート順",
  items: [ascend, descend],
};

const FormItemParam = {
  PLATFORM: PlatformParam,
  RESULT_NUM: ResultNumParam,
  SORT_INDEX: SortIndexParam,
  SORT_ORDER: SortOrderParam,
};

export default FormItemParam;
