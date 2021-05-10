/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import VirtualizedList from "../organisms/VirtualizedList";
import Form from "../organisms/Form";
import FormData from "../../constants/FormData";
import {
  requestSearch,
  changeItemType,
  addFavoriteItem,
  deleteFavoriteItem,
} from "../../actions";
import topStyles from "../../style/top";

const useReferredState = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const reference = useRef(state);

  const setReferredState = (value) => {
    reference.current = value;
    setState(value);
  };

  return [reference, setReferredState];
};

const useTop = () => {
  const { common, loading, loadingText } = topStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useReferredState(1);
  const [formValues, setFormValues] = useReferredState(null);

  // Reduxはデフォルトで値の比較を「===」で行う
  // 以下の2つはプリミティブ型の値を参照するため問題なく比較できる
  const isLoading = useSelector((state) => state.state.isLoading);

  // タブが切り替わる度に取得する値は替わる（all or favorite）
  // そのため、Topが再レンダリングされる
  const selectedTab = useSelector((state) => state.state.selectedTab);

  // 以下の2つはオブジェクト型（Object, Array）の値を参照する
  // そのため「===」ではなくshallowEqualを利用し、異なるオブジェクトであっても適切に比較できる

  // 各オブジェクトの isFavorite が変更された場合、
  // 変更を検知するため、Topが再レンダリングされる
  const itemObj = useSelector((state) => state.search.byId, shallowEqual);
  const favObj = useSelector((state) => state.like.byId, shallowEqual);

  // 検索が実行される度に、itemIdsの値は変わる(favIdsの値は更新されない)
  // そのため、Topが再レンダリングされる
  const itemIds = useSelector((state) => state.search.allIds, shallowEqual);

  // Likes ボタンがタップされる度に、favIdsの値は変わる
  // そのため、Topが再レンダリングされる
  const favIds = useSelector((state) => state.like.allIds, shallowEqual);

  // const allItems = useMemo(() => {
  //   console.log("AllItems is calculated.");
  //   return itemIds.map((id) => {
  //     return itemObj[id];
  //   });
  // }, [itemIds, favIds]);

  // const favoriteItems = useMemo(() => {
  //   console.log("FavoriteItems is calculated.");
  //   return favIds.map((id) => {
  //     return itemObj[id];
  //   });
  // }, [favIds]);

  const _getItemsByType = () => {
    console.log("_getItemsByType");
    if (selectedTab === "all") {
      return { byId: itemObj, allIds: itemIds };
    }
    if (selectedTab === "favorites") {
      return { byId: favObj, allIds: favIds };
    }
    return {};
  };

  const handleCategoryChange = (event, newValue) => {
    console.log("tab value", newValue);
    dispatch(changeItemType(newValue));
  };

  const handleFavorite = useCallback((event, value) => {
    // console.log("handleFavorite", value);
    if (value.isFavorite) {
      dispatch(addFavoriteItem(value));
    } else {
      dispatch(deleteFavoriteItem(value));
    }
  }, []);

  const handleFormValues = useCallback((value) => {
    console.log("value", value);
    setFormValues(value);
  }, []);

  const handleAdditionalSearch = useCallback((event, value) => {
    console.log("formValues", formValues);
    console.log("value", value);
    setPage(value);

    const newValue = { ...formValues.current, page: value };
    console.log("newValue", newValue);

    setFormValues(newValue);
    dispatch(requestSearch(FormData.SEARCH, newValue));
  }, []);

  const _renderItems = () => {
    const item = _getItemsByType();
    // console.log("renderItems", itemObj);

    if (!Object.keys(item).length) return [];

    // タブが切り替わる度に itemObj, itemIds として渡すpropsの値は変わる
    // そのため、VirtualizedList は再レンダリングされる
    return (
      <VirtualizedList
        itemObj={item.byId}
        itemIds={item.allIds}
        handleFavorite={handleFavorite}
      />
    );
  };

  const setContent = () => {
    console.log("setContent");

    if (isLoading) {
      return (
        <div className={loading}>
          <CircularProgress color="secondary" />
          <span className={clsx(loadingText, common)}>
            ただいま検索しています...
          </span>
        </div>
      );
    }

    if (!isLoading && !itemIds.length) {
      // if (!isLoading) {
      return (
        <div className={loading}>
          <span className={clsx(loadingText, common)}>
            検索結果はありません。
          </span>
        </div>
      );
    }

    return _renderItems();
  };

  return {
    page,
    formValues,
    selectedTab,
    handleCategoryChange,
    handleFormValues,
    handleAdditionalSearch,
    setContent,
  };
};

const Top = () => {
  const {
    page,
    selectedTab,
    handleCategoryChange,
    handleFormValues,
    handleAdditionalSearch,
    setContent,
  } = useTop();
  const {
    common,
    wrapper,
    main,
    serviceName,
    title,
    siteDescription,
    formContainer,
    sectionTitle,
    sectionDescription,
    resultContainer,
    resultHeader,
    result,
    itemTypeSelect,
    tabs,
    tab,
    pagination,
  } = topStyles();

  console.log("Top is rendered.");

  return (
    <>
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              <span className={title}>フリマサイト検索</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              複数のフリマサイトを一括検索し、商品を比較することができます。
            </p>
          </div>
          <div className={formContainer}>
            <h2 className={clsx(sectionTitle, common)}>検索フォーム</h2>
            <p className={clsx(sectionDescription, common)}>
              メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションにより、精度の高い検索が可能です。
            </p>
            <Form form={FormData.SEARCH} handleFormValues={handleFormValues} />
          </div>
        </div>
        <div className={resultContainer}>
          <div className={clsx(main, result)}>
            <div id="result" className={resultHeader}>
              <h2 className={clsx(sectionTitle, common)}>あなたの検索結果</h2>
              <p className={clsx(sectionDescription, common)}>
                気に入った商品をクリックして、各フリマサイトですぐに購入できます。
              </p>
              <Box
                className={itemTypeSelect}
                sx={{ width: "100%", bgcolor: "background.paper" }}
              >
                <Tabs
                  className={tabs}
                  value={selectedTab}
                  onChange={handleCategoryChange}
                  variant="scrollable"
                  scrollButtons="on"
                  aria-label="scrollable force tabs example"
                >
                  <Tab className={tab} label="すべて" value="all" />
                  <Tab className={tab} label="お気に入り" value="favorites" />
                </Tabs>
                {selectedTab === "all" && (
                  <Pagination
                    className={pagination}
                    count={10}
                    size="large"
                    shape="rounded"
                    page={page.current}
                    onChange={handleAdditionalSearch}
                  />
                )}
              </Box>
            </div>
          </div>
          <div>
            <div>{setContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Top);
