import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  backgroundColorArr,
  borderColorArr,
} from '../../constants/chartOptions';

// const getBarColorData = (dataArr) => {
//   // 念のために確認
//   if (backgroundColorArr.length !== borderColorArr.length) {
//     console.log('BackgroundColorArr length is not equal to borderColorArr');
//     return;
//   }

//   if (dataArr.length === backgroundColorArr.length) {
//     return {
//       backgrounds: backgroundColorArr,
//       borders: borderColorArr,
//     };
//   }

//   if (dataArr.length < backgroundColorArr.length) {
//     const borders = [];
//     const backgrounds = dataArr.map((value, index) => {
//       borders.push(borderColorArr[index]);
//       return backgroundColorArr[index];
//     });
//     return { backgrounds, borders };
//   }

//   // TODO: dataArr.length > backgroundColorArr.length
//   let borders = [];
//   let backgrounds = [];
//   for (var i = 0; i < dataArr.length / backgroundColorArr.length; i++) {
//     borders = [...borders, ...borderColorArr];
//     backgrounds = [...backgrounds, ...backgroundColorArr];
//   }

//   for (var i = 0; i < dataArr.length % backgroundColorArr.length; i++) {
//     borders.push(borderColorArr[i]);
//     backgrounds.push(backgroundColorArr[i]);
//   }
//   return { backgrounds, borders };
// };

const getChartData = (priceLabels, likesNums, itemsNums) => {
  return {
    labels: priceLabels,
    datasets: [
      {
        label: likesNums.length > 0 ? 'いいね数' : '商品数',
        data: likesNums.length > 0 ? likesNums : itemsNums,
        backgroundColor: backgroundColorArr,
        borderColor: borderColorArr,
        borderWidth: 1,
      },
    ],
  };
};

const getOption = (chartTitle) => {
  return {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 30,
        // max: parseInt('10', 10),
      },
    },
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    // elements: {
    //   bar: {
    //     borderWidth: 2,
    //   },
    // },
    // responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: chartTitle,
        // align: 'start',
        font: {
          size: 20,
        },
        // padding: 25,
        padding: {
          bottom: 25,
        },
      },
      // subtitle: {
      //   display: true,
      //   text: 'Custom Chart Subtitle',
      // },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          // overScaleMode: 'x',
          threshold: 10,
        },
        // zoom: {
        //   enabled: true,
        //   mode: '',
        // },
        limits: {
          x: {
            min: 0,
            // max: arr.reduce((a, b) => Math.max(a, b)),
          },
        },
      },
    },
  };
};

const HorizontalBarChart = ({
  chartTitle,
  priceLabels,
  likesNums,
  itemsNums,
}) => {
  return (
    <>
      <Bar
        data={getChartData(priceLabels, likesNums, itemsNums)}
        options={getOption(chartTitle)}
        // height={170}
      />
    </>
  );
};

export default memo(HorizontalBarChart);
