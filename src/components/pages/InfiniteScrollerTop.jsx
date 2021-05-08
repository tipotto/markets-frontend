import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroller";
import ScrollUpButton from "react-scroll-up-button";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import ItemList from "../organisms/ItemList";
import Form from "../organisms/Form";
import FormData from "../../constants/FormData";
import {
  requestSearch,
  loadItems,
  changeItemType,
  resetLoadedItems,
  addFavoriteItem,
  deleteFavoriteItem,
} from "../../actions";
import { LOAD_ITEM_NUMBER, spliceArray } from "../../actions/function";
import commonStyles from "../../style/common";
import topStyles from "../../style/top";

export const useReferredState = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const reference = useRef(state);

  const setReferredState = (value) => {
    reference.current = value;
    setState(value);
  };

  return [reference, setReferredState];
};

const useMain = () => {
  const { common, loading, loadingText } = topStyles();
  const dispatch = useDispatch();
  const [selectedPlatform, setSelectedPlatform] = useState("mercari");
  const [page, setPage] = useReferredState(1);
  const [formValues, setFormValues] = useReferredState(null);

  const loadedItems = useSelector((state) => state.search.items.all.loaded);
  const restItems = useSelector((state) => state.search.items.all.rest);
  const favoriteItems = useSelector((state) => state.search.items.favorites);
  const isLoading = useSelector((state) => state.state.isLoading);
  const selectedTab = useSelector((state) => state.search.selectedTab);

  const _loadMore = () => {
    console.log("_loadMore");
    if (selectedTab !== "all") return;

    const items = spliceArray(restItems);
    dispatch(loadItems(items));
  };

  const _getItemsByType = () => {
    if (selectedTab === "all") return loadedItems;
    if (selectedTab === "favorites") return favoriteItems;
    return [];
  };

  const handleCategoryChange = (event, newValue) => {
    console.log("tab value", newValue);
    dispatch(changeItemType(newValue));

    if (newValue === "all" && loadedItems.length > LOAD_ITEM_NUMBER) {
      const items = spliceArray([...loadedItems, ...restItems]);
      dispatch(resetLoadedItems(items));
    }
  };

  const handlePlatformChange = (event, platform) => {
    console.log("platform", platform);
    setSelectedPlatform(platform);
  };

  const handleFavorite = useCallback((event, value) => {
    console.log("handleFavorite", value);
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
    const items = _getItemsByType();
    console.log("renderItems", items);

    if (!items.length) return [];

    // itemのフィルターとレンダリング処理、それぞれをループするのではなく
    // forEachなどを使って1回のループにまとめた方が処理は速い？

    // アイテムカテゴリのタブを切り替えると、itemsとして入ってくる要素も変わるため
    // ItemListが再描画されると想定。
    // また、各ItemでisFavoriteが変更された場合、ItemListが再描画されるのはもちろん、
    //
    // しかし、各ItemのkeyはdetailUrlを使用しているためユニークであり、
    // 各keyとItem要素は1対1で関連づいているため、React側で適切にpropsの変更を検知してくれるはず。
    return <ItemList items={items} handleFavorite={handleFavorite} />;
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
    if (!isLoading && !loadedItems.length) {
      return (
        <div className={loading}>
          <span className={clsx(loadingText, common)}>
            検索結果はありません。
          </span>
        </div>
      );
    }
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={_loadMore}
        hasMore={selectedTab === "all" && restItems.length > 0}
        initialLoad={false}
        // threshold={0}
        // useWindow={false}
      >
        {_renderItems()}
      </InfiniteScroll>
    );
  };

  return {
    isLoading,
    page,
    formValues,
    loadedItems,
    restItems,
    selectedTab,
    selectedPlatform,
    // formData,
    handleCategoryChange,
    handlePlatformChange,
    handleFormValues,
    handleAdditionalSearch,
    setContent,
  };
};

const Main = (props) => {
  const rootElement = document.documentElement;
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  const {
    isLoading,
    page,
    formValues,
    loadedItems,
    restItems,
    selectedTab,
    selectedPlatform,
    // formData,
    handleCategoryChange,
    handlePlatformChange,
    handleFormValues,
    handleAdditionalSearch,
    setContent,
  } = useMain();
  // } = useMain(rootElement, scrollTotal);
  const { wrapper } = props.classes;
  const {
    common,
    main,
    serviceName,
    title,
    siteDescription,
    formContainer,
    sectionTitle,
    sectionDescription,
    resultContainer,
    box,
    itemTypeSelect,
    tabs,
    tab,
    pagination,
    selectBox,
    results,
    scrollUpBtn,
    showBtn,
    loading,
    loadingText,
    platformSelectGroup,
    platformSelectBtn,
  } = topStyles();

  console.log("Main");

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
          <div id="result" className={resultContainer}>
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
                // allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                // centered
              >
                <Tab className={tab} label="すべて" value="all" />
                <Tab className={tab} label="お気に入り" value="favorites" />
                {/* <Tab className={tab} label="人気アイテム" value="likes" /> */}
              </Tabs>
              {/* {selectedTab === "all" && formValues.current && ( */}
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
              {/* {selectedTab === "likes" && (
                <ToggleButtonGroup
                  className={platformSelectGroup}
                  exclusive
                  value={selectedPlatform}
                  onChange={handlePlatformChange}
                  aria-label="platform"
                >
                  {tabOptionsObject.platforms.map((platform) => (
                    <ToggleButton
                      className={platformSelectBtn}
                      key={platform.value}
                      value={platform.value}
                      aria-label={platform.value}
                    >
                      {platform.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )} */}
            </Box>
            <div className={results}>{setContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={1500}
        EasingType="easeOutCubic"
        AnimationDuration={1500}
        ContainerClassName={scrollUpBtn}
        TransitionClassName={showBtn}
      >
        <KeyboardArrowUpOutlinedIcon htmlColor="#fff" fontSize="large" />
      </ScrollUpButton>
    </>
  );
};

export default withStyles(commonStyles)(Main);
