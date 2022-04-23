import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector, startSubmit, change } from 'redux-form';
import clsx from 'clsx';
import { Box, Tabs, Tab, CircularProgress } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import VirtualizedList from '../organisms/VirtualizedList';
import Form from '../organisms/Form';
import SearchHead from '../organisms/SearchHead';
import formData from '../../constants/formData';
import {
  requestNextSearch,
  changeItemType,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../../actions';
import baseCss from '../../style/base';
import searchCss from '../../style/search';
import formCss from '../../style/form';
import { scrollWindow, showAboutService } from '../../utils';

const useSearch = () => {
  const { common, loading, loadingText, errorText } = baseCss();

  const getPage = (state) => {
    const selector = formValueSelector(formData.search.name);
    return selector(state, 'page') || 1;
  };

  const dispatch = useDispatch();

  // Reduxはデフォルトで値の比較を「===」で行う
  // 以下の2つはプリミティブ型の値を参照するため問題なく比較できる
  const page = useSelector((state) => getPage(state));
  const pagers = useSelector((state) => state.search.pages);
  const isLoading = useSelector((state) => state.state.isLoading);

  // タブが切り替わる度に取得する値は替わる（all or favorite）
  // そのため、Topが再レンダリングされる
  const selectedTab = useSelector((state) => state.state.selectedTab);
  const statusCode = useSelector((state) => state.error.status);
  const errorMessage = useSelector((state) => state.error.message);

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

  scrollWindow();

  const getItemsByType = () => {
    if (selectedTab === 'all') {
      return { byId: itemObj, allIds: itemIds };
    }
    return { byId: favObj, allIds: favIds };
  };

  const handleCategoryChange = (event, newValue) => {
    dispatch(changeItemType(newValue));
  };

  const handleFavorite = useCallback((event, value) => {
    if (value.isFavorite) {
      dispatch(addFavoriteItem(value));
    } else {
      dispatch(deleteFavoriteItem(value));
    }
  }, []);

  const scrollToResultTop = () => {
    window.location.href = '#result';
  };

  const handleNextSearch = useCallback((event, value) => {
    scrollToResultTop();
    startSubmit(formData.search.name);
    dispatch(change(formData.search.name, 'type', 'next'));
    dispatch(change(formData.search.name, 'page', value));
    dispatch(requestNextSearch());
  }, []);

  const renderItems = () => {
    const { byId, allIds } = getItemsByType();
    if (!allIds.length) return [];

    // タブが切り替わる度に itemObj, itemIds として渡すpropsの値は変わる
    // そのため、VirtualizedList は再レンダリングされる
    return (
      <VirtualizedList
        itemObj={byId}
        itemIds={allIds}
        handleFavorite={handleFavorite}
      />
    );
  };

  const setContent = () => {
    if (statusCode && errorMessage) {
      return (
        <div className={loading}>
          <ErrorOutlineIcon color="secondary" fontSize="large" />
          <span className={clsx(errorText, common)}>
            {statusCode} {errorMessage}
          </span>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={loading}>
          <CircularProgress color="secondary" />
          <span className={clsx(loadingText, common)}>検索しています...</span>
        </div>
      );
    }

    if (!isLoading && !itemIds.length) {
      return (
        <div className={loading}>
          <span className={clsx(loadingText, common)}>
            検索結果はありません。
          </span>
        </div>
      );
    }
    return renderItems();
  };

  return {
    page,
    pagers,
    selectedTab,
    handleCategoryChange,
    handleNextSearch,
    setContent,
  };
};

const Search = () => {
  const {
    page,
    pagers,
    selectedTab,
    handleCategoryChange,
    handleNextSearch,
    setContent,
  } = useSearch();
  const {
    common,
    wrapper,
    container,
    main,
    serviceName,
    title,
    siteDescription,
    searchContainer,
    sectionTitle,
    sectionDescription,
    sectionToolLink,
    toolLink,
    aboutContainer,
    aboutSection,
    aboutTitle,
    aboutDescription,
    aboutListItem,
    aboutButton,
    resultContainer,
    result,
    scrollUpBtn,
  } = baseCss();
  const { itemTypeSelect, tabs, tab, paginationContainer, pagination } =
    searchCss();
  const { formContainer } = formCss();

  return (
    <>
      <SearchHead />
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              <span className={title}>フリマサイト検索</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              主要なフリマサイトを一括検索
            </p>
          </div>
          <div id="search" className={container}>
            <h2 className={clsx(sectionTitle, common)}>フリマサイト検索</h2>
            <p className={clsx(sectionDescription, common)}>
              豊富なオプションで、精度の高いサイト検索ができます。
            </p>
            <div className={searchContainer}>
              <div className={formContainer}>
                <Form />
              </div>
              <div style={{ paddingTop: '.3rem' }} className={resultContainer}>
                <div id="result" className={clsx(main, result)}>
                  <Box
                    className={itemTypeSelect}
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                  >
                    <Tabs
                      className={tabs}
                      value={selectedTab}
                      onChange={handleCategoryChange}
                      // variant="scrollable"
                      // scrollButtons="on"
                      aria-label="Item type tabs"
                    >
                      <Tab className={tab} label="すべて" value="all" />
                      <Tab
                        className={tab}
                        label="お気に入り"
                        value="favorites"
                      />
                    </Tabs>
                  </Box>
                </div>
                {setContent()}
                {selectedTab === 'all' && pagers > 1 && (
                  <div className={paginationContainer}>
                    <Pagination
                      className={pagination}
                      count={pagers}
                      size="large"
                      shape="rounded"
                      page={page}
                      onChange={handleNextSearch}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            id="about-service-container"
            className={clsx(container, aboutContainer)}
          >
            <h2 className={clsx(sectionTitle, common)}>markets.jpとは？</h2>
            <p className={clsx(sectionDescription, common)}>
              このサービスについてご説明します。
            </p>
            <div id="about-service-content" className={aboutSection}>
              <h3 className={clsx(aboutTitle, common)}>概要</h3>
              <p className={clsx(aboutDescription, common)}>
                フリマサイトを一括検索するサービスです。
                各サイトの商品がまとめて表示され、手軽に比較できます。
                またアイテムをタップすると、詳細情報の確認や購入ができます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>検索の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスの検索内容は、全て各フリマサイトに基づいています。
                ただし、キーワードや各サイトの検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                その場合は、以下のオプションを利用して、検索の精度を高めることができます。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>機能の説明</h3>
              <p className={clsx(aboutDescription, common)}>
                精度の高い検索を行う上で便利な機能です。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  除外ワード
                  <ul>
                    <li>
                      検索結果から除外するキーワードを入力します。
                      スペースを空けて、複数指定もできます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  検索範囲
                  <ul>
                    <li>
                      「商品名」を選択した場合、全てのキーワードを商品名に含むものが対象になります。
                      関連性の低いものを除外することで、精度の高いデータを取得できます。
                      ただし、取得できるデータ数が絞られることがありますので、ご了承ください。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  配送料の負担
                  <ul>
                    <li>
                      PayPayフリマは基本的に配送無料のため、「購入者」を選択した場合は検索対象から除外されます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  お気に入り
                  <ul>
                    <li>
                      アイテムのハートアイコンをタップして、お気に入りに含めることができます。
                      お気に入りリストは「フリマサイトの検索結果」から確認できます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  ページ選択
                  <ul>
                    <li>
                      デフォルトでは、各フリマサイトの1ページ目の内容を表示します。
                      2ページ目以降を見る場合は、「フリマサイトの検索結果」からページを指定できます。
                      必ず検索フォームの「キーワード」と「フリマサイト」を指定してください。
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>免責事項</h3>
              <p className={clsx(aboutDescription, common)}>
                markets.jpのご利用に伴うトラブルや損害に関して、当方は一切の責任を負いかねます。
                価格の比較や商品の購入などについては、個人の判断でお願い致します。
              </p>
            </div>
            <span
              className={clsx(aboutButton, common)}
              onClick={showAboutService}
            >
              + 続きを読む
            </span>
          </div>
          <div className={container}>
            <h2 className={clsx(sectionTitle, common)}>フリマサイト分析</h2>
            <p className={clsx(sectionToolLink, common)}>
              フリマサイトの相場や人気価格を算出するサービスです。
              <a className={toolLink} href="/analyze">
                フリマサイト分析・比較
              </a>
              はこちら。
            </p>
          </div>
        </div>
      </div>
      <div id="page_top" className={scrollUpBtn}>
        <a href="#search" />
      </div>
      <Footer />
    </>
  );
};

export default memo(Search);
