import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  backgroundColorArr,
  borderColorArr,
} from '../../constants/BarChartOptions';

const getBarColorData = (dataArr) => {
  // 念のために確認
  if (backgroundColorArr.length !== borderColorArr.length) {
    console.log('BackgroundColorArr length is not equal to borderColorArr');
    return;
  }

  if (dataArr.length === backgroundColorArr.length) {
    return {
      backgrounds: backgroundColorArr,
      borders: borderColorArr,
    };
  }

  if (dataArr.length < backgroundColorArr.length) {
    const borders = [];
    const backgrounds = dataArr.map((value, index) => {
      borders.push(borderColorArr[index]);
      return backgroundColorArr[index];
    });
    return { backgrounds, borders };
  }

  // TODO: dataArr.length > backgroundColorArr.length
  let borders = [];
  let backgrounds = [];
  for (var i = 0; i < dataArr.length / backgroundColorArr.length; i++) {
    borders = [...borders, ...borderColorArr];
    backgrounds = [...backgrounds, ...backgroundColorArr];
  }

  for (var i = 0; i < dataArr.length % backgroundColorArr.length; i++) {
    borders.push(borderColorArr[i]);
    backgrounds.push(backgroundColorArr[i]);
  }
  return { backgrounds, borders };
};

const getData = (dataArr, labelArr) => {
  const { backgrounds, borders } = getBarColorData(dataArr);
  return {
    labels: labelArr,
    datasets: [
      {
        label: 'インプレッション',
        data: dataArr,
        backgroundColor: backgrounds,
        borderColor: borders,
        borderWidth: 1,
      },
    ],
  };
};

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Horizontal Bar Chart',
    // },
  },
};

const HorizontalBarChart = ({ dataArr, labelArr }) => {
  return (
    <>
      <Bar data={getData(dataArr, labelArr)} options={options} height={110} />
    </>
  );
};

export default memo(HorizontalBarChart);
