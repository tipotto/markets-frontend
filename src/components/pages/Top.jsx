import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector, startSubmit, change } from 'redux-form';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import VirtualizedList from '../organisms/VirtualizedList';
import Form from '../organisms/Form';
import FormData from '../../constants/FormData';
import {
  requestAdditionalSearch,
  changeItemType,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../../actions';
import topStyles from '../../style/top';

const getPage = (state) => {
  const selector = formValueSelector(FormData.name);
  const page = selector(state, 'page');
  return page || 1;
};

const useTop = () => {
  const { common, loading, loadingText, errorText } = topStyles();
  const dispatch = useDispatch();

  // Reduxはデフォルトで値の比較を「===」で行う
  // 以下の2つはプリミティブ型の値を参照するため問題なく比較できる
  const page = useSelector((state) => getPage(state));

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

  const _getItemsByType = () => {
    // console.log('_getItemsByType');
    if (selectedTab === 'all') {
      return { byId: itemObj, allIds: itemIds };
    }
    return { byId: favObj, allIds: favIds };
  };

  const handleCategoryChange = (event, newValue) => {
    // console.log('tab value', newValue);
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

  const handleAdditionalSearch = useCallback((event, value) => {
    // console.log("value", value);
    startSubmit(FormData.name);
    dispatch(change(FormData.name, 'page', value));
    dispatch(requestAdditionalSearch());
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
    // console.log('setContent');

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
    selectedTab,
    handleCategoryChange,
    handleAdditionalSearch,
    setContent,
  };
};

const showAboutService = (event) => {
  const button = event.target;

  const showText = $(button)
    .parent('#about-service-container')
    .find('#about-service-content');

  const smallHeight = 150; // This is initial height.
  const originalHeight = showText.css({ height: 'auto' }).height();

  if (showText.hasClass('open')) {
    /* CLOSE*/
    showText.height(originalHeight).animate({ height: smallHeight }, 300);
    showText.removeClass('open');
    $(button).text('+ 続きを読む').removeClass('active');
  } else {
    /* OPEN*/
    showText
      .height(smallHeight)
      .animate({ height: originalHeight }, 300, () => {
        showText.height('auto');
      });
    showText.addClass('open');
    $(button).text('- 閉じる').addClass('active');
  }
};

const Top = () => {
  const {
    page,
    selectedTab,
    handleCategoryChange,
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
    aboutContainer,
    aboutSection,
    aboutTitle,
    aboutDescription,
    aboutButton,
    resultContainer,
    resultHeader,
    result,
    itemTypeSelect,
    tabs,
    tab,
    pagination,
  } = topStyles();

  // console.log('Top is rendered.');

  return (
    <>
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              <span className={title}>フリマサイト検索・比較</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              複数のフリマサイトを一括検索し、アイテムを比較できるサービス
            </p>
          </div>
          <div id="about-service-container" className={aboutContainer}>
            <h2 className={clsx(sectionTitle, common)}>markets.jpとは？</h2>
            <p className={clsx(sectionDescription, common)}>
              このサービスについてご説明します。
            </p>
            <div id="about-service-content" className={aboutSection}>
              <h3 className={clsx(aboutTitle, common)}>サービス概要</h3>
              <p className={clsx(aboutDescription, common)}>
                markets.jpは、複数のフリマサイトを一括検索し、その結果を統合して表示するサービスです。
                フリマサイトの垣根を越えて、ご希望のアイテムを探したり、価格を比較することができます。
                また、検索結果をタップすることで、各サイトで出品アイテムの詳細情報を確認したり、購入することができます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>検索フォームについて</h3>
              <p className={clsx(aboutDescription, common)}>
                キーワードとフリマサイトは必ず指定してください。
                また、検索オプションの「配送料の負担」で「購入者」を選択した場合、PayPayフリマは検索対象から除外されます（PayPayフリマは配送料無料のため）。
              </p>

              <h3 className={clsx(aboutTitle, common)}>
                ハートアイコンについて
              </h3>
              <p className={clsx(aboutDescription, common)}>
                検索結果の各アイテムにはハートアイコンが表示されます。そのアイコンをタップして、お気に入りに含めることができます。
                お気に入りリストは「フリマサイトの検索結果」から確認できます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>
                ページネーションについて
              </h3>
              <p className={clsx(aboutDescription, common)}>
                フォームを送信すると、入力されたキーワードで検索を行い、各フリマサイトの1ページ目の出品アイテムを統合して表示します。
                2ページ目以降の結果を閲覧したい場合は、「フリマサイトの検索結果」のページネーションをご利用ください。
                検索結果として表示するページを自由に指定することができます（最大5ページまで）。
                ページネーションを利用する場合は、必ず検索フォームに「キーワード」と「フリマサイト」を指定してください。
              </p>
            </div>
            <span
              className={clsx(aboutButton, common)}
              onClick={showAboutService}
            >
              + 続きを読む
            </span>
          </div>
          <div className={formContainer}>
            <h2 className={clsx(sectionTitle, common)}>検索フォーム</h2>
            <p className={clsx(sectionDescription, common)}>
              メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションで、高精度のサイト検索・比較が可能です。
            </p>
            <Form />
          </div>
        </div>
        <div className={resultContainer}>
          <div className={clsx(main, result)}>
            <div id="result" className={resultHeader}>
              <h2 className={clsx(sectionTitle, common)}>
                フリマサイトの検索結果
              </h2>
              <p className={clsx(sectionDescription, common)}>
                価格を比較して、気に入ったアイテムは各サイトで購入できます。
              </p>
              <Box
                className={itemTypeSelect}
                sx={{ width: '100%', bgcolor: 'background.paper' }}
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
                {selectedTab === 'all' && (
                  <Pagination
                    className={pagination}
                    count={5}
                    size="large"
                    shape="rounded"
                    page={page}
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
