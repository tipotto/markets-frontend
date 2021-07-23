import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector, startSubmit, change } from 'redux-form';
import { Link } from 'react-router-dom';
// import ScrollUpButton from 'react-scroll-up-button';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import VirtualizedList from '../organisms/VirtualizedList';
import Form from '../organisms/Form';
import TopHead from '../organisms/TopHead';
import formData from '../../constants/formData';
import {
  requestNextSearch,
  changeItemType,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../../actions';
import baseCss from '../../style/base';
import topCss from '../../style/top';

const getPage = (state) => {
  const selector = formValueSelector(formData.search.name);
  const page = selector(state, 'page');
  return page || 1;
};

const useTop = () => {
  const { common, loading, loadingText, errorText } = baseCss();
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

  const handleNextSearch = useCallback((event, value) => {
    // console.log("value", value);
    startSubmit(formData.search.name);
    dispatch(change(formData.search.name, 'type', 'next'));
    dispatch(change(formData.search.name, 'page', value));
    dispatch(requestNextSearch());
  }, []);

  const _renderItems = () => {
    const { byId, allIds } = _getItemsByType();
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
    pagers,
    selectedTab,
    handleCategoryChange,
    handleNextSearch,
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
    pagers,
    selectedTab,
    handleCategoryChange,
    handleNextSearch,
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
    toolLinkContainer,
    sectionTitle,
    sectionDescription,
    sectionToolLink,
    toolLink,
    aboutContainer,
    aboutSection,
    aboutTitle,
    aboutDescription,
    aboutButton,
    resultContainer,
    result,
    resultHeader,
    scrollUpBtn,
    showScrollUpBtn,
  } = baseCss();
  const { itemTypeSelect, tabs, tab, pagination } = topCss();
  // console.log('Top is rendered.');

  return (
    <>
      <TopHead />
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              <span className={title}>フリマ一括検索</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              フリマサイトを一括検索し、価格を比較できるサービス
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
                フリマサイトを一括検索するサービスです。
                各サイトの商品が価格順にまとめて表示されるため、ご希望の商品を簡単に比較できます。
                また、アイテムをタップすると、各サイトで詳細情報の確認や購入ができます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>一括検索の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスの検索内容は、全て各フリマサイトに基づいています。
                ただし、入力されたキーワードや各サイトが提供する検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                その場合は、以下のオプションを利用して、検索の精度を高めることができます。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>除外ワード</h3>
              <p className={clsx(aboutDescription, common)}>
                検索結果から除外するキーワードを入力します。
                スペースを空けて入力することで、複数指定もできます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>配送料の負担</h3>
              <p className={clsx(aboutDescription, common)}>
                PayPayフリマは基本的に配送無料のため、「購入者」を選択した場合は検索対象から除外されます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>お気に入り</h3>
              <p className={clsx(aboutDescription, common)}>
                各アイテムのハートアイコンをタップして、お気に入りに含めることができます。
                お気に入りリストは「フリマサイトの検索結果」から確認できます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>ページ選択</h3>
              <p className={clsx(aboutDescription, common)}>
                デフォルトでは、各フリマサイトの1ページ目の内容を表示します。
                2ページ目以降を見る場合は、「フリマサイトの検索結果」からページを指定できます。
                ページ選択を利用する場合は、必ず検索フォームの「キーワード」と「フリマサイト」を指定してください。
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
            <h2 className={clsx(sectionTitle, common)}>フリマ一括検索</h2>
            <p className={clsx(sectionDescription, common)}>
              メルカリ、ラクマ、PayPayフリマに対応。豊富なオプションで、精度の高い一括検索が可能です。
            </p>
            <Form />
          </div>
          <div className={toolLinkContainer}>
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト比較サービス
            </h2>
            <p className={clsx(sectionToolLink, common)}>
              相場や人気価格を算出し、フリマサイト比較に役立つ分析サービスは
              <Link className={toolLink} to="/analyze">
                こちら
              </Link>
              。
            </p>
          </div>
        </div>
        <div className={resultContainer}>
          <div className={clsx(main, result)}>
            <div id="result" className={resultHeader}>
              <h2 className={clsx(sectionTitle, common)}>
                フリマ一括検索の結果
              </h2>
              <p className={clsx(sectionDescription, common)}>
                気に入った商品は、各サイトで購入できます。
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
                {selectedTab === 'all' && pagers > 1 && (
                  <Pagination
                    className={pagination}
                    count={pagers}
                    size="large"
                    shape="rounded"
                    page={page}
                    onChange={handleNextSearch}
                  />
                )}
              </Box>
            </div>
          </div>
          {setContent()}
        </div>
      </div>
      <Footer />
      {/* <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={1500}
        EasingType="easeOutCubic"
        AnimationDuration={1500}
        ContainerClassName={scrollUpBtn}
        TransitionClassName={showScrollUpBtn}
      >
        <KeyboardArrowUpOutlinedIcon htmlColor="#fff" fontSize="large" />
      </ScrollUpButton> */}
    </>
  );
};

export default memo(Top);
