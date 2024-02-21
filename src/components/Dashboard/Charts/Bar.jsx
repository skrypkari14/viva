// BarChartExample.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({showY}) => {

  const chartData = {
    options: {
      chart: {
        id: 'bar-chart',
        toolbar: {
          show: false, // Скрыть панель инструментов
        },
        fontFamily: 'Jost',
        foreColor: '#9ca3af',
      },
      colors: ['#721EB1'],
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '40%'
        }
      },
      dataLabels:{
        enabled: false
      },
      grid: {
        show: false,
        padding:{
            left: -30,
            right: -20
        }
      },
      yaxis: {
        tickAmout: 3,
        labels:{
            offsetX: -15,
            show: showY,
        }
      },
      xaxis: {
        categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
        labels: {
          show: false,
        },
      },
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
      type="bar"
      height={220}
    />
  );
};

export default BarChart;
