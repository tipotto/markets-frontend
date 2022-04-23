import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { formValueSelector } from 'redux-form';
import $ from 'jquery';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
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
import formCss from '../../style/form';
import analyticsCss from '../../style/analytics';
import { scrollWindow, showAboutService } from '../../utils';

const useAnalytics = () => {
  const emptyChartData = {
    priceLabels: [],
    itemsNums: [],
  };
  const { common, loading, loadingText, errorText } = baseCss();
  const {
    main,
    toggleBtnContainer,
    toggleBtn,
    priceContainer,
    wholeChartWrapper,
    wholeChartSection,
    wholeChartButton,
    wholeChartContainer,
    partialChartWrapper,
    partialChartContainer,
  } = analyticsCss();

  const getSelectedPlatform = (state) => {
    const selector = formValueSelector(formData.analysis.name);
    return selector(state, 'platform') || 'mercari';
  };

  const getSelectedPriceType = (state) => {
    const selector = formValueSelector(formData.analysis.name);
    return selector(state, 'priceType') || 'market';
  };

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

  scrollWindow();

  const showWholeChart = (event) => {
    const button = event.target;

    const showText = $(button)
      .parent('#whole-chart')
      .find('#whole-chart-container');

    const smallHeight = 350; // This is initial height.
    const originalHeight = showText.css({ height: 'auto' }).height();

    if (showText.hasClass('open')) {
      // Close
      showText.height(originalHeight).animate({ height: smallHeight }, 300);
      showText.removeClass('open');
      $(button).text('+ すべて見る').removeClass('active');
    } else {
      // Open
      showText
        .height(smallHeight)
        .animate({ height: originalHeight }, 300, () => {
          showText.height('auto');
        });
      showText.addClass('open');
      $(button).text('- 閉じる').addClass('active');
    }
  };

  const getItemsByType = () => {
    if (selectedChartItem === 'all') {
      return { byId: allItemsById, allIds: allItemIds };
    }

    return { byId: marketItemsById, allIds: marketItemIds };
  };

  const getDataByType = () => {
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
    dispatch(changeChartType(newValue));
  };

  const handleChartItemChange = (event, newValue) => {
    dispatch(changeChartItemType(newValue));
  };

  const renderItems = () => {
    const { byId, allIds } = getItemsByType();
    if (!allIds.length) return [];

    // タブが切り替わる度に itemObj, itemIds として渡すpropsの値は変わる
    // そのため、VirtualizedList は再レンダリングされる
    return <VirtualizedList itemObj={byId} itemIds={allIds} />;
  };

  const renderPriceData = () => {
    const {
      price,
      chart: { vertical, horizontal },
    } = getDataByType();
    const { min, max, average, market } = price;
    return (
      <div>
        <div className={priceContainer}>
          <InfoBox
            title="相場価格"
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
                chartTitle="全体価格チャート"
                priceLabels={vertical.priceLabels}
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
                相場価格帯
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
              chartTitle="相場価格チャート"
              priceLabels={horizontal.priceLabels}
              itemsNums={horizontal.itemsNums}
            />
          </div>
        </div>
      </div>
    );
  };

  const setContent = () => {
    if (statusCode && errorMessage) {
      return (
        <div className={main}>
          <div className={loading}>
            <ErrorOutlineIcon color="secondary" fontSize="large" />
            <span className={clsx(errorText, common)}>
              {statusCode} {errorMessage}
            </span>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={main}>
          <div className={loading}>
            <CircularProgress color="secondary" />
            <span className={clsx(loadingText, common)}>
              ただいま分析しています...
            </span>
          </div>
        </div>
      );
    }

    if (!isLoading && !allItemIds.length) {
      return (
        <div className={main}>
          <div className={loading}>
            <span className={clsx(loadingText, common)}>
              分析結果はありません。
            </span>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={main}>
          {renderPriceData()}
          <div className={toggleBtnContainer}>
            <ToggleButtonGroup
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
        {renderItems()}
      </>
    );
  };

  return {
    setContent,
    showAboutService,
  };
};

const Analytics = () => {
  const { setContent } = useAnalytics();
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
    scrollUpBtn,
  } = baseCss();
  const { formContainer } = formCss();
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
              フリマサイトの相場や人気価格を分析・比較
            </p>
          </div>
          <div id="analyze" className={container}>
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト分析・比較
            </h2>
            <p className={clsx(sectionDescription, common)}>
              豊富なオプションで、精度の高いフリマサイト比較ができます。
            </p>
            <div className={searchContainer}>
              <div className={formContainer}>
                <AnalysisForm />
              </div>
              <div style={{ paddingTop: '1.3rem' }} className={resultContainer}>
                {setContent()}
              </div>
            </div>
          </div>
          <div
            id="about-service-container"
            className={clsx(container, aboutContainer)}
          >
            <h2 className={clsx(sectionTitle, common)}>markets.jpとは？</h2>
            <p className={clsx(sectionDescription, common)}>
              効果的なフリマサイト分析・比較のために、ぜひご一読ください。
            </p>
            <div id="about-service-content" className={aboutSection}>
              <h3 className={clsx(aboutTitle, common)}>概要</h3>
              <p className={clsx(aboutDescription, common)}>
                フリマサイトの分析・比較サービスです。
                各フリマサイトの比較を通して、ご希望に合ったサイト選定ができます。
              </p>
              <h3 className={clsx(aboutTitle, common)}>用途</h3>
              <p className={clsx(aboutDescription, common)}>
                主な用途としては、購入に適したフリマサイトの比較、出品時の価格設定などがあります。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  購入に適したフリマサイトの比較
                  <ul>
                    <li>
                      市場の相場などを比較して、ご希望の商品を最もお得に購入できるフリマサイトを選定できます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  出品時の価格設定
                  <ul>
                    <li>
                      市場の相場に加えて、過去の販売データも参考に比較検討を行うことで、相場の範囲内、かつ実際の取引履歴に基づいた、最も売り上げが見込める価格を設定できます。
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>分析の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスのコンテンツは、全て各フリマサイトに基づいています。
                ただし、キーワードや各サイトの検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                その場合は、以下のオプションを利用して、フリマサイト比較の精度を高めることができます。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>機能の説明</h3>
              <p className={clsx(aboutDescription, common)}>
                精度の高い分析・比較を行う上で便利な機能です。
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  除外ワード
                  <ul>
                    <li>
                      分析結果から除外するキーワードを入力します。
                      スペースを空けて、複数指定もできます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  検索範囲
                  <ul>
                    <li>
                      「商品名」を選択した場合、全てのキーワードを商品名に含むものが対象になります。
                      そのため、関連性の低いものを除外することで、精度の高いデータ取得、フリマサイト比較ができます。
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  チャート
                  <ul>
                    <li>
                      算出した価格がチャートで表示されます。 1k =
                      1,000円と読み換えてください。
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>免責事項</h3>
              <p className={clsx(aboutDescription, common)}>
                markets.jpのご利用に伴うトラブルや損害に関して、当方は一切の責任を負いかねます。
                そのため、価格設定やフリマサイトの比較などについては、個人の判断でお願い致します。
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
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト検索・比較
            </h2>
            <p className={clsx(sectionToolLink, common)}>
              フリマサイトを一括検索し、各サイトの商品を比較できます。
              <a className={toolLink} href="/search">
                フリマサイト検索
              </a>
              はこちら。
            </p>
          </div>
        </div>
      </div>
      <div id="page_top" className={scrollUpBtn}>
        <a href="#analyze" />
      </div>
      <Footer />
    </>
  );
};

export default memo(Analytics);
