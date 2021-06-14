import React, { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector, startSubmit, change } from 'redux-form';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import tabOptionArray from '../../constants/TabOptions';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import VirtualizedList from '../organisms/VirtualizedList';
import AnalysisForm from '../organisms/AnalysisForm';
import HorizontalBarChart from '../organisms/HorizontalBarChart';
import InfoBox from '../organisms/InfoBox';
import AnalysisItem from '../organisms/AnalysisItem';
import FormData from '../../constants/FormData';
import {
  requestAdditionalSearch,
  changeItemType,
  addFavoriteItem,
  deleteFavoriteItem,
} from '../../actions';
import topStyles from '../../style/top';
import analyticsStyles from '../../style/analytics';

const getPage = (state) => {
  const selector = formValueSelector(FormData.analysis.name);
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

  // const handleAdditionalSearch = useCallback((event, value) => {
  //   // console.log("value", value);
  //   startSubmit(FormData.analysis.name);
  //   dispatch(change(FormData.analysis.name, 'page', value));
  //   dispatch(requestAdditionalSearch());
  // }, []);

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
    // handleAdditionalSearch,
    setContent,
  };
};

// const showAboutService = (event) => {
//   const button = event.target;

//   const showText = $(button)
//     .parent('#about-service-container')
//     .find('#about-service-content');

//   const smallHeight = 150; // This is initial height.
//   const originalHeight = showText.css({ height: 'auto' }).height();

//   if (showText.hasClass('open')) {
//     /* CLOSE*/
//     showText.height(originalHeight).animate({ height: smallHeight }, 300);
//     showText.removeClass('open');
//     $(button).text('+ 続きを読む').removeClass('active');
//   } else {
//     /* OPEN*/
//     showText
//       .height(smallHeight)
//       .animate({ height: originalHeight }, 300, () => {
//         showText.height('auto');
//       });
//     showText.addClass('open');
//     $(button).text('- 閉じる').addClass('active');
//   }
// };

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    toggleBtnGroup: {
      // [theme.breakpoints.down('xs')]: {
      //   margin: '0 auto',
      // },
    },
    toggleBtn: {
      padding: '.5rem .8rem',
      // border: 'none',
      // '&:first-child': {
      //   borderRight: '1px solid #E0E0E0',
      // },
      // '&:last-child': {
      //   borderLeft: '1px solid #E0E0E0',
      // },
      [theme.breakpoints.down('xs')]: {
        padding: '.4rem',
      },
    },
  }),
);

const Analytics = () => {
  const [chartType, setChartType] = useState('range');
  const [priceType, setPriceType] = useState('best');
  const [selectedItem, setSelectedItem] = useState(false);
  const { header, title, toggleBtnGroup, toggleBtn } = useStyles();
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
    // serviceName,
    // title,
    // siteDescription,
    formContainer,
    sectionTitle,
    sectionDescription,
    // aboutContainer,
    // aboutSection,
    // aboutTitle,
    // aboutDescription,
    // aboutButton,
    resultContainer,
    resultHeader,
    result,
    itemTypeSelect,
    tabs,
    tab,
    pagination,
  } = topStyles();

  const handleChartType = (event, chartType) => {
    // console.log('chartType', chartType);
    setChartType(chartType);
  };

  const { analysisResult, prices, items } = analyticsStyles();
  const rangeLabels = [
    '0-1000',
    '1000-2000',
    '2000-3000',
    '3000-4000',
    '4000-5000',
    '5000-6000',
    '6000-7000',
    '7000-8000',
    '8000-9000',
    '9000-10000',
  ];
  // const priceLabels = ['0-200', '200-400', '400-600', '600-800', '800-1000'];
  const priceLabels = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000',
  ];
  const rangeData = [112, 89, 60, 50, 32, 3, 30, 75, 100, 27];
  const priceData = [96, 50, 0, 42, 83, 0, 0, 60, 0, 50];

  return (
    <>
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div className={formContainer}>
            <h2 className={clsx(sectionTitle, common)}>フリマサイト検索</h2>
            <p className={clsx(sectionDescription, common)}>
              メルカリ、ラクマ、PayPayフリマに対応。豊富な検索オプションで、高精度のサイト検索・比較が可能です。
            </p>
            <AnalysisForm />
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
                  <Tab className={tab} label="市場分析" value="market" />
                  <Tab className={tab} label="適正価格" value="price" />
                </Tabs>
              </Box>
            </div>
          </div>
          <div className={analysisResult}>
            {/* <div>{setContent()}</div> */}
            <div>
              <div className={header}>
                <span className={title}>Horizontal Bar Chart</span>
                <ToggleButtonGroup
                  className={toggleBtnGroup}
                  exclusive
                  value={chartType}
                  onChange={handleChartType}
                  aria-label="chartType"
                >
                  <ToggleButton
                    className={toggleBtn}
                    key="range"
                    value="range"
                    aria-label="range"
                  >
                    推奨価格帯
                  </ToggleButton>
                  <ToggleButton
                    className={toggleBtn}
                    key="price"
                    value="price"
                    aria-label="price"
                  >
                    推奨価格
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <HorizontalBarChart
                dataArr={chartType === 'range' ? rangeData : priceData}
                labelArr={chartType === 'range' ? rangeLabels : priceLabels}
              />
            </div>
            <div>
              <div className={prices}>
                <InfoBox
                  onClick={(e) => setPriceType('best')}
                  active={priceType === 'best'}
                  title="推奨価格"
                  price={1500}
                />
                <InfoBox
                  onClick={(e) => setPriceType('lowest')}
                  active={priceType === 'lowest'}
                  title="最低価格"
                  price={700}
                />
                <InfoBox
                  onClick={(e) => setPriceType('highest')}
                  active={priceType === 'highest'}
                  title="最高価格"
                  price={3000}
                />
              </div>
              <div className={items}>
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 1650,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'mercari',
                  }}
                  selected={true}
                  onClick={(e) => setSelectedItem(true)}
                />
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 1800,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'rakuma',
                  }}
                  selected={false}
                  onClick={(e) => setSelectedItem(false)}
                />
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 1300,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'paypay',
                  }}
                  selected={false}
                  onClick={(e) => setSelectedItem(false)}
                />
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 1650,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'mercari',
                  }}
                  selected={false}
                  onClick={(e) => setSelectedItem(false)}
                />
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 2000,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'rakuma',
                  }}
                  selected={false}
                  onClick={(e) => setSelectedItem(false)}
                />
                <AnalysisItem
                  item={{
                    title: '大原優乃セカンド写真集「吐息」',
                    price: 2000,
                    imageUrl:
                      'https://static.mercdn.net/item/detail/orig/photos/m77461982015_1.jpg?1623288103',
                    detailUrl: 'https://www.mercari.com/jp/items/m77461982015/',
                    platform: 'rakuma',
                  }}
                  selected={false}
                  onClick={(e) => setSelectedItem(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Analytics);
