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
    aboutListItem,
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
              <span className={title}>フリマ検索</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              主要なフリマサイトをワンクリックで一括検索
              {/* 主要なフリマサイトを一括検索・比較 */}
              {/* フリマサイトの商品を一括検索・比較 */}
              {/* フリマサイトを一括検索し、価格を比較できるサービス */}
            </p>
          </div>
          <div id="about-service-container" className={aboutContainer}>
            <h2 className={clsx(sectionTitle, common)}>markets.jpとは？</h2>
            <p className={clsx(sectionDescription, common)}>
              このサービスについてご説明します。
            </p>
            <div id="about-service-content" className={aboutSection}>
              <h3 className={clsx(aboutTitle, common)}>概要</h3>
              <p className={clsx(aboutDescription, common)}>
                フリマサイトを一括検索するサービスです。
                各サイトの商品がまとめて表示され、手軽に比較できます。
                {/* 各サイトの商品がまとめて表示されるため、手軽に比較できます。 */}
                {/* 各サイトの商品が価格順にまとめて表示されるため、ご希望の商品を簡単に比較できます。 */}
                またアイテムをタップすると、詳細情報の確認や購入ができます。
                {/* また、アイテムをタップすると、各サイトで詳細情報の確認や購入ができます。 */}
              </p>
              <h3 className={clsx(aboutTitle, common)}>検索の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスの検索内容は、全て各フリマサイトに基づいています。
                ただし、キーワードや各サイトの検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                {/* ただし、入力されたキーワードや各サイトが提供する検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。 */}
                その場合は、以下のオプションを利用して、検索の精度を高めることができます。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>機能の説明</h3>
              <p className={clsx(aboutDescription, common)}>
                精度の高い検索を行う上で便利な機能です。
                {/* 精度の高い検索を行う上で便利な機能のため、積極的にご活用ください。 */}
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  除外ワード
                  <ul>
                    <li>
                      検索結果から除外するキーワードを入力します。
                      スペースを空けて、複数指定もできます。
                      {/* スペースを空けて入力し、複数指定もできます。 */}
                      {/* スペースを空けて入力することで、複数指定もできます。 */}
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  検索範囲
                  <ul>
                    <li>
                      「商品名」を選択した場合、全てのキーワードを商品名に含むものが対象になります。
                      {/* 「商品名」を選択した場合、入力された全てのキーワードを商品名に含むものが対象になります。 */}
                      {/* 「商品名」を選択した場合、入力された全てのキーワードを商品名に含むものを検索結果として表示します。 */}
                      関連性の低いものを除外することで、精度の高いデータを取得できます。
                      {/* そのため、関連性の低いものを除外することで、精度の高いデータを取得できます。 */}
                      {/* そのため、関連性の低いものを除外することで、精度の高いデータ取得、フリマサイト比較ができます。 */}
                      {/* そのため、関連性の低いものやキーワードに完全一致しないものを除外することで、精度の高いデータ取得、フリマサイト比較ができます。 */}
                      {/* そのため、関連性の低いものやキーワードに完全一致しないものを除外することで、精度の高いデータの取得、フリマサイト比較が可能になります。 */}
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
                      {/* 各アイテムのハートアイコンをタップして、お気に入りに含めることができます。 */}
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
                      {/* ページ選択を利用する場合は、必ず検索フォームの「キーワード」と「フリマサイト」を指定してください。 */}
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>免責事項</h3>
              <p className={clsx(aboutDescription, common)}>
                markets.jpのご利用に伴うトラブルや損害に関して、当方は一切の責任を負いかねます。
                価格の比較や商品の購入などについては、個人の判断でお願い致します。
                {/* そのため、価格の比較や商品の購入などについては、個人の判断でお願い致します。 */}
                {/* そのため、商品の購入やフリマサイトの比較などについては、個人の判断でお願い致します。 */}
                {/* 可能な限り、精度の高いデータの提供を目指していますが、商品の購入やフリマサイト比較などの判断につきましては、個人の責任でお願い致します。 */}
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
            <h2 className={clsx(sectionTitle, common)}>フリマサイト検索</h2>
            <p className={clsx(sectionDescription, common)}>
              豊富なオプションで、精度の高いサイト検索ができます。
              {/* メルカリ、ラクマ、PayPayフリマに対応。豊富なオプションで、精度の高いサイト検索が可能です。 */}
            </p>
            <Form />
          </div>
          <div className={toolLinkContainer}>
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト分析
              {/* フリマサイト分析サービス */}
              {/* フリマサイト比較サービス */}
            </h2>
            <p className={clsx(sectionToolLink, common)}>
              フリマサイトの相場や人気価格を算出するサービスです。
              {/* フリマサイトの相場や人気価格を把握できる分析サービスです。 */}
              {/* 相場や人気価格を算出する、フリマサイト分析サービスは */}
              {/* 相場や人気価格を算出し、フリマサイト比較に便利な分析サービスは */}
              {/* <Link className={toolLink} to="/analyze">
                こちら
              </Link> */}
              <a className={toolLink} href="/analyze">
                フリマサイト分析・比較
              </a>
              はこちら。
            </p>
          </div>
        </div>
        <div className={resultContainer}>
          <div className={clsx(main, result)}>
            <div id="result" className={resultHeader}>
              <h2 className={clsx(sectionTitle, common)}>
                フリマサイトの検索結果
              </h2>
              <p className={clsx(sectionDescription, common)}>
                各フリマサイトで詳細情報を確認したり、購入できます。
                {/* 気に入った商品は、各サイトで購入できます。 */}
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
