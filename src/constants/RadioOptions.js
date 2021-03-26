const radioOptionsObject = {
  salesStatus: [
    { label: "すべて", value: "all" },
    { label: "販売中", value: "selling" },
    { label: "売り切れ", value: "soldout" },
  ],
  deliveryCost: [
    { label: "すべて", value: "all" },
    { label: "出品者・無料", value: "free" },
  ],
  sortOrder: [
    { label: "価格の安い順", value: "asc" },
    { label: "価格の高い順", value: "desc" },
  ],
};

export default radioOptionsObject;
