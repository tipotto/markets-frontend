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
      <div>
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
      </div>
    );
  };

  const setContent = () => {
    // console.log('setContent');

    if (statusCode && errorMessage) {
      return (
        <div className={clsx(main, result, items)}>
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
        <div className={clsx(main, result, items)}>
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
        <div className={clsx(main, result, items)}>
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
    aboutListItem,
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
              フリマサイトの相場や人気価格を分析・比較
              {/* フリマサイトの相場や人気価格をかんたん分析・比較 */}
              {/* フリマサイトの相場や人気価格を分析・比較できるサービス */}
            </p>
          </div>
          <div id="about-service-container" className={aboutContainer}>
            <h2 className={clsx(sectionTitle, common)}>markets.jpとは？</h2>
            <p className={clsx(sectionDescription, common)}>
              効果的なフリマサイト分析・比較のために、ぜひご一読ください。
              {/* 効果的な分析・比較のために、ぜひご一読ください。 */}
              {/* このサービスについてご説明します。 */}
            </p>
            <div id="about-service-content" className={aboutSection}>
              <h3 className={clsx(aboutTitle, common)}>概要</h3>
              {/* <h3 className={clsx(aboutTitle, common)}>サービス概要</h3> */}
              <p className={clsx(aboutDescription, common)}>
                フリマサイトの分析・比較サービスです。
                {/* フリマサイトの分析・比較にお使いいただけるサービスです。 */}
                {/* フリマサイトのデータ分析・比較にお使いいただけるサービスです。 */}
                各フリマサイトの比較を通して、ご希望に合ったサイト選定ができます。
                {/* メルカリ、ラクマ、PayPayフリマに対応しているため、各フリマサイトの比較を通して、ご希望に合ったサイト選定ができます。 */}
                {/* メルカリ、ラクマ、PayPayフリマに対応しているため、各フリマサイトの比較を通して、ご希望に合ったサイト選定が可能です。 */}
                {/* メルカリ、ラクマ、PayPayフリマに対応しているため、各フリマサイトの比較に基づいて、ご希望のニーズに適したサイト選定が可能です。 */}
              </p>
              <h3 className={clsx(aboutTitle, common)}>用途</h3>
              {/* <h3 className={clsx(aboutTitle, common)}>サービス用途</h3> */}
              <p className={clsx(aboutDescription, common)}>
                主な用途としては、購入に適したフリマサイトの比較、出品時の価格設定などがあります。
                {/* その他にも様々な用途でご利用ください。 */}
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  購入に適したフリマサイトの比較
                  <ul>
                    <li>
                      市場の相場などを比較して、ご希望の商品を最もお得に購入できるフリマサイトを選定できます。
                      {/* 現在の市場の相場などを比較して、ご希望の商品を最もお得に購入できるフリマサイトを選定できます。 */}
                      {/* 現在の市場の相場などを比較することで、ご希望の商品を最もお得に購入できるフリマサイトを選定できます。 */}
                      {/* 現在の市場の最低価格や相場を比較することで、ご希望の商品を最もお得に購入できるフリマサイトを選定できます。 */}
                      {/* ここでの「現在の市場」とは、各フリマサイトで出品中の商品を指しています。 */}
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  出品時の価格設定
                  <ul>
                    <li>
                      市場の相場に加えて、過去の販売データも参考に比較検討を行うことで、相場の範囲内、かつ実際の取引履歴に基づいた、最も売り上げが見込める価格を設定できます。
                      {/* 現在の市場の相場に加えて、過去の販売データも参考に比較検討を行うことで、市場の相場の範囲内、かつ実際の取引履歴に基づいた、最も売り上げが見込める価格を設定できます。 */}
                      {/* 現在の市場の相場や価格幅に加えて、過去の販売データも参考に比較検討を行うことで、市場の相場の範囲内、かつ実際の取引履歴に基づいた、最も売り上げが見込める価格を設定することができます。 */}
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>分析の精度</h3>
              <p className={clsx(aboutDescription, common)}>
                このサービスのコンテンツは、全て各フリマサイトに基づいています。
                ただし、キーワードや各サイトの検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。
                {/* ただし、入力されたキーワードや各サイトが提供する検索アルゴリズムによっては、ご希望に沿わない商品が含まれることがあります。 */}
                {/* その場合は、以下のオプションを利用して、取得データやフリマサイト比較の精度を高めることができます。 */}
                その場合は、以下のオプションを利用して、フリマサイト比較の精度を高めることができます。
                {/* その場合は、以下のオプションを利用して、取得データやサイト比較の精度を高めることができます。 */}
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>除外ワードを指定する。</li>
                <li>検索範囲で「商品名」を選択する。</li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>機能の説明</h3>
              <p className={clsx(aboutDescription, common)}>
                精度の高い分析・比較を行う上で便利な機能です。
                {/* 精度の高い分析・比較を行う上で便利な機能のため、積極的にご活用ください。 */}
              </p>
              <ul className={clsx(aboutDescription, common)}>
                <li>
                  除外ワード
                  <ul>
                    <li>
                      分析結果から除外するキーワードを入力します。
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
                      そのため、関連性の低いものを除外することで、精度の高いデータ取得、フリマサイト比較ができます。
                      {/* そのため、関連性の低いものやキーワードに完全一致しないものを除外することで、精度の高いデータ取得、フリマサイト比較ができます。 */}
                      {/* そのため、関連性の低いものやキーワードに完全一致しないものを除外することで、精度の高いデータの取得、フリマサイト比較が可能になります。 */}
                      {/* そのため、関連性の低いものやキーワードに完全一致しないものを除外することで、精度の高いデータの取得、サイト比較が可能になります。 */}
                      {/* ただし、取得できるデータ数が絞られることがありますので、ご了承ください。 */}
                    </li>
                  </ul>
                </li>
                <li className={aboutListItem}>
                  チャート
                  {/* 価格チャート */}
                  <ul>
                    <li>
                      {/* 算出した価格データがチャートで表示されます。 */}
                      算出した価格がチャートで表示されます。 1k =
                      1,000円と読み換えてください。
                      {/* また、グラフをタップすると、データの詳細を見ることができます。 */}
                    </li>
                  </ul>
                </li>
              </ul>
              <h3 className={clsx(aboutTitle, common)}>免責事項</h3>
              <p className={clsx(aboutDescription, common)}>
                markets.jpのご利用に伴うトラブルや損害に関して、当方は一切の責任を負いかねます。
                そのため、価格設定やフリマサイトの比較などについては、個人の判断でお願い致します。
                {/* 可能な限り、精度の高いデータの提供を目指していますが、価格設定やフリマサイト比較などの判断につきましては、個人の責任でお願い致します。 */}
                {/* 可能な限り、精度の高いデータの提供を目指していますが、価格設定やサイトの比較に関する判断につきましては、個人の責任でお願い致します。 */}
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
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト分析・比較
            </h2>
            <p className={clsx(sectionDescription, common)}>
              豊富なオプションで、精度の高いフリマサイト比較ができます。
              {/* 豊富なオプションで、精度の高いフリマサイト比較を可能にします。 */}
              {/* 詳細なオプションによるデータ分析で、精度の高いフリマサイト比較を可能にします。 */}
            </p>
            <AnalysisForm />
          </div>
          <div className={toolLinkContainer}>
            <h2 className={clsx(sectionTitle, common)}>
              フリマサイト検索・比較
              {/* フリマサイト検索 */}
              {/* フリマサイト検索・比較サービス */}
            </h2>
            <p className={clsx(sectionToolLink, common)}>
              フリマサイトを一括検索し、各サイトの商品を比較できます。
              {/* 主要なフリマサイトを一括検索できるサービスです。 */}
              {/* フリマサイトを一括検索し、各サイトの商品を比較できます。ご利用は */}
              {/* フリマサイトを一括検索し、各サイトの商品を比較できるサービスです。ご利用は */}
              {/* フリマサイトを一括検索し、各サイトの商品や価格を比較できるサービスです。ご利用は */}
              {/* <Link className={toolLink} to="/">
                こちら
              </Link> */}
              <a className={toolLink} href="/search">
                フリマサイト検索
              </a>
              はこちら。
            </p>
          </div>
        </div>
        <div className={resultContainer}>
          <div className={clsx(main, result)}>
            <div id="result" className={resultHeader}>
              <h2 className={clsx(sectionTitle, common)}>
                フリマサイト分析・比較の結果
              </h2>
              <p className={clsx(sectionDescription, common)}>
                フリマサイトの比較に必要なデータを表示します。
                {/* 相場や人気価格など、フリマサイトの比較に必要なデータを算出します。 */}
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
