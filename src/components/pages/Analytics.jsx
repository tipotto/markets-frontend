import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import clsx from 'clsx';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import VirtualizedList from '../organisms/VirtualizedList';
import AnalysisForm from '../organisms/AnalysisForm';
import AnalyticsHead from '../organisms/AnalyticsHead';
import HorizontalBarChart from '../organisms/HorizontalBarChart';
import InfoBox from '../organisms/InfoBox';
import formData from '../../constants/formData';
import { changeChartType, changeChartItemType } from '../../actions';
import baseCss from '../../style/base';
import analyticsCss from '../../style/analytics';

const getSelectedPlatform = (state) => {
  const selector = formValueSelector(formData.analysis.name);
  const platform = selector(state, 'platform');
  return platform || 'mercari';
};

const getSelectedPriceType = (state) => {
  const selector = formValueSelector(formData.analysis.name);
  const priceType = selector(state, 'priceType');
  return priceType || 'market';
};

const useAnalytics = () => {
  const emptyChartData = {
    priceLabels: [],
    likesNums: [],
    itemsNums: [],
  };
  const { common, loading, loadingText, errorText } = baseCss();
  const {
    main,
    result,
    items,
    toggleBtnContainer,
    toggleBtnGroup,
    toggleBtn,
    priceContainer,
    wholeChartWrapper,
    wholeChartSection,
    wholeChartButton,
    wholeChartContainer,
    partialChartWrapper,
    partialChartContainer,
  } = analyticsCss();
  const dispatch = useDispatch();

  const platform = useSelector((state) => getSelectedPlatform(state));
  const priceType = useSelector((state) => getSelectedPriceType(state));

  // Reduxはデフォルトで値の比較を「===」で行う
  // 以下の2つはプリミティブ型の値を参照するため問題なく比較できる
  const isLoading = useSelector((state) => state.state.isLoading);
  const statusCode = useSelector((state) => state.error.status);
  const errorMessage = useSelector((state) => state.error.message);

  // タブが切り替わる度に取得する値は替わる（all or favorite）
  // そのため、Topが再レンダリングされる
  const selectedChartItem = useSelector(
    (state) => state.state.selectedChartItem,
  );
  const selectedChart = useSelector((state) => state.state.selectedChart);

  // 以下の2つはオブジェクト型（Object, Array）の値を参照する
  // そのため「===」ではなくshallowEqualを利用し、異なるオブジェクトであっても適切に比較できる
  const priceData = useSelector((state) => state.analyze.price, shallowEqual);

  const wholePriceChartData = useSelector(
    (state) =>
      state.analyze.chart ? state.analyze.chart.whole : emptyChartData,
    shallowEqual,
  );
  const priceRangeChartData = useSelector(
    (state) =>
      state.analyze.chart ? state.analyze.chart.range : emptyChartData,
    shallowEqual,
  );
  const priceDetailChartData = useSelector(
    (state) =>
      state.analyze.chart ? state.analyze.chart.detail : emptyChartData,
    shallowEqual,
  );

  const allItemsById = useSelector(
    (state) => (state.analyze.items ? state.analyze.items.all.byId : {}),
    shallowEqual,
  );
  const allItemIds = useSelector(
    (state) => (state.analyze.items ? state.analyze.items.all.allIds : []),
    shallowEqual,
  );

  const marketItemsById = useSelector(
    (state) => (state.analyze.items ? state.analyze.items.market.byId : {}),
    shallowEqual,
  );
  const marketItemIds = useSelector(
    (state) => (state.analyze.items ? state.analyze.items.market.allIds : []),
    shallowEqual,
  );

  const _getItemsByType = () => {
    // console.log('_getItemsByType');
    if (selectedChartItem === 'all') {
      return { byId: allItemsById, allIds: allItemIds };
    }

    return { byId: marketItemsById, allIds: marketItemIds };
  };

  const _getDataByType = () => {
    // console.log('_getDataByType');
    if (selectedChart === 'range') {
      return {
        price: priceData,
        chart: {
          vertical: wholePriceChartData,
          horizontal: priceRangeChartData,
        },
      };
    }

    return {
      price: priceData,
      chart: {
        vertical: wholePriceChartData,
        horizontal: priceDetailChartData,
      },
    };
  };

  const handleChartChange = (event, newValue) => {
    // console.log('tab value', newValue);
    dispatch(changeChartType(newValue));
  };

  const handleChartItemChange = (event, newValue) => {
    // console.log('handleChartItemChange', newValue);
    dispatch(changeChartItemType(newValue));
  };

  const _renderItems = () => {
    const { byId, allIds } = _getItemsByType();
    if (!allIds.length) return [];

    // タブが切り替わる度に itemObj, itemIds として渡すpropsの値は変わる
    // そのため、VirtualizedList は再レンダリングされる
    return <VirtualizedList itemObj={byId} itemIds={allIds} />;
  };

  const _renderPriceData = () => {
    const {
      price,
      chart: { vertical, horizontal },
    } = _getDataByType();
    const { min, max, average, market } = price;
    return (
      <>
        <div className={priceContainer}>
          <InfoBox
            title={
              platform === 'mercari' && priceType === 'popular'
                ? '人気価格'
                : '相場価格'
            }
            minPrice={market.min}
            maxPrice={market.max}
          />
          <InfoBox title="最低価格" maxPrice={min} />
          <InfoBox title="最高価格" maxPrice={max} />
          <InfoBox title="平均価格" maxPrice={average} />
        </div>
        <div id="whole-chart" className={wholeChartWrapper}>
          <div id="whole-chart-container" className={wholeChartSection}>
            <div className={wholeChartContainer}>
              <HorizontalBarChart
                chartTitle="Whole price chart"
                priceLabels={vertical.priceLabels}
                likesNums={vertical.likesNums}
                itemsNums={vertical.itemsNums}
              />
            </div>
          </div>
          <span
            className={clsx(wholeChartButton, common)}
            onClick={showWholeChart}
          >
            + すべて見る
          </span>
        </div>
        <div className={partialChartWrapper}>
          <div className={toggleBtnContainer}>
            <ToggleButtonGroup
              className={toggleBtnGroup}
              exclusive
              value={selectedChart}
              onChange={handleChartChange}
              aria-label="chartType"
            >
              <ToggleButton
                className={toggleBtn}
                key="range"
                value="range"
                aria-label="range"
              >
                {platform === 'mercari' && priceType === 'popular'
                  ? '人気価格帯'
                  : '相場価格帯'}
              </ToggleButton>
              <ToggleButton
                className={toggleBtn}
                key="detail"
                value="detail"
                aria-label="detail"
              >
                価格の詳細
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={partialChartContainer}>
            <HorizontalBarChart
              chartTitle="Recommended price chart"
              priceLabels={horizontal.priceLabels}
              likesNums={horizontal.likesNums}
              itemsNums={horizontal.itemsNums}
            />
          </div>
        </div>
      </>
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
            ただいま分析しています...
          </span>
        </div>
      );
    }

    if (!isLoading && !allItemIds.length) {
      return (
        <div className={loading}>
          <span className={clsx(loadingText, common)}>
            分析結果はありません。
          </span>
        </div>
      );
    }

    return (
      <>
        <div className={clsx(main, result, items)}>
          {_renderPriceData()}
          <div className={toggleBtnContainer}>
            <ToggleButtonGroup
              className={toggleBtnGroup}
              exclusive
              value={selectedChartItem}
              onChange={handleChartItemChange}
              aria-label="chartType"
            >
              <ToggleButton
                className={toggleBtn}
                key="all"
                value="all"
                aria-label="all"
              >
                すべて
              </ToggleButton>
              <ToggleButton
                className={toggleBtn}
                key="market"
                value="market"
                aria-label="market"
              >
                {platform === 'mercari' && priceType === 'popular'
                  ? '人気価格帯'
                  : '相場価格帯'}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {_renderItems()}
      </>
    );
  };

  return {
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
    // CLOSE
    showText.height(originalHeight).animate({ height: smallHeight }, 300);
    showText.removeClass('open');
    $(button).text('+ 続きを読む').removeClass('active');
  } else {
    // OPEN
    showText
      .height(smallHeight)
      .animate({ height: originalHeight }, 300, () => {
        showText.height('auto');
      });
    showText.addClass('open');
    $(button).text('- 閉じる').addClass('active');
  }
};

const showWholeChart = (event) => {
  const button = event.target;

  const showText = $(button)
    .parent('#whole-chart')
    .find('#whole-chart-container');

  const smallHeight = 350; // This is initial height.
  const originalHeight = showText.css({ height: 'auto' }).height();

  if (showText.hasClass('open')) {
    // CLOSE
    showText.height(originalHeight).animate({ height: smallHeight }, 300);
    showText.removeClass('open');
    $(button).text('+ すべて見る').removeClass('active');
  } else {
    // OPEN
    showText
      .height(smallHeight)
      .animate({ height: originalHeight }, 300, () => {
        showText.height('auto');
      });
    showText.addClass('open');
    $(button).text('- 閉じる').addClass('active');
  }
};

const Analytics = () => {
  const { setContent } = useAnalytics();
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
  } = baseCss();
  return (
    <>
      <AnalyticsHead />
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              <span className={title}>フリマサイト比較</span>
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              フリマサイトの相場や人気価格を分析・比較できるサービス
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
                詳細な価格データをもとに、フリマサイトを比較できるサービスです。メルカリ、ラクマ、PayPayフリマに対応しています。
                商品購入時の相場を調べたり、出品時の価格設定の参考にお使いいただけます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>分析の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスのコンテンツは、全て各フリマサイトに基づいています。
                ただし、入力されたキーワードや各サイトが提供する検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                その場合は、以下のオプションを利用して、データの精度を高めることができます。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>除外ワード</h3>
              <p className={clsx(aboutDescription, common)}>
                分析結果から除外するキーワードを入力します。
                スペースを空けて入力することで、複数指定もできます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>検索範囲</h3>
              <p className={clsx(aboutDescription, common)}>
                「商品名」を選択した場合、入力された全てのキーワードを商品名として含むもののみを検索結果として表示します。
                そのため、関連度の低いものや付属品など、キーワードに完全に一致しないものを除外することで、精度の高いフリマサイト比較が可能になります。
                ただし、表示されるデータが絞られることがありますので、ご了承ください。
              </p>
              <h3 className={clsx(aboutTitle, common)}>価格チャート</h3>
              <p className={clsx(aboutDescription, common)}>
                算出した価格データがチャートで表示されます。 1k =
                1,000円と読み換えてください。
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
            <h2 className={clsx(sectionTitle, common)}>フリマサイト分析</h2>
            <p className={clsx(sectionDescription, common)}>
              詳細なオプションによるデータ分析で、精度の高いフリマサイト比較を可能にします。
            </p>
            <AnalysisForm />
          </div>
          <div className={toolLinkContainer}>
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト検索・比較サービス
            </h2>
            <p className={clsx(sectionToolLink, common)}>
              フリマサイトを一括検索し、各サイトの商品や価格を比較できるサービスです。ご利用は
              <Link className={toolLink} to="/">
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
                フリマサイトの分析結果
              </h2>
              <p className={clsx(sectionDescription, common)}>
                相場や人気価格など、フリマサイトの比較に必要なデータを算出します。
              </p>
            </div>
          </div>
          {setContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Analytics);
