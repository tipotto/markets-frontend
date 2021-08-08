import React, { memo } from 'react';
import clsx from 'clsx';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import TopHead from '../organisms/TopHead';
import ServiceBox from '../organisms/ServiceBox';
import baseCss from '../../style/base';
import topCss from '../../style/top';

const Top = () => {
  const { common, wrapper, main, serviceName, title, siteDescription } =
    baseCss();
  const { serviceContainer } = topCss();
  return (
    <>
      <TopHead />
      <Header />
      <div className={wrapper}>
        <div className={main}>
          <div>
            <h1 className={serviceName}>
              {/* <span className={title}>フリマサイト検索・比較</span> */}
              markets.jp
            </h1>
            <p className={clsx(siteDescription, common)}>
              フリマサイトを一括検索したり、分析・比較できるサービスです。
            </p>
          </div>
          <div className={serviceContainer}>
            <ServiceBox
              title="フリマサイト検索"
              description="フリマサイトを一括検索し、ご希望の商品の価格を比較できるサービスです。"
              type="search"
            />
            <ServiceBox
              title="フリマサイト分析・比較"
              description="現在の市場や過去の販売データをもとに、相場や人気価格を分析できるサービスです。"
              type="analyze"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Top);
