// ChartAreaExample.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = () => {
  const formatDollar = (value) => `${value} $`;
  const chartData = {
    options: {
      chart: {
        id: 'area-chart',
        toolbar: {
          show: false
        },
        fontFamily: 'Jost',
        foreColor: '#9ca3af'
      },
      colors: ['#721EB1'],
      grid: {
        strokeDashArray: 7
      },
      dataLabels:{
        enabled: false
      },
      xaxis: {
        categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
        labels: {
          show: false
        }
      },
      yaxis: {
        stepSize: 20,
        labels: {
          formatter: formatDollar,
        }
      }
    },
    series: [
      {
        name: 'Пример данных',
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={220}
    />
  );
};

export default AreaChart;
