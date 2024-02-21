// Line.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const options = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
      foreColor: '#FFF',
      fontFamily: 'Jost',
    },
    colors: ['#FFF'],
    xaxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], // Дни недели
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      enabled: false
    },
    grid: {
        show: false,
        padding:{
          left: 20,
          right: 25
      }
    }

  };
  const data = [30, 40, 25, 45, 35, 50, 20];
  const series = [
    {
      name: 'Активность клиентов',
      data: data,
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="line" height={300} />
  );
};

export default LineChart;
